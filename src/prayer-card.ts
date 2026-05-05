import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TRANSLATIONS } from './translations.js';

// ============================================================================
// Types
// ============================================================================

interface CardConfig {
  device: string; // HA device_id — all entities are auto-discovered from it
}

interface PrayerTime {
  key: string;
  label: string;
  time: string;
  active: boolean;
}

// ============================================================================
// Helpers
// ============================================================================

const PRAYER_KEYS = ['fajr', 'shuruq', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;

// Accepts ISO timestamp "2024-05-05T05:30:00+02:00" or plain "HH:MM"
function toHHMM(state: string): string {
  if (!state || state === 'unavailable' || state === 'unknown') return '--:--';
  if (state.includes('T')) {
    const d = new Date(state);
    if (!isNaN(d.getTime())) {
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  }
  const parts = state.split(':');
  if (parts.length >= 2) return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
  return '--:--';
}

function toMinutes(hhmm: string): number {
  if (!hhmm || hhmm === '--:--') return -1;
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function cardinalDir(deg: number): string {
  const dirs: Record<number, string> = {
    0: 'N', 22.5: 'NNE', 45: 'NE', 67.5: 'ENE',
    90: 'E', 112.5: 'ESE', 135: 'SE', 157.5: 'SSE',
    180: 'S', 202.5: 'SSW', 225: 'SW', 247.5: 'WSW',
    270: 'W', 292.5: 'WNW', 315: 'NW', 337.5: 'NNW',
  };
  return dirs[Math.round(deg / 22.5) * 22.5 % 360] || 'N';
}

// Find all entities for a device from hass.entities registry
function findDeviceEntities(hass: any, deviceId: string): Record<string, string> {
  // hass.entities: { entity_id → { device_id, unique_id, platform, ... } }
  if (!hass.entities) return {};
  const result: Record<string, string> = {};
  for (const [entityId, entry] of Object.entries(hass.entities as Record<string, any>)) {
    if (entry.device_id === deviceId) {
      result[entityId] = entry.unique_id || '';
    }
  }
  return result;
}

// ============================================================================
// Component
// ============================================================================

@customElement('prayer-horizon-card')
class PrayerHorizonCard extends LitElement {

  @property({ attribute: false }) public hass: any;

  @state() private _config!: CardConfig;
  @state() private _prayers: PrayerTime[] = [];
  @state() private _hijriDate = '';
  @state() private _nextEvents: Array<{ name: string; date: string }> = [];
  @state() private _qibla = 0;
  @state() private _theme: 'light' | 'dark' = 'light';

  private _interval?: number;

  // --------------------------------------------------------------------------
  // HA API
  // --------------------------------------------------------------------------

  setConfig(config: CardConfig) {
    if (!config.device) throw new Error('device is required');
    this._config = config;
  }

  getCardSize() { return 3; }

  static getStubConfig() {
    return { device: '' };
  }

  // --------------------------------------------------------------------------
  // Lifecycle
  // --------------------------------------------------------------------------

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('hass') && this._config) {
      this._loadFromDevice();
      this._detectTheme();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._interval = window.setInterval(() => this.requestUpdate(), 60000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) clearInterval(this._interval);
  }

  // --------------------------------------------------------------------------
  // Data loading
  // --------------------------------------------------------------------------

  private _detectTheme() {
    const haEl = document.querySelector('home-assistant') as any;
    this._theme = haEl?.attributes?.getNamedItem?.('theme')?.value === 'dark' ? 'dark' : 'light';
  }

  private _loadFromDevice() {
    const hass = this.hass;
    if (!hass || !this._config.device) return;

    // Map entity_id → unique_id for the device
    const deviceEntities = findDeviceEntities(hass, this._config.device);

    // ----- Prayer times -----
    const nowMins = new Date().getHours() * 60 + new Date().getMinutes();
    const times: Array<{ key: string; hhmm: string }> = [];

    for (const key of PRAYER_KEYS) {
      const entityId = Object.keys(deviceEntities).find(id =>
        deviceEntities[id].includes(`prayer_times_${key}`)
      );
      const hhmm = entityId ? toHHMM(hass.states[entityId]?.state ?? '') : '--:--';
      times.push({ key, hhmm });
    }

    // Active = last prayer whose time has passed
    let activeIdx = -1;
    times.forEach(({ hhmm }, i) => {
      const m = toMinutes(hhmm);
      if (m !== -1 && m <= nowMins) activeIdx = i;
    });

    this._prayers = times.map(({ key, hhmm }, i) => ({
      key,
      label: this._(key.charAt(0).toUpperCase() + key.slice(1)),
      time: hhmm,
      active: i === activeIdx,
    }));

    // ----- Hijri date -----
    const hijriId = Object.keys(deviceEntities).find(id =>
      deviceEntities[id].includes('hijri_date') && !deviceEntities[id].includes('tomorrow')
    );
    this._hijriDate = hijriId ? (hass.states[hijriId]?.state ?? '') : '';

    // ----- Events -----
    const eventsId = Object.keys(deviceEntities).find(id =>
      deviceEntities[id].includes('_events')
    );
    if (eventsId) {
      const attrs = hass.states[eventsId]?.attributes ?? {};
      this._nextEvents = [];
      if (attrs.next_event_name) {
        this._nextEvents.push({ name: attrs.next_event_name, date: attrs.next_event_date ?? '' });
      }
      for (const k of ['event_islamic_new_year', 'event_ashura', 'event_first_day_of_ramadan',
                        'event_eid_al_fitr', 'event_day_of_arafat', 'event_eid_al_adha']) {
        if (attrs[k] && this._nextEvents.length < 2) {
          const name = k.replace('event_', '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          this._nextEvents.push({ name, date: attrs[k] });
        }
      }
    }

    // ----- Qibla -----
    const qiblaId = Object.keys(deviceEntities).find(id =>
      deviceEntities[id].includes('qibla')
    );
    this._qibla = qiblaId ? (parseFloat(hass.states[qiblaId]?.state) || 0) : 0;
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  protected render() {
    if (!this._config) return html``;
    return html`
      <ha-card>
        <div class="card ${this._theme}">
          ${this._renderPrayers()}
          ${this._renderInfoBar()}
          ${this._renderEvents()}
          ${this._renderQibla()}
        </div>
      </ha-card>
    `;
  }

  private _renderPrayers() {
    const row1 = this._prayers.slice(0, 3);
    const row2 = this._prayers.slice(3, 6);
    const renderCell = (p: PrayerTime) => html`
      <div class="prayer-cell ${p.active ? 'active' : ''}">
        <span class="prayer-label">${p.label}</span>
        <span class="prayer-time">${p.time}</span>
      </div>
    `;
    return html`
      <div class="prayers-grid">
        <div class="prayers-row">${row1.map(renderCell)}</div>
        <div class="prayers-row">${row2.map(renderCell)}</div>
      </div>
    `;
  }

  private _renderInfoBar() {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return html`
      <div class="info-bar">
        <div class="hijri">
          <span class="section-label">${this._('Hijri Date')}</span>
          <span class="hijri-value">${this._hijriDate || '—'}</span>
        </div>
        <span class="clock">${now}</span>
      </div>
    `;
  }

  private _renderEvents() {
    if (!this._nextEvents.length) return html``;
    return html`
      <div class="events-section">
        <span class="section-label">${this._('Next Events')}</span>
        <div class="events-list">
          ${this._nextEvents.map(ev => html`
            <div class="event-item">
              <span class="event-name">${ev.name}</span>
              ${ev.date ? html`<span class="event-date">${ev.date}</span>` : ''}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _renderQibla() {
    if (!this._qibla) return html``;
    const rad = (this._qibla - 90) * Math.PI / 180;
    const nx = Math.cos(rad) * 28;
    const ny = Math.sin(rad) * 28;
    return html`
      <div class="qibla-section">
        <svg viewBox="-35 -35 70 70" class="compass-svg">
          <circle cx="0" cy="0" r="33" fill="none" stroke="var(--divider-color, #e0e0e0)" stroke-width="1.5"/>
          ${[['N', 0, -26], ['E', 26, 4], ['S', 0, 26], ['W', -26, 4]].map(([l, x, y]) => html`
            <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle"
              font-size="8" font-weight="bold" fill="var(--secondary-text-color, #757575)">${l}</text>
          `)}
          <line x1="0" y1="0" x2="${nx}" y2="${ny}" stroke="#c62828" stroke-width="3" stroke-linecap="round"/>
          <circle cx="${nx}" cy="${ny}" r="4" fill="#c62828"/>
          <circle cx="0" cy="0" r="3" fill="#ef5350"/>
        </svg>
        <div class="qibla-info">
          <span class="qibla-deg">${this._qibla.toFixed(1)}°</span>
          <span class="qibla-dir">${cardinalDir(this._qibla)}</span>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // i18n
  // --------------------------------------------------------------------------

  private _(key: string): string {
    const lang = document.querySelector('html')?.getAttribute('lang') || 'en';
    return (TRANSLATIONS[lang] || TRANSLATIONS['en'])[key] || key;
  }

  // --------------------------------------------------------------------------
  // Styles
  // --------------------------------------------------------------------------

  static styles = css`
    :host { display: block; }
    ha-card { overflow: hidden; }

    .card {
      padding: 12px;
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }

    /* Prayer grid */
    .prayers-grid {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 4px;
    }
    .prayers-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
    }
    .prayer-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 4px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      transition: background 0.2s;
    }
    .prayer-cell.active {
      background: var(--primary-color, #03a9f4);
    }
    .prayer-label {
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color, #757575);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .prayer-cell.active .prayer-label {
      color: var(--text-primary-color, #fff);
      opacity: 0.85;
    }
    .prayer-time {
      font-size: 17px;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
      margin-top: 2px;
    }
    .prayer-cell.active .prayer-time {
      color: var(--text-primary-color, #fff);
    }

    /* Info bar */
    .info-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 4px 4px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.06));
      margin-top: 8px;
    }
    .section-label {
      display: block;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color, #757575);
      margin-bottom: 2px;
    }
    .hijri-value {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
    }
    .clock {
      font-size: 22px;
      font-weight: 300;
      color: var(--primary-text-color, #212121);
    }

    /* Events */
    .events-section {
      padding: 8px 4px 4px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.06));
    }
    .events-list {
      display: flex;
      gap: 12px;
      margin-top: 4px;
    }
    .event-item {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .event-name {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
    }
    .event-date {
      font-size: 10px;
      color: var(--secondary-text-color, #757575);
    }

    /* Qibla */
    .qibla-section {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px 0;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.06));
    }
    .compass-svg { width: 70px; height: 70px; flex-shrink: 0; }
    .qibla-info { display: flex; flex-direction: column; }
    .qibla-deg {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-text-color, #212121);
    }
    .qibla-dir {
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
    }
  `;
}

// ============================================================================
// Register with HA card picker
// ============================================================================

declare global {
  interface Window {
    customCards: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
  interface HTMLElementTagNameMap {
    'prayer-horizon-card': PrayerHorizonCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'prayer-horizon-card',
  name: 'Prayer Horizon Card',
  description: 'Prayer times, Hijri date, Islamic events and Qibla compass — auto-discovered from muslim_calendar device',
  preview: true,
});

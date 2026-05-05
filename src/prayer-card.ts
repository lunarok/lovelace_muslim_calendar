import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {TRANSLATIONS} from './translations.js';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface PrayerConfig {
  entity: string;
  label?: string;
}

interface CardConfig {
  prayer_entities: PrayerConfig[];
  qibla_entity?: string;
  hijri_entity?: string;
  events_entity?: string;
  next_event_entity?: string;
}

// ============================================================================
// Constants
// ============================================================================

const DEGREES: Record<number, string> = {
  0: 'N', 22.5: 'NNE', 45: 'NE', 67.5: 'ENE',
  90: 'E', 112.5: 'ESE', 135: 'SE', 157.5: 'SSE',
  180: 'S', 202.5: 'SSW', 225: 'SW', 247.5: 'WSW',
  270: 'W', 292.5: 'WNW', 315: 'NW', 337.5: 'NNW'
};

// ============================================================================
// Helper Functions
// ============================================================================

// Accepts "HH:MM", "HH:MM:SS", or ISO timestamp "2024-05-05T05:30:00+02:00"
function parseStateToHHMM(state: string): string {
  if (!state || state === 'unavailable' || state === 'unknown') return '--:--';
  // ISO timestamp
  if (state.includes('T')) {
    const d = new Date(state);
    if (!isNaN(d.getTime())) {
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  }
  // Plain "HH:MM" or "HH:MM:SS"
  const parts = state.split(':');
  if (parts.length >= 2) return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
  return '--:--';
}

function timeToMinutes(hhmm: string): number {
  if (!hhmm || hhmm === '--:--') return 0;
  const parts = hhmm.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function cardinallyDegrees(deg: number): string {
  return DEGREES[Math.round(deg / 22.5) * 22.5 % 360] || 'N';
}

// ============================================================================
// Component
// ============================================================================

@customElement('prayer-horizon-card')
class PrayerHorizonCard extends LitElement {

  @property({ attribute: false }) public hass: any;

  @state() private _config!: CardConfig;
  @state() private prayerTimes: Record<string, string> = {};
  @state() private qiblaDirection: number = 0;
  @state() private hijriDate: string = '';
  @state() private nextEvents: Array<{name: string; date: string}> = [];
  @state() private currentTime: number = 0;
  @state() private theme: 'light' | 'dark' = 'light';

  private _interval?: number;

  // --------------------------------------------------------------------------
  // HA Required API
  // --------------------------------------------------------------------------

  setConfig(config: CardConfig) {
    if (!config.prayer_entities || !Array.isArray(config.prayer_entities)) {
      throw new Error('prayer_entities is required and must be an array');
    }
    this._config = config;
  }

  getCardSize(): number {
    return 4;
  }

  static getStubConfig(): CardConfig {
    return {
      prayer_entities: [
        { entity: 'sensor.fajr_time', label: 'Fajr' },
        { entity: 'sensor.shuruq_time', label: 'Sunrise' },
        { entity: 'sensor.dhuhr_time', label: 'Dhuhr' },
        { entity: 'sensor.asr_time', label: 'Asr' },
        { entity: 'sensor.maghrib_time', label: 'Maghrib' },
        { entity: 'sensor.isha_time', label: 'Isha' },
      ],
    };
  }

  // --------------------------------------------------------------------------
  // Lifecycle
  // --------------------------------------------------------------------------

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('hass') && this._config) {
      this._loadStates(this.hass);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._interval = window.setInterval(() => this._updateCurrentTime(), 60000);
    this._updateCurrentTime();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) clearInterval(this._interval);
  }

  // --------------------------------------------------------------------------
  // State Loading
  // --------------------------------------------------------------------------

  private _updateCurrentTime() {
    const now = new Date();
    this.currentTime = now.getHours() * 60 + now.getMinutes();
    const haEl = document.querySelector('home-assistant');
    this.theme = haEl?.attributes.getNamedItem('theme')?.value === 'dark' ? 'dark' : 'light';
  }

  private _loadStates(hass: any) {
    if (!hass) return;

    // Load prayer times
    if (this._config.prayer_entities) {
      this.prayerTimes = {};
      for (const p of this._config.prayer_entities) {
        const stateObj = hass.states[p.entity];
        if (stateObj) {
          const key = p.label?.toLowerCase() || p.entity.split('_').pop() || p.entity;
          this.prayerTimes[key] = parseStateToHHMM(stateObj.state);
        }
      }
    }

    // Load Qibla
    if (this._config.qibla_entity) {
      const stateObj = hass.states[this._config.qibla_entity];
      if (stateObj) this.qiblaDirection = parseFloat(stateObj.state) || 0;
    }

    // Load Hijri date
    if (this._config.hijri_entity) {
      const stateObj = hass.states[this._config.hijri_entity];
      if (stateObj) this.hijriDate = stateObj.state;
    }

    // Load events
    if (this._config.events_entity) {
      const stateObj = hass.states[this._config.events_entity];
      if (stateObj) {
        try {
          const attrs = stateObj.attributes || {};
          this.nextEvents = [];
          if (attrs.next_event_name) {
            this.nextEvents.push({ name: attrs.next_event_name, date: attrs.next_event_date || '' });
          }
          const eventKeys = ['event_islamic_new_year', 'event_ashura', 'event_first_day_of_ramadan',
                             'event_eid_al_fitr', 'event_day_of_arafat', 'event_eid_al_adha'];
          for (const key of eventKeys) {
            if (attrs[key] && this.nextEvents.length < 2) {
              const evName = key.replace('event_', '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              this.nextEvents.push({ name: evName, date: attrs[key] || '' });
            }
          }
        } catch (e) {
          console.error('Prayer card: error parsing events', e);
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  protected render() {
    if (!this._config) return html``;

    return html`
      <ha-card>
        <div class="card-container ${this.theme}">
          ${this._renderHorizonArc()}
          ${this._renderInfoBar()}
          ${this._renderEventsBar()}
          ${this._renderQiblaCompass()}
        </div>
      </ha-card>
    `;
  }

  private _renderHorizonArc() {
    const prayers = [
      { key: 'fajr', label: this._('Fajr'), time: this.prayerTimes['fajr'] },
      { key: 'shuruq', label: this._('Sunrise'), time: this.prayerTimes['sunrise'] },
      { key: 'dhuhr', label: this._('Dhuhr'), time: this.prayerTimes['dhuhr'] },
      { key: 'asr', label: this._('Asr'), time: this.prayerTimes['asr'] },
      { key: 'maghrib', label: this._('Maghrib'), time: this.prayerTimes['maghrib'] },
      { key: 'isha', label: this._('Isha'), time: this.prayerTimes['isha'] },
    ];

    const prayerMinutes = prayers.map(p => ({
      ...p,
      minutes: timeToMinutes(p.time || '00:00')
    }));

    const now = this.currentTime;
    const viewStart = now - 120;
    const viewEnd = now + 120;

    const toX = (mins: number): number => ((mins - viewStart) / (viewEnd - viewStart)) * 360;
    const toY = (mins: number, base: number, amplitude: number): number => {
      return base - amplitude * Math.sin(((mins - viewStart) / (viewEnd - viewStart)) * Math.PI);
    };

    const midY = 90;
    const amplitude = 60;

    const nowX = toX(now);

    return html`
      <div class="horizon-section">
        <svg viewBox="0 0 360 120" class="horizon-svg">
          <defs>
            <linearGradient id="dayGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--card-bg-day, #f0f4ff)"/>
              <stop offset="100%" stop-color="var(--card-bg-horizon, #ffe0b2)"/>
            </linearGradient>
          </defs>

          <!-- Horizon arc -->
          <path
            d="M 30,100 Q 90,30 180,25 Q 270,30 330,100"
            fill="none"
            stroke="var(--card-arc-color, #90caf9)"
            stroke-width="2"
            stroke-dasharray="4,2"
          />

          <!-- Prayer time markers -->
          ${prayerMinutes.map((p, i) => html`
            <g class="prayer-marker">
              <circle
                cx="${toX(p.minutes)}"
                cy="${toY(p.minutes, midY, amplitude)}"
                r="6"
                fill="${i === 0 ? '#7B1FA2' : i === 4 ? '#E65100' : '#1565C0'}"
                stroke="white"
                stroke-width="1.5"
              />
              <line
                x1="${toX(p.minutes)}"
                y1="${toY(p.minutes, midY, amplitude) + 7}"
                x2="${toX(p.minutes)}"
                y2="115"
                stroke="var(--card-line-color, #90caf9)"
                stroke-width="1"
                stroke-dasharray="2,2"
              />
              <text
                x="${toX(p.minutes)}"
                y="118"
                text-anchor="middle"
                font-size="8"
                fill="var(--card-text-color, #37474f)"
              >${p.label}</text>
              <text
                x="${toX(p.minutes)}"
                y="${toY(p.minutes, midY, amplitude) - 12}"
                text-anchor="middle"
                font-size="7"
                fill="var(--card-time-color, #1565C0)"
                font-weight="bold"
              >${p.time || '--:--'}</text>
            </g>
          `)}

          <!-- Now indicator -->
          ${nowX >= 30 && nowX <= 330 ? html`
            <line x1="${nowX}" y1="10" x2="${nowX}" y2="115" stroke="var(--card-now-color, #f44336)" stroke-width="2"/>
            <circle cx="${nowX}" cy="10" r="4" fill="var(--card-now-color, #f44336)"/>
            <text x="${nowX}" y="8" text-anchor="middle" font-size="6" fill="var(--card-now-color, #f44336)">${this._('Now')}</text>
          ` : ''}
        </svg>
      </div>
    `;
  }

  private _renderInfoBar() {
    return html`
      <div class="info-bar">
        <div class="hijri-date">
          <span class="label">${this._('Hijri Date')}</span>
          <span class="value">${this.hijriDate || '—'}</span>
        </div>
        <div class="time-display">
          <span class="current-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>
    `;
  }

  private _renderEventsBar() {
    if (this.nextEvents.length === 0) return html``;
    return html`
      <div class="events-bar">
        ${this.nextEvents.map(ev => html`
          <div class="event-item">
            <span class="event-name">${ev.name}</span>
            ${ev.date ? html`<span class="event-date">${ev.date}</span>` : ''}
          </div>
        `)}
      </div>
    `;
  }

  private _renderQiblaCompass() {
    const deg = this.qiblaDirection;
    const cardinal = cardinallyDegrees(deg);
    const rad = (deg - 90) * Math.PI / 180;
    const needleX = Math.cos(rad) * 28;
    const needleY = Math.sin(rad) * 28;

    return html`
      <div class="compass-section">
        <svg viewBox="-35 -35 70 70" class="compass-svg">
          <circle cx="0" cy="0" r="33" fill="none" stroke="var(--card-compass-ring, #90a4ae)" stroke-width="1.5"/>
          ${[['N', 0, -28], ['E', 28, 5], ['S', 0, 28], ['W', -28, 5]].map(([l, x, y]) => html`
            <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="9" font-weight="bold" fill="var(--card-cardinal-color, #37474f)">${l}</text>
          `)}
          <line x1="0" y1="0" x2="${needleX}" y2="${needleY}" stroke="#c62828" stroke-width="3" stroke-linecap="round"/>
          <circle cx="${needleX}" cy="${needleY}" r="4" fill="#c62828"/>
          <circle cx="0" cy="0" r="4" fill="#ef5350"/>
          <circle cx="0" cy="0" r="2" fill="var(--card-compass-ring, #90a4ae)"/>
        </svg>
        <div class="compass-info">
          <span class="qibla-degrees">${deg.toFixed(1)}°</span>
          <span class="qibla-direction">${cardinal}</span>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------

  private _(key: string): string {
    const lang = document.querySelector('html')?.getAttribute('lang') || 'en';
    return (TRANSLATIONS[lang] || TRANSLATIONS['en'])[key] || key;
  }

  // --------------------------------------------------------------------------
  // Styles
  // --------------------------------------------------------------------------

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      padding: 0;
      border-radius: 12px;
      overflow: hidden;
    }
    .card-container {
      padding: 12px;
      font-family: var(--font-family, 'Roboto', sans-serif);
    }
    .card-container.dark {
      --card-text-color: #e0e0e0;
      --card-arc-color: #64b5f6;
      --card-line-color: #546e7a;
      --card-time-color: #90caf9;
      --card-bg-day: #1a237e;
      --card-bg-horizon: #ff8a65;
      --card-cardinal-color: #b0bec5;
      --card-compass-ring: #78909c;
      --card-now-color: #ef5350;
    }
    .card-container.light {
      --card-text-color: #37474f;
      --card-arc-color: #42a5f5;
      --card-line-color: #bbdefb;
      --card-time-color: #1565c0;
      --card-bg-day: #e3f2fd;
      --card-bg-horizon: #fff3e0;
      --card-cardinal-color: #37474f;
      --card-compass-ring: #90a4ae;
      --card-now-color: #e53935;
    }

    .horizon-section { width: 100%; }
    .horizon-svg { width: 100%; height: 120px; }

    .info-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 4px;
      border-top: 1px solid rgba(0,0,0,0.06);
      margin-top: 4px;
    }
    .hijri-date { display: flex; flex-direction: column; }
    .hijri-date .label { font-size: 10px; color: var(--card-text-color); opacity: 0.7; text-transform: uppercase; }
    .hijri-date .value { font-size: 14px; font-weight: 600; color: var(--card-text-color); }
    .time-display { font-size: 20px; font-weight: 300; color: var(--card-text-color); }

    .events-bar {
      display: flex;
      gap: 12px;
      padding: 8px 4px;
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    .event-item { display: flex; flex-direction: column; flex: 1; }
    .event-name { font-size: 11px; font-weight: 600; color: var(--card-text-color); }
    .event-date { font-size: 9px; color: var(--card-text-color); opacity: 0.7; }

    .compass-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 8px;
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    .compass-svg { width: 100px; height: 100px; }
    .compass-info { display: flex; gap: 8px; align-items: baseline; }
    .qibla-degrees { font-size: 16px; font-weight: 700; color: var(--card-text-color); }
    .qibla-direction { font-size: 12px; color: var(--card-text-color); opacity: 0.8; }

    .prayer-marker { cursor: pointer; }
    .prayer-marker:hover circle { r: 8; }
  `;
}

// ============================================================================
// Register card with Home Assistant card picker
// ============================================================================

declare global {
  interface Window {
    customCards: Array<{type: string; name: string; description: string; preview?: boolean}>;
  }
  interface HTMLElementTagNameMap {
    'prayer-horizon-card': PrayerHorizonCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'prayer-horizon-card',
  name: 'Prayer Horizon Card',
  description: 'Prayer times arc, Hijri date, Qibla compass and Islamic events',
  preview: true,
});

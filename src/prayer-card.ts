import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg, localized, str } from '@lit/localize';
import {TRANSLATIONS} from './translations.js';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface PrayerConfig {
  entity: string;
  label?: string;
}

interface EventConfig {
  entity: string;
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

const ICON_SUNRISE = 'M12,2V4M12,20V22M4,12H2M20,12H22M5.6,5.6L3.9,3.9M18.1,18.1L20.6,20.6M5.6,18.4L3.9,20.6M18.1,5.6L20.6,3.9';

const PRAYER_ICONS: Record<string, string> = {
  fajr: 'M12,3L2,12H5V20H19V12H22L12,3Z',
  shuruq: 'M12,2L2,12H5V20H19V12H22L12,2Z',
  dhuhr: 'M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z',
  asr: 'M3,12H21M12,3V21M12,3L6,9M12,3L18,9',
  maghrib: 'M12,1L2,12H5V20H19V12H22L12,1Z',
  isha: 'M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3Z'
};

// ============================================================================
// Helper Functions
// ============================================================================

function timeToMinutes(timeStr: string): number {
  if (!timeStr || timeStr === '--:--') return 0;
  const parts = timeStr.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(((minutes % 1440) + 1440) % 1440 / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function cardinallyDegrees(deg: number): string {
  return DEGREES[Math.round(deg / 22.5) * 22.5 % 360] || 'N';
}

function getHass(): any {
  return (window as any).homeAssistant?.hass;
}

// ============================================================================
// Component
// ============================================================================

@customElement('prayer-horizon-card')
export class PrayerHorizonCard extends LitElement {

  @property({ type: Object }) public config!: CardConfig;

  @state() private prayerTimes: Record<string, string> = {};
  @state() private qiblaDirection: number = 0;
  @state() private hijriDate: string = '';
  @state() private events: Array<{name: string; date: string}> = [];
  @state() private nextEvents: Array<{name: string; date: string}> = [];
  @state() private currentTime: number = 0;
  @state() private theme: 'light' | 'dark' = 'light';

  private _interval?: number;

  // --------------------------------------------------------------------------
  // Lifecycle
  // --------------------------------------------------------------------------

  connectedCallback() {
    super.connectedCallback();
    this._interval = window.setInterval(() => this._updateCurrentTime(), 60000);
    this._updateCurrentTime();
    this._loadStates();

    // Listen for homeassistant-subscription events
    window.addEventListener('homeassistant-updated', () => this._loadStates());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) clearInterval(this._interval);
    window.removeEventListener('homeassistant-updated', () => this._loadStates());
  }

  // --------------------------------------------------------------------------
  // State Loading
  // --------------------------------------------------------------------------

  private _updateCurrentTime() {
    const now = new Date();
    this.currentTime = now.getHours() * 60 + now.getMinutes();
    this.theme = document.querySelector('home-assistant')?.attributes.getNamedItem('theme')?.value === 'dark' ? 'dark' : 'light';
  }

  private _loadStates() {
    const hass = getHass();
    if (!hass) return;

    // Load prayer times
    if (this.config.prayer_entities) {
      this.prayerTimes = {};
      for (const p of this.config.prayer_entities) {
        const state = hass.states[p.entity];
        if (state) {
          const key = p.entity.split('_').pop() || p.entity;
          this.prayerTimes[key] = state.state;
        }
      }
    }

    // Load Qibla
    if (this.config.qibla_entity) {
      const state = hass.states[this.config.qibla_entity];
      if (state) this.qiblaDirection = parseFloat(state.state) || 0;
    }

    // Load Hijri date
    if (this.config.hijri_entity) {
      const state = hass.states[this.config.hijri_entity];
      if (state) this.hijriDate = state.state;
    }

    // Load events
    if (this.config.events_entity) {
      const state = hass.states[this.config.events_entity];
      if (state) {
        try {
          const attrs = state.attributes || {};
          this.events = [];
          const eventKeys = ['next_event_name', 'next_event_date', 'event_islamic_new_year', 'event_ashura',
                            'event_first_day_of_ramadan', 'event_eid_al_fitr', 'event_day_of_arafat', 'event_eid_al_adha'];
          // Show next 2 events from attributes
          if (attrs.next_event_name) {
            this.nextEvents = [{ name: attrs.next_event_name, date: attrs.next_event_date || '' }];
          }
          // Also scan for other event attributes
          for (const key of eventKeys.slice(2)) {
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
      { key: 'shuruq', label: this._('Sunrise'), time: this.prayerTimes['shuruq'] },
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
    const viewStart = now - 120; // 2h before
    const viewEnd = now + 120;   // 2h after

    const toX = (mins: number): number => ((mins - viewStart) / (viewEnd - viewStart)) * 360;
    const toY = (mins: number, base: number, amplitude: number): number => {
      return base - amplitude * Math.sin(((mins - viewStart) / (viewEnd - viewStart)) * Math.PI);
    };

    const midY = 90;
    const amplitude = 60;

    // Arc path
    const arcPoints = prayerMinutes.map(p => `${toX(p.minutes)},${toY(p.minutes, midY, amplitude)}`);
    const sunPath = `M ${toX(viewStart)},${midY} ` + prayerMinutes.map(p => `Q ${toX(p.minutes)},${toY(p.minutes, midY, amplitude)} ${toX(p.minutes + 1)},${toY(p.minutes + 1, midY, amplitude)}`).join(' ');

    // Horizon line
    const nowX = toX(now);
    const nowY = midY;

    return html`
      <div class="horizon-section">
        <svg viewBox="0 0 360 120" class="horizon-svg">
          <!-- Background arc zones -->
          <defs>
            <linearGradient id="dayGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--card-bg-day, #f0f4ff)"/>
              <stop offset="100%" stop-color="var(--card-bg-horizon, #ffe0b2)"/>
            </linearGradient>
            <linearGradient id="nightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--card-bg-night, #1a237e)"/>
              <stop offset="100%" stop-color="var(--card-bg-night-deep, #0d1b3e)"/>
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
            <g class="prayer-marker" @click=${() => this._showPrayerInfo(p)}>
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
            <line
              x1="${nowX}" y1="10"
              x2="${nowX}" y2="115"
              stroke="var(--card-now-color, #f44336)"
              stroke-width="2"
            />
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
          <!-- Outer ring -->
          <circle cx="0" cy="0" r="33" fill="none" stroke="var(--card-compass-ring, #90a4ae)" stroke-width="1.5"/>
          <!-- Cardinal letters -->
          ${[['N', 0, -28], ['E', 28, 5], ['S', 0, 28], ['W', -28, 5]].map(([l, x, y]) => html`
            <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="9" font-weight="bold" fill="var(--card-cardinal-color, #37474f)">${l}</text>
          `)}
          <!-- Qibla needle -->
          <line x1="0" y1="0" x2="${needleX}" y2="${needleY}" stroke="#c62828" stroke-width="3" stroke-linecap="round"/>
          <circle cx="${needleX}" cy="${needleY}" r="4" fill="#c62828"/>
          <circle cx="0" cy="0" r="4" fill="#ef5350"/>
          <!-- Center dot -->
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

  private _showPrayerInfo(prayer: any) {
    // Could emit event or show toast
    console.log('Prayer:', prayer);
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
      background: var(--card-background, #ffffff);
    }
    .card-container {
      padding: 12px;
      font-family: var(--font-family, 'Roboto', sans-serif);
    }
    .card-container.dark {
      --card-background: #1e1e1e;
      --card-text-color: #e0e0e0;
      --card-arc-color: #64b5f6;
      --card-line-color: #546e7a;
      --card-time-color: #90caf9;
      --card-bg-day: #1a237e;
      --card-bg-horizon: #ff8a65;
      --card-bg-night: #0d1b3e;
      --card-cardinal-color: #b0bec5;
      --card-compass-ring: #78909c;
      --card-now-color: #ef5350;
    }
    .card-container.light {
      --card-background: #ffffff;
      --card-text-color: #37474f;
      --card-arc-color: #42a5f5;
      --card-line-color: #bbdefb;
      --card-time-color: #1565c0;
      --card-bg-day: #e3f2fd;
      --card-bg-horizon: #fff3e0;
      --card-bg-night: #1a237e;
      --card-cardinal-color: #37474f;
      --card-compass-ring: #90a4ae;
      --card-now-color: #e53935;
    }

    /* Horizon Arc */
    .horizon-section { width: 100%; }
    .horizon-svg { width: 100%; height: 120px; }

    /* Info Bar */
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

    /* Events Bar */
    .events-bar {
      display: flex;
      gap: 12px;
      padding: 8px 4px;
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    .event-item { display: flex; flex-direction: column; flex: 1; }
    .event-name { font-size: 11px; font-weight: 600; color: var(--card-text-color); }
    .event-date { font-size: 9px; color: var(--card-text-color); opacity: 0.7; }

    /* Compass */
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

    /* Prayer marker hover */
    .prayer-marker { cursor: pointer; }
    .prayer-marker:hover circle { r: 8; }
  `;
}

// ============================================================================
// Declare global types for TypeScript
// ============================================================================

declare global {
  interface HTMLElementTagNameMap {
    'prayer-horizon-card': PrayerHorizonCard;
  }
}
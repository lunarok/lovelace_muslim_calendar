# Prayer Horizon Card

A Lovelace card for Home Assistant showing prayer times on a horizon arc, next events, and Qibla compass.

![Prayer Horizon Card](images/preview.png)

## Installation

### Via HACS (recommended)

1. Open HACS → Add → Custom Repository
2. Add: `https://github.com/lunarok/lovelace_muslim_calendar`
3. Select **Lovelace**
4. Click **Download**
5. Restart Home Assistant

### Manual

Copy `dist/prayer-card.js` to your `www/` folder and reference it in your dashboard.

## Configuration

```yaml
type: custom:prayer-horizon-card
prayer_entities:
  - entity: sensor.muslim_calendar_prayer_fajr
  - entity: sensor.muslim_calendar_prayer_shuruq
  - entity: sensor.muslim_calendar_prayer_dhuhr
  - entity: sensor.muslim_calendar_prayer_asr
  - entity: sensor.muslim_calendar_prayer_maghrib
  - entity: sensor.muslim_calendar_prayer_isha
qibla_entity: sensor.muslim_calendar_qibla_direction
hijri_entity: sensor.muslim_calendar_hijri_date
events_entity: sensor.muslim_calendar_events
```

## Features

- **Prayer times arc** — 5 mandatory prayers + sunrise displayed on a horizon-style arc
- **Now indicator** — red line showing current position on the arc
- **Hijri date** — current Hijri date from Muslim Calendar plugin
- **Next events** — upcoming Islamic events (Ramadan, Eid, etc.) from Muslim Calendar
- **Qibla compass** — visual compass with degrees and cardinal direction
- **Theme support** — automatic light/dark mode based on HA theme
- **Multilingual** — EN, FR, ID, MS, DE, TR, AR, ZH, IT, ES, UR, FA

## Requirements

- [Muslim Calendar](https://github.com/lunarok/muslim_calendar) plugin installed in Home Assistant
- HACS for easy updates

## Build from source

```bash
npm install
npm run build
```

## License

MIT
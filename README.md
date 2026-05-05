# Prayer Horizon Card

A Lovelace card for Home Assistant displaying prayer times, Hijri date, next Islamic events and Qibla compass — powered by the [Muslim Calendar](https://github.com/lunarok/muslim_calendar) integration.

## Installation

### Via HACS (recommended)

1. HACS → Menu → Custom repositories
2. Add `https://github.com/lunarok/lovelace_muslim_calendar` as **Lovelace**
3. Click **Download**
4. Restart Home Assistant

### Manual

Copy `prayer-card.js` to your `www/` folder and add it as a Lovelace resource.

## Configuration

The card only needs the `device` parameter — it auto-discovers all entities from the Muslim Calendar integration.

```yaml
type: custom:prayer-horizon-card
device: <device_id>
```

### Finding the device_id

1. Go to **Settings → Devices & Services → Devices**
2. Search for **Muslim Calendar**
3. Click on the device
4. The device_id is in the URL: `/config/devices/device/<device_id>`

## Features

- **Prayer times grid** — Fajr, Shuruq, Dhuhr (row 1) · Asr, Maghrib, Isha (row 2)
- **Active prayer** — highlighted with your HA primary color
- **Hijri date** — current Islamic date
- **Next events** — upcoming Islamic events (Ramadan, Eid, etc.)
- **Qibla compass** — direction with degrees and cardinal point
- **Auto-discovery** — all entities found automatically from the device
- **Multilingual** — EN, FR, ID, MS, DE, TR, AR, ZH, IT, ES, UR, FA

## Requirements

- [Muslim Calendar](https://github.com/lunarok/muslim_calendar) integration installed in Home Assistant

## Build from source

```bash
npm install
npm run build
```

## License

MIT

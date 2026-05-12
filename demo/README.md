# 🎬 Shambasmart Demo Video Kit

Everything you need to record a 75-second pitch video.

## Files in this folder

- `demo.srt` — caption file ready to import into CapCut / Premiere / DaVinci
- `README.md` — this file (the playbook)

---

## Step 1 — Seed great-looking demo data (1 min)

The site looks empty by default. Seed 12 realistic Tanzanian farmers across regions so the **Admin → Users**, **Activity**, and **Dashboard** screens look full on camera.

### On your local machine

```powershell
$env:SEED_DEMO="true"; node server.js
```

You'll see: `Seeded 12 demo farmers` in the logs. Stop and restart normally.

### On Render (production)

1. Go to **dashboard.render.com → shambasmart → Environment**
2. Add new env var:
   - Key: `SEED_DEMO`
   - Value: `true`
3. Click **Save Changes** — Render auto-redeploys
4. After deploy succeeds, **remove the env var** (so it doesn't reseed every restart)

The seed is idempotent: it skips users that already exist.

---

## Step 2 — Use the new "Try Live Demo" button

On the Landing page, instead of typing credentials during recording, **click "Try Live Demo"** — it auto-logs in as the demo farmer.

Saves you ~10s of fumbling on camera.

---

## Step 3 — The 75-second shot list

| # | Time | Screen | Caption | Action |
|---|---|---|---|---|
| 1 | 0:00 | Black → Logo | **40 million Tanzanian farmers.** | Logo zoom-in |
| 2 | 0:04 | Stock farm photo | **Lose 30% of harvests to weather, pests & price guesses.** | Ken-Burns zoom |
| 3 | 0:09 | Landing page | **Until now.** | Quick scroll |
| 4 | 0:13 | Login (new design) | **AI built for them. In Swahili.** | Click "Farmer" demo card → Sign In |
| 5 | 0:20 | Dashboard | **One screen. Everything they need.** | Hover cards, scroll once |
| 6 | 0:30 | Weather | **Hyper-local weather + AI advice.** | Switch location: Arusha → Mbeya |
| 7 | 0:38 | Market Prices | **Live market prices across 10 regions.** | Switch crop: Maize → Tomatoes |
| 8 | 0:46 | Disease Diagnosis | **Snap a leaf. Get a diagnosis.** | Drag-drop crop image, show result |
| 9 | 0:56 | Admin Panel | **Built for scale. Full admin suite.** | Quick scroll: stats → users → activity |
| 10 | 1:03 | Phone + Web mockup | **Web. Mobile. Bilingual. Free.** | Side-by-side fade |
| 11 | 1:11 | Logo + URL | **shambasmart.co.tz** | Brand fade-out |

---

## Step 4 — Recording setup

### Tools (all free, Windows)

- **OBS Studio** — screen capture (smoother than Xbox Game Bar)
- **Pointer Focus** — highlights mouse with a glow circle on click
- **CapCut Desktop** — drag-drop captions (`demo.srt`), transitions, music

### Browser setup

```
☐ Chrome incognito (no extensions, no autofill popups)
☐ Window maximized at 1920×1080
☐ Browser zoom = 100%
☐ Bookmarks bar HIDDEN (Ctrl+Shift+B)
☐ Visit Render URL once 60 seconds before recording (warms up the cold start)
```

### Recording settings

```
Resolution: 1920×1080
Framerate:  60 fps (or 30 if your machine struggles)
Bitrate:    8000 kbps
Format:     mp4 (H.264)
Audio:      OFF (you don't need voiceover for caption-only)
```

---

## Step 5 — Editing in CapCut (10-15 min)

1. New project → Import your screen recording
2. **Drag `demo.srt`** onto the timeline → captions appear with correct timing
3. Style captions:
   - Font: **Plus Jakarta Sans Bold** (matches your app brand)
   - Size: 64-72px
   - Color: white with a subtle drop shadow
   - Background: optional 80% black pill
   - Position: bottom-center, ~10% from bottom edge
4. Add **fast cuts every 2-4 seconds** between scenes
5. Add a **whoosh sound** on each transition (CapCut → Sound effects → search "whoosh")
6. Background music:
   - Pixabay → search "uplifting agriculture", "tech startup"
   - Recommended BPM: 110-130 (matches cut tempo)
   - Volume: -18dB (loud enough to feel, quiet enough to not distract)
7. Add a **bass-drop-style hit** at 0:13 ("Until now.") for impact
8. Final logo card: hold for 4s with music swell

---

## Step 6 — Export

```
Format:    mp4 (H.264)
Resolution: 1920×1080
Framerate: 30 fps (smaller file) or 60 fps (smoother)
Bitrate:   high (~10 Mbps)
```

Resulting file: ~30-50 MB for 75 seconds. Perfect for LinkedIn, Twitter/X, WhatsApp, hackathon submissions.

---

## Pro tips

- **Re-record bad takes scene-by-scene.** Don't try to record the whole flow in one shot.
- **Use cursor highlights ALWAYS.** Viewers can't follow a tiny mouse on a 1080p video.
- **Slow your hover.** Move the mouse 2x slower than feels natural — the camera makes movement look frantic.
- **Pre-load every page in another tab** before recording so there's no spinner.
- **Turn off notifications** (Windows Focus Assist → Priority Only).
- **The first 3 seconds are everything.** Hook them with the "40 million farmers" stat or a bold visual.

---

## Quick credentials reference

| Role | Email | Password |
|---|---|---|
| Farmer | farmer@shambasmart.co.tz | farmer123 |
| Admin | admin@agrimind.co.tz | admin123 |
| Demo farmers (seeded) | neema.j@demo.tz, juma.m@demo.tz, ... | demo123 |

You're ready to record. 🎬

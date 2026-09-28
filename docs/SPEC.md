# Vedic Lifestyle Diet — Phase 1 master spec

A public, free, offline-capable Ayurvedic diet web app (static PWA, no build tools, no server, no framework). Evolves the existing "Pitta Plate" app in this folder. Audience: Indian users of all ages (elderly, adults, youth); South Indian / Telugu food habits first, but usable by anyone.

## Non-negotiable rules
1. **Educational only.** Never say "cure", "reverse", "treats", "heals", "guaranteed". Use "traditionally said to", "may help", "Ayurveda suggests", "classical texts describe". Effects of foods/combinations are "traditional concerns", not medical facts.
2. Dosha quiz result is always "your **likely** constitution (prakriti)". It is not a diagnosis. User can retake or pick a type manually.
3. No disease pages, no herbal medicines, no doses in Phase 1. (Phase 2.)
4. Disclaimer shown on first open (must tap "I understand") and always reachable in Me and Learn: "Vedic Lifestyle Diet shares traditional Ayurvedic food wisdom for education. It is not medical advice, diagnosis or treatment. If you are pregnant, have diabetes, high BP, kidney, heart or thyroid conditions, allergies or take regular medicines, talk to your doctor before changing your diet. Never stop or change prescribed medicines because of this app."
5. Every classical claim carries a `source` string (text, section, chapter.verse where known). If a verse is not certain, write the chapter only and set `verified:false`; the UI shows "source: traditional teaching" for unverified.
6. Accessibility: base font 17px, text-size setting (Normal / Large / Extra large) stored in settings, all tap targets ≥ 48px, contrast ≥ 4.5:1, `prefers-reduced-motion` disables animation, works at 320px width, no horizontal scroll.
7. All user data stays in the browser (localStorage). Keep existing keys: `pd.settings`, `pd.days`, `pd.weights`, `pd.defaults`, `pd.bought`. New keys also use the `pd.` prefix.
8. No external requests except Google Fonts (optional; must degrade to system fonts offline).

## Files (load order in index.html, all classic `<script defer>` sharing globals)
| File | Contents |
|---|---|
| `data.js` | `SLOTS`, `CATEGORY`, `EAT_OUT`, `RULES`, `GOALS`, `DAILY` |
| `data-foods.js` | `FOODS` (food library) |
| `data-learn.js` | `DOSHAS`, `VIRUDDHA`, `VIRUDDHA_TYPES`, `SOURCES`, `DISCLAIMER` |
| `data-quiz.js` | `QUIZ`, `TYPES`, `scoreQuiz(answers)` |
| `app.js` | core: store, settings, dates, router, Today, Progress (weight + streak), grocery |
| `views.js` | Foods, Learn, Me (quiz UI, onboarding, settings, meal times, .ics export, backup) |
| `index.html`, `styles.css`, `sw.js`, `manifest.json`, `art.js` (inline SVG illustrations as strings in `ART`) |

## Data schemas

### Dosha codes
`'V'` Vata, `'P'` Pitta, `'K'` Kapha. A constitution (`TYPES` key) is one of: `V`, `P`, `K`, `VP`, `PK`, `VK`, `VPK`.

### SLOTS (data.js) — keep existing structure, add `suits`
```js
{ id:'breakfast', label:'Breakfast', time:'08:00', main:true, options:[
  { name:'Moong dal chilla + banana', type:'veg', light:false, suits:['P','K'], ing:['Moong dal','Banana'] }, ...]}
```
- Existing slot ids stay: wake, breakfast, mid, lunch, snack, postgym (gymOnly), fruit (optional), dinner (vegOnly), bed.
- EXISTING option `name` strings must not change (saved picks match by name) — except "Banana + warm milk" (viruddha) which is replaced by "Dates + warm milk".
- `suits`: array of doshas this option is traditionally good for (at least one).
- `type`: 'veg' | 'egg' | 'nonveg'. Include varied non-veg (fish, prawns, mutton, desi chicken) in lunch; egg options in breakfast/lunch.
- Target option counts: breakfast ≥ 14, lunch ≥ 16, dinner ≥ 12, mid ≥ 8, snack ≥ 10, postgym ≥ 5, fruit ≥ 7, wake ≥ 5, bed ≥ 5. Every dosha must have ≥ 4 veg options in each main slot.
- Every `ing` value must appear in exactly one `CATEGORY` list.

### Option filtering (app.js `optionsFor(slot)`)
1. Diet filter as today (veg < egg < nonveg; dinner vegOnly).
2. Constitution filter: let `D = settings.type` letters (default 'P' if unset). Keep options where `suits` includes **any** letter of D. Sort: options suiting **all** letters of D first, preserving original order otherwise. If the filter leaves 0, fall back to the diet-filtered list.

### EAT_OUT (data.js)
`EAT_OUT = { V:{breakfast:{safe:[],avoid:[]},lunch:{...},snack:{...},dinner:{...}}, P:{...}, K:{...} }`. For dual types show both lists merged (dedupe).

### RULES (data.js)
`RULES = { all:[...general], V:[...], P:[...], K:[...] }` — short, warm sentences.

### GOALS (data.js)
`GOALS = { gain:{label, weekly:[0.25,0.5], tips:{V:[],P:[],K:[]}, portion:'...', gym:'...'}, lose:{..., weekly:[-0.5,-0.25]}, maintain:{..., weekly:[-0.2,0.2]} }`. Gym advice per goal (e.g. gain: strength training 3-4x/week, progressive load; lose: brisk walking daily + strength 2-3x/week). Pitta: avoid midday heat. Kapha: vigorous morning exercise. Vata: steady, not exhausting.

### DAILY (data.js)
30+ short "one small thing today" cards: `{ text:'Sip warm water through the morning.', for:['V','K'] }` (for: doshas or 'all').

### FOODS (data-foods.js) — ~160 items
```js
{ id:'sona-masuri', name:'Sona masuri rice', aka:['sona masoori','biyyam','chawal'], cat:'Rice', type:'veg',
  V:1, P:1, K:-1, why:'Sweet, soft, easy to digest; heavier for Kapha — prefer old rice or smaller portions.' }
```
- `V/P/K`: 1 = favour, 0 = in moderation, -1 = reduce.
- `cat` one of: 'Rice', 'Millets & grains', 'Dals & legumes', 'Leafy greens', 'Vegetables', 'Fruits', 'Dairy', 'Oils & ghee', 'Eggs', 'Fish & seafood', 'Meat & poultry', 'Nuts & seeds', 'Spices & herbs', 'Sweeteners', 'Drinks'.
- Must include: rice varieties (sona masuri, basmati, brown, red/matta, black rice, old rice, parboiled, jeera samba, poha/aval), millets (ragi, jowar, bajra, foxtail, little, kodo, barnyard, barley, wheat, oats), dals (moong whole/split, toor, masoor, urad, chana, horse gram, rajma, lobia, peas), leafy greens (palak, methi, thotakura/amaranth, gongura, curry leaves, coriander, mint, moringa leaves, ponnaganti, pudina, drumstick leaves, chukka koora, bachali), vegetables (lauki, ridge gourd, snake gourd, ash gourd, pumpkin, bitter gourd, drumstick, okra, brinjal, tomato, carrot, beetroot, beans, cabbage, cauliflower, potato, sweet potato, raw banana, cucumber, onion, garlic, radish), fruits, dairy (milk, curd, buttermilk, paneer, ghee, butter), eggs, fish & seafood (rohu, seer/vanjaram, pomfret, sardine/mathi, mackerel, prawns, crab), meat (desi chicken, broiler chicken, mutton/goat, lamb, pork? — include mutton, chicken, turkey not needed), nuts, spices (turmeric, cumin, coriander seed, fennel, cardamom, ginger, dry ginger, black pepper, red chilli, mustard, hing, cinnamon, clove), sweeteners (jaggery, honey, sugar, dates), drinks (coconut water, tea, coffee, buttermilk).
- `why`: one friendly sentence, ≤ 140 chars. Ratings follow classical rasa/virya logic (sweet/bitter/astringent calm Pitta; sweet/sour/salty calm Vata; pungent/bitter/astringent calm Kapha; heating foods raise Pitta; heavy/oily raise Kapha; dry/light/raw raise Vata).

### DOSHAS (data-learn.js)
`{ V:{name:'Vata', element:'Air + Space', emoji-free symbol:'wind', qualities:[...], balanced:[...], imbalanced:[...], tastesFavour:['Sweet','Sour','Salty'], tastesReduce:[...], routine:[...]}, P:{...Fire + Water, 'flame'}, K:{...Earth + Water, 'leaf'} }`.

### VIRUDDHA (data-learn.js) — ≥ 20
```js
{ id:'fish-milk', pair:'Fish with milk', kind:'Samyoga (combination)', concern:'Classical texts say this pairing may disturb the blood and block the body\'s channels; traditionally linked with skin troubles.', source:'Charaka Samhita, Sutrasthana 26.82', verified:true, instead:'Keep milk and fish at separate meals, several hours apart.' }
```
Include: fish+milk; heated/cooked honey; honey+ghee in equal quantity; milk with sour fruit; milk after radish/garlic; banana with milk; banana with curd/buttermilk; curd at night; curd heated; curd with fish/meat; milk with salt; eating before previous meal is digested; cold water right after hot food/tea; honey in hot water; fruit with milk (milkshakes); leftover/re-heated food; eating when not hungry; very large meal at night; mixing raw and cooked (meal order); ghee kept in bronze vessel (classical). Mark verified:true only for Charaka Su.26 examples (fish-milk 26.82-83, honey heated, honey+ghee equal, milk+sour, radish/garlic then milk). Others verified:false with source 'Traditional Ayurvedic teaching' or best chapter reference.

### VIRUDDHA_TYPES (data-learn.js)
The 18 categories (Desha, Kala, Agni, Matra, Satmya, Dosha, Samskara, Virya, Koshtha, Avastha, Krama, Parihara, Upachara, Paka, Samyoga, Hridya, Sampad, Vidhi) — `{ name, meaning, example }`, source 'Charaka Samhita, Sutrasthana 26.86-101'.

### SOURCES (data-learn.js)
`[{ title:'Charaka Samhita', era:'c. 2nd c. BCE – 2nd c. CE (compiled)', about:'...', link:'https://www.carakasamhitaonline.com' }, Sushruta Samhita (niimh e-Samhita / archive.org Bhishagratna translation), Ashtanga Hridaya, Bhavaprakasha, Madhava Nidana ]`.

### QUIZ (data-quiz.js) — 15 questions
`{ q:'How would you describe your body frame?', a:[ {t:'Thin, light, hard to gain weight', d:'V'}, {t:'Medium, muscular', d:'P'}, {t:'Broad, solid, gain weight easily', d:'K'} ] }`
Traits (CCRAS-style, lifelong tendencies, not current symptoms): frame, weight tendency, skin, hair, appetite, digestion, thirst, sleep, weather preference, sweat, speech, activity/pace, memory, temperament under stress, decision-making. Plain words, no jargon. Question intro text: "Think about how you have been for most of your life, not just recently."

`scoreQuiz(answers)` → `{ counts:{V,P,K}, pct:{V,P,K}, type:'P'|'VP'|... }`:
- sort doshas by pct. If top − second ≥ 15 → single. Else if second − third ≥ 10 → dual (letters in order V,P,K e.g. 'VP', 'PK', 'VK'). Else 'VPK'.

### TYPES (data-quiz.js)
7 entries `{ name:'Pitta-Kapha', tagline:'Warm focus, steady strength', summary:'2-3 warm sentences', eatMore:[3], eatLess:[3], routine:[3] }`.

## App behaviour

### Onboarding (first open, `settings.onboarded` falsy)
Full-screen welcome card with village illustration → disclaimer + "I understand" → choice: "Find my dosha (2 min quiz)" / "I know my type" (7-type picker) / "Skip for now" (type = 'P' default is NOT assumed; show neutral all-dosha options: filter off). Then diet type (Veg / Egg / Non-veg) and goal (Gain / Lose / Maintain). Existing users (have `pd.days` data) get settings.type='P', goal 'gain' preset but still see the disclaimer once.

### Tabs (bottom nav, icons + labels, fixed): Today · Foods · Learn · Progress · Me
- **Today**: greeting by time of day + user's type badge; "One small thing" DAILY card; next-meal banner ("Lunch in 25 min"); meal slots (time, select of options, Eaten / Skipped / Ate something else — existing behaviour); gym-day toggle + post-workout slot; running-late shift; goal portion note on main meals; eat-out guide (collapsible) for current meal filtered by type; streak. A copper-vessel progress ring fills as main meals are eaten.
- **Foods**: search box (matches name + aka, case-insensitive, ignores spaces); category chips; filter "Good for me" (rating for user's letters ≥ 0 and at least one = 1); each food row shows name, category, three small V/P/K marks (favour ✓ / moderate ~ / reduce ✗ with text labels, not colour only) and `why` on tap-expand. Diet setting hides meat/fish for veg users (toggle "show all").
- **Learn**: sections as cards: "What is a dosha?" (DOSHAS, three columns/cards), "Your type" (TYPES[settings.type]), "Foods that fight each other — Viruddha Ahara" (VIRUDDHA list, each card: pair, concern, "Instead:", source line; tap for detail) and the 18 kinds (VIRUDDHA_TYPES, collapsible), "Ancient sources" (SOURCES), "Disclaimer".
- **Progress**: weekly weigh-in + trend chart (existing) with the goal's weekly band; streak; week summary (meals eaten %).
- **Me**: constitution card (pct bars V/P/K, retake quiz, choose manually); diet type; goal; meal times editor (time input per slot, stored `settings.times[slotId]`, used instead of slot.time); reminders: "Add meal reminders to my calendar" → downloads `vedic-diet-reminders.ics` (one VEVENT per non-optional slot, daily RRULE, VALARM TRIGGER -PT10M, SUMMARY 'Breakfast in 10 min', DESCRIPTION = current picked option; plus a daily 21:00 prep event "Prepare for tomorrow: soak dals / plan breakfast"); gym time; text size; theme (Auto/Light/Dark); grocery list link; backup: "Save my data" (downloads JSON of all `pd.*` keys) and "Restore" (file input, validates JSON object with pd.* keys, confirms in-page, not with confirm()); disclaimer; about.

### .ics format
CRLF line endings, `BEGIN:VCALENDAR`, `VERSION:2.0`, `PRODID:-//Vedic Lifestyle Diet//EN`, each VEVENT with UID, DTSTAMP (UTC), DTSTART;TZID not needed — use floating local time `DTSTART:YYYYMMDDTHHMMSS` (today), `DURATION:PT15M`, `RRULE:FREQ=DAILY`, VALARM `ACTION:DISPLAY`, `TRIGGER:-PT10M`. Escape commas/semicolons in text.

## Look & feel — "ancient and modern, village and nature"
- Palette tokens on `:root`: `--paper #F6F0E4` (rice-paper cream bg), `--card #FFFBF3`, `--ink #2A2420`, `--muted #6B5E52`, `--forest #234B3B`, `--neem #4F7A4A`, `--clay #B5573A`, `--turmeric #D9A441`, `--indigo #2B3A55`, `--line #E6DAC4`. Dark mode (prefers-color-scheme + manual): bg `#1B1F2A` night indigo, cards `#242A38`, ink `#F2EADB`, accents turmeric/clay lightened. Dosha accents: Vata `#6F8FAF` (sky), Pitta `#C8553D` (flame), Kapha `#4F7A4A` (leaf).
- Fonts: headings "Yatra One" (fallback Georgia, serif); body "Nunito Sans" (fallback system-ui). Loaded from Google Fonts with `display=swap`.
- Texture: very subtle paper grain via inline SVG noise background at low opacity; warli-style line border (inline SVG) as section dividers; never behind body text.
- Illustrations (`art.js`, `ART.village`, `ART.banyan`, `ART.pot`, `ART.lamp`, `ART.leaf`, `ART.flame`, `ART.wind`, `ART.lotus`): simple flat line-art SVG strings using `currentColor` + CSS vars, each < 3 KB. Hero illustration at top of Today (village: huts, banyan tree, fields, sun) and small ones elsewhere.
- Motion: 200–300 ms fades/slides; card entrance stagger; diya flicker (CSS) when a meal is marked eaten; quiz answer cards lift on tap; dosha result reveals with the element illustration (wind/flame/leaf) gently animating. All disabled under reduced motion.
- Tone of voice: warm elder, short sentences, second person, no guilt ("A missed meal is okay. Let's make the next one nourishing.").
- Layout: max-width 560px centered column on desktop with generous margins; bottom nav fixed with safe-area inset; cards with 16px radius, soft shadow; 16px side gutter on phones.

## Service worker & manifest
- `manifest.json`: name "Vedic Lifestyle Diet", short_name "Vedic Diet", theme_color #234B3B, background_color #F6F0E4, same icons, start_url "./", display standalone.
- `index.html`: `<title>Vedic Lifestyle Diet</title>`, `apple-mobile-web-app-title` "Vedic Diet", description meta.
- `sw.js`: VERSION 'vedic-diet-v2'; precache all app files; network-first for same-origin, fallback to cache; on activate delete only caches whose name starts with 'pitta-plate' or 'vedic-diet' and ≠ VERSION; Google Fonts: cache-first runtime cache.

## Amendments after Fable spec review (these override anything above)
1. **Type unset:** if `settings.type` is falsy, skip the constitution filter (step 2). Learn "Your type", eat-out and Foods "Good for me" then show a gentle "Find your dosha" prompt / the union of V,P,K lists / the filter disabled.
2. **EAT_OUT** items stay plain strings. For veg users hide items matching `/chicken|egg|fish|prawn|mutton|meat|keema|crab|kebab|biryani/i`; for egg users hide items matching the same regex minus `egg`. Meal labels come from `SLOTS`. Dual types merge both doshas' lists (dedupe).
3. **Where things render:** Learn gets a "Daily rules" card (`RULES.all` + `RULES[letter]` for each letter of the type, or all when unset). Me → "Grocery list" opens a full-screen panel with the existing grocery behaviour (built from picked options). Eat-out guide is a collapsible card on Today.
4. **Script order:** `data.js, data-foods.js, data-learn.js, data-quiz.js, art.js, views.js, app.js` (all `defer`). `app.js` is the ONLY file with top-level boot code; views.js only defines functions.
5. **Meal times:** `timeOf(slot) = (settings.times && settings.times[slot.id]) || slot.time`; used by `slotsFor`, next-meal banner and .ics. The meal-times editor and .ics exclude `gymOnly` and `optional` slots (postgym keeps its gym-time logic).
6. **Progress band:** `band(week) = firstWeight + GOALS[goal].weekly[0|1] × weeks`; status text by weekly rate: within band "On track", below lower bound "Slower than your goal", above upper "Faster than your goal". No hard-coded 0.25–0.5.
7. **DAILY:** `for` is always an array (`['all']` or letters). Pick `eligible[dayNumber % eligible.length]` (stable for the date).
8. **Migration on load (app.js):** replace `'Banana + warm milk'` with `'Dates + warm milk'` in `defaults` and every `days[k].pick`. Existing user = `Object.keys(days).length || weights.length` → preset `settings.type='P'`, `settings.goal='gain'`, diet unchanged. Use `settings.disclaimerAccepted` (separate from `settings.onboarded`) so quitting mid-quiz does not re-show the disclaimer.
9. **sw.js:** for fonts.googleapis.com / fonts.gstatic.com, cache responses even when opaque (`res.type === 'opaque'` allowed).
10. **.ics:** add `CALSCALE:GREGORIAN`, `METHOD:PUBLISH`; each VALARM contains `DESCRIPTION:Reminder`; escape `\\`, `;`, `,` and newlines as `\\n`; fold lines longer than 75 octets with CRLF + single space; UID `vedic-diet-<slotId>@vedic-diet.app`; blob type `text/calendar;charset=utf-8`. For .ics and JSON backup: when running as an installed iOS app (`navigator.standalone`), show a note "To download, open this page in Safari."
11. **Accessibility:** no text smaller than 0.85rem; `min-height:48px` on all buttons, selects, inputs, nav items; `--turmeric` never used for text; `--neem` only for fills/large bold text, text links use `--forest`. Text size via `html[data-text="normal|large|xl"]` → root font 17 / 19 / 21px; all sizes in rem.
12. **Safety text:** GOALS[*].gym ends with "Over 60, pregnant, or new to exercise? Start with walking and check with your doctor." GOALS.lose has `note:'Not suitable for under-18s or during pregnancy.'` Honey's FOODS `why` ends "Never for babies under 1 year."
13. **Today banner** for a skipped meal: "Skipped meals unsettle digestion for every type. Have a fruit or a few nuts now if you can." (no "raises pitta").
14. **Quiz UI:** one question per screen, radio-group semantics, "3 of 15" progress, Back button, answers kept in memory until the result is saved.
15. **DOSHAS** key is `symbol`. **Today ring** fills by main meals with `status==='done'` only.

## Code contract (shared by index.html, styles.css, art.js, views.js, app.js)
**index.html body:**
```html
<a class="skip" href="#view">Skip to content</a>
<header class="top"><div class="brand"><span class="brand-mark"><!-- ART.lotus --></span><h1>Vedic Lifestyle Diet</h1></div><button id="typeBadge" class="badge" hidden></button></header>
<main id="view" tabindex="-1" aria-live="polite"></main>
<nav class="tabs" aria-label="Main">
  <button data-tab="today" aria-current="page"><span class="ico"></span><span class="lbl">Today</span></button>
  ... foods "Foods", learn "Learn", progress "Progress", me "Me"
</nav>
<div id="overlay" class="overlay" hidden><div class="overlay-panel" role="dialog" aria-modal="true"></div></div>
<div id="toast" class="toast" role="status" aria-live="polite"></div>
```
Scripts (defer, this order): data.js, data-foods.js, data-learn.js, data-quiz.js, art.js, views.js, app.js. Register sw.js in app.js.

**art.js:** `const ART = { village, banyan, pot, lamp, leaf, flame, wind, lotus, kolam, sun, iconToday, iconFoods, iconLearn, iconProgress, iconMe };` each an inline `<svg>` string with `viewBox`, `aria-hidden="true"`, `fill="none"`/`stroke="currentColor"` line art plus fills using `var(--...)` tokens. No external images.

**Globals defined in app.js (usable by views.js at call time):** `$`, `esc`, `store`, `settings`, `days`, `weights`, `defaults`, `bought`, `save()`, `keyOf`, `todayKey`, `addDays`, `getDay`, `editDay`, `toMin`, `fmt`, `timeOf(slot)`, `typeLetters()` (array of letters of settings.type, [] if unset), `optionsFor(slot)`, `slotsFor(k)`, `pickedOption(k, slot)`, `streak()`, `render(tab)`, `currentTab`, `toast(msg)`, `openOverlay(html)` (fills .overlay-panel, shows overlay, traps focus, Esc closes), `closeOverlay()`, `applyPrefs()` (sets `html[data-text]` and `html[data-theme]`), `download(filename, mime, text)`.
app.js defines `renderToday(el)`, `renderProgress(el)`. views.js defines `renderFoods(el)`, `renderLearn(el)`, `renderMe(el)`, `startOnboarding()`, `startQuiz(onDone)`, `openGrocery()`, `buildIcs()`, `exportBackup()`, `importBackup(file)`. `render(tab)` calls the matching renderX($('#view')), updates `aria-current`, scrolls to top, and adds class `fade-in` to #view.
Settings shape: `{ diet, gymTime, type, goal, times:{}, textSize:'normal'|'large'|'xl', theme:'auto'|'light'|'dark', onboarded, disclaimerAccepted, quizPct }`.

**CSS class vocabulary (styles.css must style all; JS must only use these):** `.card`, `.card.hero`, `.card-title`, `.section-title`, `.kolam` (divider holding ART.kolam), `.muted`, `.small`, `.row` (flex, gap, wrap), `.stack` (vertical gap), `.grid3` (3 columns, collapses to 1 under 380px), `.btn`, `.btn.primary`, `.btn.ghost`, `.btn.danger`, `.btn-row`, `.chip`, `.chip.on`, `.chips` (horizontal scroll row), `.badge`, `.badge.V`, `.badge.P`, `.badge.K`, `.pill`, `.slot`, `.slot.done`, `.slot.skipped`, `.slot-head`, `.slot-time`, `.slot-actions`, `.banner`, `.banner.warn`, `.daily` (one-small-thing card), `.ring` (svg progress ring wrapper), `.diya` (flicker animation), `.search` (input), `.food`, `.food-head`, `.food-why`, `.marks`, `.mark.fav`, `.mark.mod`, `.mark.red`, `.viruddha`, `.source`, `.bars` + `.bar` + `.bar > span` (percentage bars, `.bar.V/.P/.K` colours), `.quiz`, `.quiz-q`, `.answer` (radio label card), `.answer.selected`, `.progressbar`, `.hero-art`, `.illus`, `.overlay`, `.overlay-panel`, `.toast`, `.toast.show`, `.fade-in`, `.stagger` (children animate in sequence), `.details` (native `<details>` styling), `.form-row`, `.field`, `.chart`, `.empty`.

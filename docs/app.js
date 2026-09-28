// Annamaya — Vedic Lifestyle Diet — all data stays on this device (localStorage).
// Plain browser JS, no modules. This file loads LAST and holds all boot code.
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } },
};

const DEFAULT_SETTINGS = {
  diet: 'nonveg', gymTime: '17:00', type: null, goal: 'maintain', times: {},
  textSize: 'normal', theme: 'auto', onboarded: false, disclaimerAccepted: false,
};
let settings = Object.assign({}, DEFAULT_SETTINGS, store.get('pd.settings', {}));
let days = store.get('pd.days', {});
let weights = store.get('pd.weights', []);
let defaults = store.get('pd.defaults', {});
let bought = store.get('pd.bought', {});
const save = () => {
  store.set('pd.settings', settings); store.set('pd.days', days);
  store.set('pd.weights', weights); store.set('pd.defaults', defaults); store.set('pd.bought', bought);
};

const keyOf = (d) => { const x = new Date(d); x.setMinutes(x.getMinutes() - x.getTimezoneOffset()); return x.toISOString().slice(0, 10); };
const todayKey = () => keyOf(new Date());
const addDays = (k, n) => { const d = new Date(k + 'T12:00:00'); d.setDate(d.getDate() + n); return keyOf(d); };
const blankDay = () => ({ status: {}, pick: {}, gym: false, shift: 0, cheats: {} });
const getDay = (k) => days[k] || blankDay();
const editDay = (k) => (days[k] = days[k] || blankDay());
const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const fmt = (min) => { const h = Math.floor(min / 60) % 24, m = min % 60; const ap = h >= 12 ? 'PM' : 'AM'; return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ap}`; };
const timeOf = (slot) => (settings.times && settings.times[slot.id]) || slot.time;

const typeLetters = () => (settings.type ? String(settings.type).split('') : []);

const RANK = { veg: 0, egg: 1, nonveg: 2 };
function optionsFor(slot) {
  // 1. Diet filter
  const max = slot.vegOnly ? 0 : RANK[settings.diet];
  const dietList = slot.options.filter((o) => RANK[o.type] <= max);
  // 2. Constitution filter (skipped entirely when type unset — Amendment 1)
  const L = typeLetters();
  if (!L.length) return dietList;
  const hits = dietList.filter((o) => o.suits && o.suits.some((s) => L.includes(s)));
  if (!hits.length) return dietList; // fall back to diet-filtered list
  hits.sort((a, b) => {
    const aAll = L.every((l) => a.suits.includes(l)) ? 1 : 0;
    const bAll = L.every((l) => b.suits.includes(l)) ? 1 : 0;
    return bAll - aAll; // stable in modern engines: preserves original order otherwise
  });
  return hits;
}

function slotsFor(k) {
  const d = getDay(k);
  return SLOTS.filter((s) => !s.gymOnly || d.gym)
    .map((s) => {
      const base = s.gymOnly ? toMin(settings.gymTime) + 60 : toMin(timeOf(s));
      return { ...s, min: base + (d.shift || 0), baseMin: base };
    })
    .sort((a, b) => a.min - b.min);
}
function pickedOption(k, slot) {
  const opts = optionsFor(slot);
  const name = getDay(k).pick[slot.id] || defaults[slot.id];
  return opts.find((o) => o.name === name) || opts[0];
}

// Streak: consecutive days with every main meal eaten (on plan or ate out, not skipped).
// Amendment 15: only status==='done' counts for the Today ring; streak keeps both.
function dayComplete(k) {
  const st = getDay(k).status;
  return SLOTS.filter((s) => s.main).every((s) => st[s.id] === 'done' || st[s.id] === 'cheat');
}
function streak() {
  let k = todayKey(), n = 0;
  if (!dayComplete(k)) k = addDays(k, -1);
  while (dayComplete(k) && n < 3650) { n++; k = addDays(k, -1); }
  return n;
}

// ---------- Migration (Amendment 8) ----------
(function migrate() {
  const plainObject = (o) => !!o && typeof o === 'object' && !Array.isArray(o);
  const validTime = (v) => typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
  // A1/A6: normalise shapes BEFORE any access to days/defaults/weights/bought.
  if (!plainObject(days)) days = {};
  if (!plainObject(defaults)) defaults = {};
  if (!plainObject(bought)) bought = {};
  if (!Array.isArray(weights)) weights = [];
  weights = weights.filter((w) => w && typeof w === 'object' && /^\d{4}-\d{2}-\d{2}$/.test(w.date) && Number.isFinite(w.kg) && w.kg > 20 && w.kg < 400);
  if (!plainObject(settings)) settings = {};
  const q = settings.quizPct;
  const okQ = q && typeof q === 'object' && !Array.isArray(q) &&
    ['V', 'P', 'K'].every((t) => Number.isFinite(q[t]) && q[t] >= 0 && q[t] <= 100);
  settings.quizPct = okQ ? q : null;
  if (!validTime(settings.gymTime)) settings.gymTime = '17:00';
  if (!plainObject(settings.times)) settings.times = {};
  Object.keys(settings.times).forEach((k) => { if (!validTime(settings.times[k])) delete settings.times[k]; });

  const swap = (obj) => { if (obj && obj.pick && obj.pick.wake === 'Banana + warm milk') obj.pick.wake = 'Dates + warm milk'; };
  // defaults and every day's pick
  Object.keys(defaults).forEach((id) => { if (defaults[id] === 'Banana + warm milk') defaults[id] = 'Dates + warm milk'; });
  Object.keys(days).forEach((k) => swap(days[k]));
  if (!Object.keys(days).length && !weights.length) { /* new user */ }
  else if (!settings.onboarded && !settings.type) {
    settings.type = 'P';
    if (!settings.goal || settings.goal === 'maintain') settings.goal = 'gain';
    settings.onboarded = true;
  }
  // Hardening: ensure shapes are valid before use
  if (!plainObject(days)) days = {};
  Object.keys(days).forEach((k) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) { delete days[k]; return; }
    const raw = plainObject(days[k]) ? days[k] : {};
    const day = Object.assign(blankDay(), raw);
    day.status = plainObject(day.status) ? day.status : {};
    Object.keys(day.status).forEach((s) => {
      if (!['done', 'skip', 'cheat'].includes(day.status[s])) delete day.status[s];
    });
    day.pick = plainObject(day.pick) ? day.pick : {};
    Object.keys(day.pick).forEach((s) => { if (typeof day.pick[s] !== 'string') delete day.pick[s]; });
    day.cheats = plainObject(day.cheats) ? day.cheats : {};
    Object.keys(day.cheats).forEach((s) => { if (typeof day.cheats[s] !== 'string') delete day.cheats[s]; });
    day.gym = typeof day.gym === 'boolean' ? day.gym : false;
    day.shift = (Number.isFinite(day.shift) && day.shift >= -120 && day.shift <= 240) ? day.shift : 0;
    days[k] = day;
  });
  Object.keys(defaults).forEach((id) => { if (typeof defaults[id] !== 'string') delete defaults[id]; });
  Object.keys(bought).forEach((id) => { if (typeof bought[id] !== 'boolean') delete bought[id]; });
  if (!(settings.diet in RANK)) settings.diet = 'nonveg';
  if (!GOALS[settings.goal]) settings.goal = 'maintain';
  if (settings.type && !TYPES[settings.type]) settings.type = null;
  if (!plainObject(settings.times)) settings.times = {};
})();

// ---------- Overlay / toast ----------
let lastFocus = null;
function openOverlay(html, opts) {
  const ov = $('#overlay'), panel = ov.querySelector('.overlay-panel');
  if (ov.hidden) lastFocus = document.activeElement;
  panel.innerHTML = html;
  ov.hidden = false;
  ov.onchange = null;
  // A5: locked overlays ignore Escape and backdrop clicks.
  delete ov.dataset.locked;
  if (opts && opts.locked) ov.dataset.locked = '1';
  const focusables = () => [...panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((x) => !x.disabled && x.offsetParent !== null);
  const first = focusables()[0];
  if (first) first.focus();
  ov.onkeydown = (e) => {
    if (e.key === 'Escape') { if (!ov.dataset.locked) closeOverlay(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables();
    if (!f.length) return;
    const firstEl = f[0], lastEl = f[f.length - 1];
    if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
    else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
  };
  ov.onclick = (e) => { if (e.target === ov && !ov.dataset.locked) closeOverlay(); };
}
function closeOverlay() {
  const ov = $('#overlay');
  ov.hidden = true;
  delete ov.dataset.locked;
  ov.querySelector('.overlay-panel').innerHTML = '';
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

// Copy to clipboard, with a fallback for older phones and non-https pages.
function copyText(text) {
  const done = () => toast('Copied. Paste it in "cooking instructions" when you order.');
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    ta.remove();
    if (ok) done(); else toast('Could not copy. Press and hold the note to copy it.');
  };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
  else fallback();
}

function applyPrefs() {
  const html = document.documentElement;
  html.dataset.text = settings.textSize || 'normal';
  const theme = settings.theme || 'auto';
  html.dataset.theme = theme === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
}

function download(filename, mime, text) {
  if (navigator.standalone) toast('To download, open this page in Safari.');
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// ---------- Today ----------
let viewKey = todayKey();
let followToday = true;
let cheatOpen = null;
let diyaSlot = null;

function dayNumber(k) { return Math.floor(Date.parse(k + 'T00:00:00') / 864e5); }
function dailyCard(k) {
  const L = typeLetters();
  const eligible = DAILY.filter((c) => !c.for || c.for.includes('all') || c.for.some((f) => L.includes(f)));
  const list = eligible.length ? eligible : DAILY;
  return list[dayNumber(k) % list.length];
}

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return { hi: 'Shubha Ratri', line: 'A quiet end to the day. Warm milk helps sleep.' };
  if (h < 12) return { hi: 'Shubhodayam', line: 'Good morning. A warm start steadies the whole day.' };
  if (h < 17) return { hi: 'Shubha Madhyahnam', line: 'Good afternoon. Keep lunch calm and unhurried.' };
  if (h < 21) return { hi: 'Shubha Sayankalam', line: 'Good evening. Let dinner be light and early.' };
  return { hi: 'Shubha Ratri', line: 'Good night. Rest well, digest well.' };
}

function ringSvg(done, total) {
  const r = 44, c = 2 * Math.PI * r, pct = total ? done / total : 0;
  return `<div class="ring" role="img" aria-label="${done} of ${total} main meals eaten">
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--line)" stroke-width="8"/>
      <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--clay)" stroke-width="8" stroke-linecap="round"
        stroke-dasharray="${(c * pct).toFixed(1)} ${c.toFixed(1)}" stroke-dashoffset="0" transform="rotate(-90 50 50)"/>
    </svg>
    <span class="illus">${ART.pot}</span>
  </div>`;
}

function renderToday(el) {
  const d = getDay(viewKey);
  const isToday = viewKey === todayKey();
  const dt = new Date(viewKey + 'T12:00:00');
  const g = greeting();
  const list = slotsFor(viewKey);
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  let nextIdx = -1;
  if (isToday) nextIdx = list.findIndex((s) => !d.status[s.id] && s.min + 45 >= nowMin);

  // Ring: main meals done only (Amendment 15)
  const mains = list.filter((s) => s.main);
  const doneMains = mains.filter((s) => d.status[s.id] === 'done').length;

  const typeBadgeText = settings.type && TYPES[settings.type] ? TYPES[settings.type].name : '';
  const card = dailyCard(viewKey);
  const dayNum = dayNumber(viewKey);
  const oddDay = dayNum % 2 === 1;
  const wisdomList = DAILY_VERSES.concat(typeof GUT_DAILY !== 'undefined' ? GUT_DAILY : []);
  const wisdom = wisdomList[dayNum % wisdomList.length];

  // Next-meal banner (Ate out / skipped handling below in renderTodayBanner)
  let bannerHtml = '';
  const lastCheat = [...list].reverse().find((s) => d.status[s.id] === 'cheat');
  const skipped = list.filter((s) => s.main && d.status[s.id] === 'skip');
  if (lastCheat) {
    const next = list.slice(list.indexOf(lastCheat) + 1).find((s) => !d.status[s.id]);
    bannerHtml = next
      ? `<div class="banner"><strong>No stress about the ${esc(lastCheat.label.toLowerCase())}.</strong> Keep ${esc(next.label.toLowerCase())} at ${fmt(next.min)} light: ${esc((optionsFor(next).find((o) => o.light) || optionsFor(next)[0] || {}).name || next.label)}. Have warm water, not a cold drink.</div>`
      : `<div class="banner"><strong>Ate out today, that's fine.</strong> Warm milk before bed and back on plan tomorrow.</div>`;
  } else if (skipped.length) {
    bannerHtml = `<div class="banner warn"><strong>${esc(skipped[0].label)} skipped.</strong> Skipped meals unsettle digestion for every type. Have a fruit or a few nuts now if you can.</div>`;
  } else if (nextIdx >= 0) {
    const nxt = list[nextIdx];
    const diff = nxt.min - nowMin;
    if (diff > 0 && diff <= 90) bannerHtml = `<div class="banner"><strong>${esc(nxt.label)} in ${diff} min.</strong> ${esc((pickedOption(viewKey, nxt) || {}).name || '')}</div>`;
  }

  // Eating out (Amendment 2)
  const mealKey = currentMealKey();
  const meal = SLOTS.find((s) => s.id === mealKey) || SLOTS[0];
  const outLists = (() => {
    const L = typeLetters();
    const keys = L.length ? L : ['V', 'P', 'K']; // union of all when unset
    const merge = (which) => {
      const seen = new Set(), out = [];
      keys.forEach((k) => (EAT_OUT[k] && EAT_OUT[k][mealKey] ? EAT_OUT[k][mealKey][which] : []).forEach((x) => {
        if (!seen.has(x)) { seen.add(x); out.push(x); }
      }));
      return out;
    };
    return { safe: merge('safe'), avoid: merge('avoid') };
  })();
  const hideRe = settings.diet === 'veg' ? /chicken|egg|fish|prawn|mutton|meat|keema|crab|kebab|biryani/i
    : settings.diet === 'egg' ? /chicken|fish|prawn|mutton|meat|keema|crab|kebab|biryani/i : null;
  if (hideRe) { outLists.safe = outLists.safe.filter((x) => !hideRe.test(x)); outLists.avoid = outLists.avoid.filter((x) => !hideRe.test(x)); }
  const orderItem = (x) => {
    const q = ORDER_SEARCH[x];
    if (!q) return `<li>${esc(x)}</li>`;
    return `<li class="order-item"><span>${esc(x)}</span><span class="order-links">
      <a class="order-btn" href="${esc(swiggyUrl(q))}" target="_blank" rel="noopener" aria-label="Find ${esc(q)} on Swiggy">Swiggy</a>
      <a class="order-btn" data-zomato="${esc(q)}" href="${esc(zomatoUrl(q))}" target="_blank" rel="noopener" aria-label="Find ${esc(q)} on Zomato">Zomato</a>
    </span></li>`;
  };
  const tipKeys = typeLetters().length ? typeLetters() : ['V', 'P', 'K'];
  const orderTips = [...new Set(tipKeys.flatMap((k) => typeLetters().length ? ORDER_TIPS[k] : ORDER_TIPS[k].slice(0, 1)))];
  const city = orderCity();
  const eatOut = `<details class="details">
    <summary>Eating out or ordering in? (${esc(meal.label)})</summary>
    <div class="stack">
      <div class="order-note">
        <p class="card-title">Note for the restaurant</p>
        <p class="small muted">Copy this, then paste it in the "cooking instructions" box on Swiggy or Zomato.</p>
        <p class="order-note-text" id="orderNote">${esc(ORDER_NOTES[settings.type] || ORDER_NOTES.VPK)}</p>
        <button class="btn primary" type="button" data-copy-note>Copy note</button>
      </div>
      <div><p class="card-title">Order this</p><ul class="order-list">${outLists.safe.map(orderItem).join('') || '<li class="muted">–</li>'}</ul></div>
      <div class="form-row field">
        <label for="citySel">Your city (for Zomato)</label>
        <select id="citySel">${ORDER_CITIES.map(([v, l]) => `<option value="${v}"${v === city ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>
      </div>
      <div><p class="card-title">When you order online</p><ul>${orderTips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <div><p class="card-title">Skip this</p><ul>${outLists.avoid.map((x) => `<li>${esc(x)}</li>`).join('') || '<li class="muted">–</li>'}</ul></div>
      <p class="small muted">Traditional guidance only. Choose what suits your body today. The Swiggy and Zomato buttons just open a search; Annamaya is not linked to either app.</p>
    </div>
  </details>`;

  const slotHtml = list.map((s, i) => {
    const st = d.status[s.id];
    const opt = pickedOption(viewKey, s) || { name: '—' };
    const opts = optionsFor(s);
    const fallbackKey = (s.id === 'wake' || s.id === 'bed' || s.id === 'postgym') ? 'fDrink' : 'fRice';
    const icoKey = (opt.ing && opt.ing[0] && iconFor(findFood(opt.ing[0]))) || fallbackKey;
    const ico = `<span class="fico" aria-hidden="true">${ficoHtml(icoKey)}</span>`;
    const pill = st === 'done' ? '<span class="pill">Eaten</span>'
      : st === 'skip' ? '<span class="pill">Skipped</span>'
      : st === 'cheat' ? '<span class="pill">Ate out</span>'
      : i === nextIdx ? '<span class="pill">Up next</span>' : '';
    const notes = [];
    if (s.main && GOALS[settings.goal] && GOALS[settings.goal].portion) notes.push(esc(GOALS[settings.goal].portion));
    if (s.note) notes.push(esc(s.note));
    if (d.gym && s.gymNote) notes.push(esc(s.gymNote));
    if (s.optional) notes.push('Optional.');
    if (st === 'cheat' && d.cheats[s.id]) notes.push('You had: ' + esc(d.cheats[s.id]));
    const cheatForm = cheatOpen === s.id ? `
      <form class="form-row" data-cheat="${s.id}">
        <input class="search" id="cheat-${s.id}" placeholder="What did you eat? e.g. fried rice" maxlength="80" aria-label="What did you eat?" required>
        <button class="btn primary" type="submit">Log</button>
      </form>` : '';
    const diya = diyaSlot === s.id ? `<span class="diya" aria-hidden="true">${ART.lamp}</span>` : '';
    return `<div class="slot${st ? (st === 'skip' ? ' skipped' : ' done') : ''}${i === nextIdx ? ' now' : ''}">
      <div class="slot-time">${fmt(s.min)}${d.shift ? `<small>was ${fmt(s.baseMin)}</small>` : ''}</div>
      <div class="slot-head">${ico}<span class="card-title">${esc(s.label)}</span>${pill}${diya}</div>
      ${opts.length > 1
        ? `<select data-pick="${s.id}" aria-label="${esc(s.label)} choice">${opts.map((o) => `<option value="${esc(o.name)}"${o.name === opt.name ? ' selected' : ''}>${esc(o.name)}</option>`).join('')}</select>`
        : `<div>${esc(opt.name)}</div>`}
      ${opt && opt.note ? `<p class="small muted">${opt.note}</p>` : ''}
      ${recipesFor(opt.name).length ? `<button class="btn ghost recipe-btn" type="button" data-recipe="${s.id}">How to cook${recipesFor(opt.name).length > 1 ? ` (${recipesFor(opt.name).length} recipes)` : ''}</button>` : ''}
      ${notes.length ? `<p class="small muted">${notes.join(' ')}</p>` : ''}
      <div class="slot-actions btn-row">
        <button class="btn${st === 'done' ? ' primary' : ''}" data-mark="done" data-slot="${s.id}">Eaten</button>
        <button class="btn${st === 'skip' ? ' danger' : ''}" data-mark="skip" data-slot="${s.id}">Skipped</button>
        <button class="btn${st === 'cheat' ? ' ghost' : ''}" data-mark="cheat" data-slot="${s.id}">Ate something else</button>
      </div>
      ${cheatForm}
    </div>`;
  }).join('');

  const prevNext = `<div class="btn-row">
    <button class="btn ghost" data-day="-1">← Previous day</button>
    ${isToday ? '' : '<button class="btn ghost" data-day="1">Next day →</button>'}
    ${isToday ? '' : '<button class="btn" data-day="0">Back to today</button>'}
  </div>`;

  el.innerHTML = `
  <div class="card hero">
    <div class="hero-art">${ART.village}</div>
    <div class="row">
      <div class="stack">
        <p class="card-title">${esc(g.hi)}</p>
        <p class="muted">${esc(g.line)}</p>
        <p class="verse-strip">${esc(HERO_VERSE.en)} <span class="small muted">— ${esc(HERO_VERSE.ref)}</span></p>
        ${typeof chewingShortHtml === 'function' ? chewingShortHtml() : ''}
        <p class="small muted">${isToday ? 'Today · ' : ''}${dt.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
      </div>
      ${ringSvg(doneMains, mains.length)}
    </div>
    <p class="small muted">${doneMains} of ${mains.length} main meals eaten today · streak ${streak()} day${streak() === 1 ? '' : 's'}</p>
    ${prevNext}
  </div>

  <div class="card daily">
    ${oddDay
      ? `<p class="card-title">Wisdom for today</p><p>${esc(wisdom.text)} <span class="small muted">— ${esc(wisdom.ref)}</span></p>`
      : `<p class="card-title">One small thing today</p><p>${esc(card.text)}</p>`}
  </div>

  ${bannerHtml}

  <p class="section-title">Your day</p>
  <div class="stack stagger">${slotHtml}</div>

  <div class="card stack">
    <label class="row" for="gymToggle"><input type="checkbox" id="gymToggle"${d.gym ? ' checked' : ''}> <span>Gym day today</span></label>
    <div class="form-row field">
      <label for="shiftSel">Running late?</label>
      <select id="shiftSel">
        <option value="0"${!d.shift ? ' selected' : ''}>On time</option>
        <option value="30"${d.shift === 30 ? ' selected' : ''}>30 min late</option>
        <option value="60"${d.shift === 60 ? ' selected' : ''}>1 hr late</option>
        <option value="90"${d.shift === 90 ? ' selected' : ''}>1.5 hr late</option>
      </select>
    </div>
  </div>

  <div class="card stack">${eatOut}</div>

  ${typeBadgeText ? '' : `<p class="small muted" style="text-align:center">Tip: choose your dosha at the top right, or take the quiz, to tune these meals.</p>`}
  `;
}

// Search links for ordering apps. These only open a search; nothing is sent from the app.
const swiggyUrl = (q) => 'https://www.swiggy.com/search?query=' + encodeURIComponent(q);
const orderCity = () => (ORDER_CITIES.some(([v]) => v === settings.city) ? settings.city : 'hyderabad');
const zomatoUrl = (q) => 'https://www.zomato.com/' + orderCity() + '/delivery/dish-'
  + String(q).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function currentMealKey() {
  const m = new Date().getHours() * 60 + new Date().getMinutes();
  if (m < 10 * 60 + 30) return 'breakfast';
  if (m < 15 * 60 + 30) return 'lunch';
  if (m < 18 * 60 + 30) return 'snack';
  return 'dinner';
}

function mark(slotId, status) {
  const d = editDay(viewKey);
  if (status === 'cheat') {
    if (d.status[slotId] === 'cheat') { delete d.status[slotId]; delete d.cheats[slotId]; cheatOpen = null; }
    else { cheatOpen = slotId; render('today'); setTimeout(() => $('#cheat-' + slotId)?.focus(), 60); return; }
  } else {
    d.status[slotId] = d.status[slotId] === status ? undefined : status;
    if (!d.status[slotId]) delete d.status[slotId];
    delete d.cheats[slotId];
    cheatOpen = null;
    if (status === 'done') {
      diyaSlot = slotId;
      setTimeout(() => { if (diyaSlot === slotId) { diyaSlot = null; } }, 2200);
    }
  }
  save(); render('today');
  // Keep keyboard focus on the equivalent button in the same slot after re-render.
  const btn = document.querySelector(`[data-mark="${status}"][data-slot="${slotId}"]`);
  if (btn) btn.focus();
}

// ---------- Progress ----------
function bandAt(weeks, w0) {
  const g = GOALS[settings.goal] || GOALS.maintain;
  return [w0 + g.weekly[0] * weeks, w0 + g.weekly[1] * weeks];
}
function rateStatus(rate) {
  const g = GOALS[settings.goal] || GOALS.maintain;
  const lo = Math.min(g.weekly[0], g.weekly[1]), hi = Math.max(g.weekly[0], g.weekly[1]);
  const dir = g.dir || settings.goal; // 'gain' | 'lose' | 'maintain'
  if (rate >= lo && rate <= hi) return 'On track';
  if (rate < lo) {
    if (dir === 'gain') return 'Slower than your goal';
    if (dir === 'lose') return 'Faster than your goal';
    return 'Losing more than planned';
  }
  if (dir === 'gain') return 'Faster than your goal';
  if (dir === 'lose') return 'Slower than your goal';
  return 'Gaining more than planned';
}
function chartSvg(w) {
  const W = 340, H = 180, L = 12, R = 12, T = 14, B = 26;
  const t0 = Date.parse(w[0].date), t1 = Math.max(Date.parse(w[w.length - 1].date), t0 + 864e5);
  const weeks = (t1 - t0) / 6048e5;
  const [bLo, bHi] = bandAt(weeks, w[0].kg);
  const ks = w.map((x) => x.kg);
  const lo = Math.floor(Math.min(...ks, bLo) - 0.5), hi = Math.ceil(Math.max(...ks, bHi) + 0.5);
  const x = (t) => L + ((t - t0) / (t1 - t0)) * (W - L - R);
  const y = (v) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const pts = w.map((p) => `${x(Date.parse(p.date)).toFixed(1)},${y(p.kg).toFixed(1)}`);
  const band = `${x(t0)},${y(w[0].kg)} ${x(t1)},${y(bHi)} ${x(t1)},${y(bLo)}`;
  const ticks = [lo, (lo + hi) / 2, hi];
  const end = w[w.length - 1];
  const fmtD = (t) => new Date(t).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const g = GOALS[settings.goal] || GOALS.maintain;
  const bandLoW = Math.min(g.weekly[0], g.weekly[1]), bandHiW = Math.max(g.weekly[0], g.weekly[1]);
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Weight trend">
    ${ticks.map((v) => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/>`).join('')}
    <polygon points="${band}" fill="var(--turmeric)" opacity="0.25" stroke="none"/>
    <polyline points="${pts.join(' ')}" fill="none" stroke="var(--clay)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${x(Date.parse(end.date))}" cy="${y(end.kg)}" r="4.5" fill="var(--clay)"/>
  </svg>
  <div class="row small muted" style="justify-content:space-between"><span>${esc(fmtD(t0))}</span><span>${lo.toFixed(1)}–${hi.toFixed(1)} kg</span><span>${esc(fmtD(t1))}</span></div>
  <p class="small muted">Shaded area is your goal band (${bandLoW} to ${bandHiW} kg a week for "${esc(g.label.toLowerCase())}").</p></div>`;
}
function weekSummary() {
  let eaten = 0, total = 0;
  for (let n = 0; n < 7; n++) {
    const k = addDays(todayKey(), -n);
    const st = getDay(k).status;
    SLOTS.filter((s) => s.main).forEach((s) => {
      total++;
      if (st[s.id] === 'done' || st[s.id] === 'cheat') eaten++;
    });
  }
  return { eaten, total, pct: total ? Math.round((eaten / total) * 100) : 0 };
}

function renderProgress(el) {
  const w = [...weights].sort((a, b) => (a.date < b.date ? -1 : 1));
  const ws = weekSummary();
  const sk = streak();
  let body = '';

  const form = `<form id="wForm" class="card stack">
    <p class="card-title">Weekly weigh-in</p>
    <div class="form-row field">
      <label for="wDate">Date</label>
      <input type="date" id="wDate" value="${todayKey()}" required>
    </div>
    <div class="form-row field">
      <label for="wKg">Weight (kg)</label>
      <input type="number" id="wKg" min="30" max="150" step="0.1" inputmode="decimal" required>
    </div>
    <p class="small muted" id="wErr" hidden style="color:var(--clay)"></p>
    <button class="btn primary" type="submit">Save weigh-in</button>
  </form>`;

  if (!w.length) {
    body = `${form}
    <div class="card empty">
      <p class="card-title">No weigh-ins yet</p>
      <p class="muted">Step on the scale once a week — same time, same clothes. Small notes, big picture.</p>
    </div>`;
  } else {
    const first = w[0], last = w[w.length - 1];
    const weeks = (Date.parse(last.date) - Date.parse(first.date)) / 6048e5;
    const change = last.kg - first.kg;
    const rate = weeks >= 1 ? change / weeks : null;
    const status = rate === null ? 'Need 1+ week of data' : rateStatus(rate);
    const listHtml = [...w].reverse().map((x) => `<li class="row" style="justify-content:space-between"><span>${esc(new Date(x.date + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }))}</span><span><b>${x.kg.toFixed(1)} kg</b> <button class="btn ghost" data-del="${esc(x.date)}" aria-label="Delete entry for ${esc(x.date)}">Delete</button></span></li>`).join('');
    body = `${form}
    <div class="card stack">
      <p class="card-title">Trend</p>
      ${w.length < 2 ? '<p class="muted">Add one more weigh-in to see the trend line.</p>' : chartSvg(w)}
      <div class="row">
        <div class="stack"><span class="small muted">Latest</span><b>${last.kg.toFixed(1)} kg</b></div>
        <div class="stack"><span class="small muted">Change</span><b>${change >= 0 ? '+' : ''}${change.toFixed(1)} kg</b></div>
        <div class="stack"><span class="small muted">Per week</span><b>${rate === null ? '–' : (rate >= 0 ? '+' : '') + rate.toFixed(2)}</b></div>
        <div class="stack"><span class="small muted">Status</span><b>${esc(status)}</b></div>
      </div>
      <ul class="stack small">${listHtml}</ul>
    </div>`;
  }

  el.innerHTML = `
  <div class="card hero">
    <div class="hero-art">${ART.banyan}</div>
    <div class="row">
      <div class="stack">
        <p class="card-title">Your progress</p>
        <p class="muted">Steady steps, steady strength.</p>
      </div>
      <span class="pill">${sk} day${sk === 1 ? '' : 's'} streak</span>
    </div>
  </div>
  ${body}
  <div class="card stack">
    <p class="card-title">This week</p>
    <p><b>${ws.pct}%</b> of main meals eaten over the last 7 days (${ws.eaten} of ${ws.total}).</p>
    ${GOALS[settings.goal] && GOALS[settings.goal].note ? `<p class="small muted">${esc(GOALS[settings.goal].note)}</p>` : ''}
  </div>`;

  const formEl = $('#wForm');
  if (formEl) formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = $('#wDate').value, kg = parseFloat($('#wKg').value);
    const err = $('#wErr');
    if (!date || !(kg >= 30 && kg <= 150)) { err.textContent = 'Enter a date and a weight between 30 and 150 kg.'; err.hidden = false; return; }
    err.hidden = true;
    weights = weights.filter((x) => x.date !== date).concat({ date, kg: Math.round(kg * 10) / 10 });
    save(); renderProgress($('#view'));
  });
  el.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', () => {
    weights = weights.filter((x) => x.date !== b.dataset.del);
    save(); renderProgress($('#view'));
  }));
}

// ---------- Header dosha dropdown ----------
function syncTypeSelect() {
  const select = $('#typeSelect');
  if (!select) return;
  const order = ['V', 'P', 'K', 'VP', 'PK', 'VK', 'VPK'];
  select.innerHTML = '<option value="">Choose dosha</option>' +
    order.filter((k) => TYPES[k]).map((k) => `<option value="${esc(k)}">${esc(TYPES[k].name)}</option>`).join('');
  select.value = settings.type || '';
  select.dataset.type = settings.type || '';
}

// ---------- Router ----------
let currentTab = 'today';
const RENDERERS = {
  today: renderToday,
  foods: (el) => renderFoods(el),
  learn: (el) => renderLearn(el),
  progress: renderProgress,
  me: (el) => renderMe(el),
};
function render(tab) {
  const sameTab = (tab === currentTab);
  const y = window.scrollY;
  currentTab = tab;
  const el = $('#view');
  (RENDERERS[tab] || renderToday)(el);
  document.querySelectorAll('.tabs button').forEach((b) => {
    if (b.dataset.tab === tab) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  if (!sameTab) {
    el.classList.remove('fade-in');
    void el.offsetWidth;
    el.classList.add('fade-in');
    window.scrollTo(0, 0);
    const tt = $('#toTop');
    if (tt) tt.hidden = true;
  } else {
    // Same-tab update: restore scroll position, don't move focus.
    requestAnimationFrame(() => window.scrollTo(0, y));
  }
  syncTypeSelect();
}

// ---------- Global event wiring (delegated on #view) ----------
const view = $('#view');
view.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-mark]');
  if (btn) { mark(btn.dataset.slot, btn.dataset.mark); return; }
  const day = e.target.closest('[data-day]');
  if (day) {
    const off = Number(day.dataset.day) || 0;
    if (off === 0) { viewKey = todayKey(); followToday = true; }
    else { viewKey = addDays(viewKey, off); followToday = false; }
    cheatOpen = null;
    render('today');
    return;
  }
  const rb = e.target.closest('[data-recipe]');
  if (rb) {
    const slot = SLOTS.find((x) => x.id === rb.dataset.recipe);
    const o = slot && pickedOption(viewKey, slot);
    if (o) openRecipes(recipesFor(o.name));
    return;
  }
  if (e.target.closest('[data-copy-note]')) { copyText($('#orderNote').textContent); return; }
  const chew = e.target.closest('[data-chew-more]');
  if (chew) {
    openOverlay('<div class="card stack">' + chewingFullHtml() + '<button class="btn primary" data-chew-close>Close</button></div>');
    const panel = $('#overlay .overlay-panel');
    panel.onclick = (ev) => { if (ev.target.closest('[data-chew-close]')) closeOverlay(); };
    return;
  }
});
view.addEventListener('change', (e) => {
  const sel = e.target.closest('[data-pick]');
  if (sel) {
    editDay(viewKey).pick[sel.dataset.pick] = sel.value;
    defaults[sel.dataset.pick] = sel.value;
    save(); render('today'); return;
  }
  if (e.target.id === 'gymToggle') { editDay(viewKey).gym = e.target.checked; save(); render('today'); return; }
  if (e.target.id === 'shiftSel') { editDay(viewKey).shift = Number(e.target.value); save(); render('today'); return; }
  if (e.target.id === 'citySel') {
    // Update links in place so the open "Eating out" panel stays open.
    settings.city = e.target.value; save();
    view.querySelectorAll('[data-zomato]').forEach((a) => { a.href = zomatoUrl(a.dataset.zomato); });
    return;
  }
});
view.addEventListener('submit', (e) => {
  const f = e.target.closest('[data-cheat]');
  if (!f) return;
  e.preventDefault();
  const id = f.dataset.cheat;
  const txt = $('#cheat-' + id).value.trim();
  if (!txt) return;
  const d = editDay(viewKey);
  d.status[id] = 'cheat'; d.cheats[id] = txt; cheatOpen = null;
  save(); render('today');
});

// ---------- Nav ----------
const iconMap = { today: 'iconToday', foods: 'iconFoods', learn: 'iconLearn', progress: 'iconProgress', me: 'iconMe' };
document.querySelectorAll('.tabs button').forEach((b) => {
  const ico = b.querySelector('.ico');
  if (ico && ART[iconMap[b.dataset.tab]]) ico.innerHTML = ART[iconMap[b.dataset.tab]];
  b.addEventListener('click', () => render(b.dataset.tab));
});
$('#typeSelect').addEventListener('change', (e) => {
  const select = e.target;
  settings.type = select.value || null;
  settings.quizPct = null;
  save();
  toast(settings.type ? 'Showing foods and meals for ' + TYPES[settings.type].name : 'Showing all doshas');
  render(currentTab);
});

// ---------- Boot ----------
applyPrefs();
save(); // persist migration result
const brandMark = document.querySelector('.brand-mark');
if (brandMark) brandMark.innerHTML = ART.grainLotusMark || ART.lotus;
const brand = document.querySelector('.brand');
if (brand) {
  brand.setAttribute('role', 'button');
  brand.setAttribute('tabindex', '0');
  brand.setAttribute('aria-label', 'Annamaya — show the starting page');
  brand.style.cursor = 'pointer';
  brand.addEventListener('click', () => showWelcome());
  brand.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showWelcome(); }
  });
}
syncTypeSelect();
render('today');
if (!settings.disclaimerAccepted || !settings.onboarded) {
  startOnboarding();
} else {
  showWelcome();
}
// Scroll-to-top button
const toTop = document.createElement('button');
toTop.id = 'toTop';
toTop.className = 'to-top';
toTop.type = 'button';
toTop.setAttribute('aria-label', 'Back to top');
toTop.hidden = true;
toTop.textContent = '↑';
document.body.appendChild(toTop);
let toTopTick = false;
window.addEventListener('scroll', () => {
  if (toTopTick) return;
  toTopTick = true;
  requestAnimationFrame(() => {
    toTopTick = false;
    toTop.hidden = window.scrollY < 500;
  });
}, { passive: true });
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  const b = document.querySelector('.brand');
  if (b) b.focus({ preventScroll: true });
});
// Refresh Today every minute — only when Today is visible, no overlay open,
// and the user isn't typing in a textarea/input or using a select.
setInterval(() => {
  if (document.hidden) return;
  if (followToday && viewKey !== todayKey()) viewKey = todayKey();
  if (currentTab !== 'today' || viewKey !== todayKey()) return;
  if (!$('#overlay').hidden) return;
  const a = document.activeElement;
  if (a && (a.tagName === 'TEXTAREA' || a.tagName === 'SELECT' || (a.tagName === 'INPUT' && a.type !== 'checkbox' && a.type !== 'radio'))) return;
  if (cheatOpen) return;
  const y = window.scrollY;
  renderToday($('#view'));
  requestAnimationFrame(() => window.scrollTo(0, y));
}, 60000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !cheatOpen && currentTab === 'today' && $('#overlay').hidden) {
    if (followToday && viewKey !== todayKey()) viewKey = todayKey();
    const y = window.scrollY;
    renderToday($('#view'));
    requestAnimationFrame(() => window.scrollTo(0, y));
  }
});

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}


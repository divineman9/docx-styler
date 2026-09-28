/* views.js — Foods, Learn, Me, onboarding, quiz, grocery, .ics, backup.
Function definitions only; runs before app.js (no top-level code). */

'use strict';

// ---------- shared helpers (local to views.js) ----------

function _art(name) { return (typeof ART !== 'undefined' && ART[name]) || ''; }

function _el(html) {
const t = document.createElement('template');
t.innerHTML = html.trim();
return t.content.firstElementChild;
}

function _bars(pct) {
return '<div class="bars">' + ['V', 'P', 'K'].map((L) => {
const name = { V: 'Vata', P: 'Pitta', K: 'Kapha' }[L];
const p = Math.max(0, Math.min(100, Math.round(Number((pct && pct[L]) || 0) || 0)));
return `<div class="bar ${L}"><i>${name}</i><span><em style="width:${p}%"></em></span><b>${p}%</b></div>`;
}).join('') + '</div>';
}

function _mark(v, dosha) {
if (v === 1) return `<span class="mark fav"><b>${dosha}</b> ✓ Favour</span>`;
if (v === 0) return `<span class="mark mod"><b>${dosha}</b> ~ Moderate</span>`;
return `<span class="mark red"><b>${dosha}</b> ✗ Reduce</span>`;
}

function _settingsChips(list, current, onPick) {
return list.map((x) => `<button class="chip${x.v === current ? ' on' : ''}" aria-pressed="${x.v === current ? 'true' : 'false'}" data-set="${x.v}">${esc(x.t)}</button>`).join('');
}

// ---------- All references ----------

function referencesHtml() {
let h = '';
let groupIndex = 0;
const openAttr = () => (groupIndex++ === 0 ? ' open' : '');

// 1. Classical texts
h += `<details class="details"${openAttr()}><summary>Classical texts</summary>`;
if (typeof SOURCES !== 'undefined') {
h += '<div class="stack">';
SOURCES.forEach((s) => {
h += `<div class="card stack">
<h3 class="card-title">${esc(s.title)}</h3>
<p class="small muted">${esc(s.era)}</p>
<p class="small">${esc(s.about)}</p>
${s.link ? `<a class="btn ghost" href="${esc(s.link)}" target="_blank" rel="noopener">Read online</a>` : ''}
</div>`;
});
h += '</div>';
}
h += '</details>';

// 2. Verses quoted in the app
h += `<details class="details"${openAttr()}><summary>Verses quoted in the app</summary>`;
const refs = new Set();
if (typeof VERSES !== 'undefined') VERSES.forEach((v) => { if (v.ref) refs.add(v.ref); });
if (typeof AGNI !== 'undefined' && AGNI.verses) AGNI.verses.forEach((v) => { if (v.ref) refs.add(v.ref); });
if (typeof GUT !== 'undefined' && GUT.ayurveda) GUT.ayurveda.forEach((v) => { if (v.ref) refs.add(v.ref); });
if (typeof HERO_VERSE !== 'undefined' && HERO_VERSE.ref) refs.add(HERO_VERSE.ref);
if (typeof CHEWING !== 'undefined' && CHEWING.classical) CHEWING.classical.forEach((v) => { if (v.ref) refs.add(v.ref); });
h += '<ul class="small">' + Array.from(refs).sort().map((r) => `<li>${esc(r)}</li>`).join('') + '</ul>';
h += '</details>';

// 3. Charaka, Sushruta & Ashtanga Hridaya citations
h += `<details class="details"${openAttr()}><summary>Charaka, Sushruta &amp; Ashtanga Hridaya citations</summary>`;
const cites = new Set();
if (typeof VIRUDDHA !== 'undefined') VIRUDDHA.forEach((v) => { if (v.source) cites.add(v.source); });
if (typeof NONVEG !== 'undefined') {
['ayurveda', 'upanishad', 'principle', 'vegetarian'].forEach((sec) => {
if (NONVEG[sec]) NONVEG[sec].forEach((p) => { if (p.ref) cites.add(p.ref); });
});
}
if (typeof AGNI !== 'undefined' && AGNI.ayurveda) AGNI.ayurveda.forEach((a) => { if (a.ref) cites.add(a.ref); });
if (typeof DOSHA_GUIDE !== 'undefined') {
DOSHA_GUIDE.forEach((d) => {
['qualities', 'seats', 'whenItRises', 'tastes'].forEach((k) => {
if (d[k] && d[k].ref) cites.add(d[k].ref);
});
});
}
if (typeof VIRUDDHA_TYPES_SOURCE !== 'undefined') cites.add(VIRUDDHA_TYPES_SOURCE);
h += '<ul class="small">' + Array.from(cites).sort().map((r) => `<li>${esc(r)}</li>`).join('') + '</ul>';
h += '</details>';

// 4. Modern research & health sources
h += `<details class="details"${openAttr()}><summary>Modern research &amp; health sources</summary>`;
const seenUrls = new Set();
h += '<ul class="small">';
function _modernRef(src) {
if (!src) return;
const idx = src.indexOf(' — http');
if (idx === -1) {
h += `<li>${esc(src)}</li>`;
return;
}
const name = src.slice(0, idx);
const url = src.slice(idx + 3);
if (seenUrls.has(url)) return;
seenUrls.add(url);
h += `<li>${esc(name)} — <a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a></li>`;
}
if (typeof GUT !== 'undefined') {
(GUT.modern || []).forEach((m) => _modernRef(m.source));
if (GUT.order && GUT.order.modern) _modernRef(GUT.order.modern.source);
}
if (typeof MYTHS !== 'undefined') MYTHS.forEach((m) => _modernRef(m.source));
if (typeof CHEWING !== 'undefined' && CHEWING.modern) CHEWING.modern.forEach((m) => _modernRef(m.source));
h += '</ul>';
h += '</details>';

// 5. Wisdom from Japan
h += `<details class="details"${openAttr()}><summary>Wisdom from Japan</summary>`;
if (typeof JAPAN !== 'undefined' && JAPAN.sources) {
h += '<ul class="small">' + JAPAN.sources.map((s) =>
`<li>${esc(s.title)}${s.link ? ` — <a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a>` : ''}</li>`
).join('') + '</ul>';
}
h += '</details>';

h += `<p class="small muted">Verse numbers follow the editions linked above and may differ by a verse in other editions.</p>`;
return h;
}

function openReferences() {
openOverlay(`<div class="card stack">` +
'<h2 class="card-title">All references</h2>' +
referencesHtml() +
'<button class="btn primary" data-ref-close>Close</button></div>');
const panel = document.querySelector('.overlay-panel');
if (panel) {
panel.onclick = (e) => {
if (e.target.closest('[data-ref-close]')) closeOverlay();
};
}
}

// ---------- dosha introduction (from data-learn.js) ----------

function doshaIntroHtml() {
const arts = { V: 'wind', P: 'flame', K: 'leaf' };
let h = '';
h += `<h2 class="card-title">${esc(DOSHA_INTRO.title)}</h2>`;
h += `<p>${esc(DOSHA_INTRO.intro)}</p>`;
h += '<div class="grid3">';
DOSHA_INTRO.doshas.forEach((d) => {
h += `<div class="card stack">
<span class="illus">${_art(arts[d.key])}</span>
<span class="badge ${esc(d.key)}">${esc(d.name)}</span>
<p class="small muted">${esc(d.element)}</p>
<p>${esc(d.role)}</p>
<p class="small"><strong>Balanced:</strong> ${esc(d.balanced)}</p>
<p class="small"><strong>Too much:</strong> ${esc(d.excess)}</p>
</div>`;
});
h += '</div>';
h += `<p>${esc(DOSHA_INTRO.outro)}</p>`;
return h;
}

// ---------- Know your doshas (from data-learn.js) ----------

function _refLine(ref, verified) {
return `<p class="source small muted">Source: ${esc(ref)}${verified ? '' : ' (traditional teaching)'}</p>`;
}

function _ul(items) {
return `<ul class="small">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
}

function doshaGuideHtml() {
let h = '';
h += '<h2 class="card-title">Know your doshas</h2>';
DOSHA_GUIDE.forEach((d) => {
h += `<details class="details">
<summary>
<span class="illus">${_art(d.symbol)}</span>
<span class="badge ${esc(d.key)}">${esc(d.name)}</span>
<span lang="sa">${esc(d.sanskrit)}</span>
<span class="small muted">${esc(d.oneLine)}</span>
</summary>
<h3>Its nature</h3>
${_ul(d.qualities.list)}
${_refLine(d.qualities.ref, d.qualities.verified)}
<h3>Where it lives</h3>
<p class="small">${esc(d.seats.text)}</p>
${_refLine(d.seats.ref, d.seats.verified)}
<h3>What it does</h3>
${_ul(d.jobs)}
<h3>When balanced</h3>
${_ul(d.balanced)}
<h3>When too high</h3>
${_ul(d.tooMuch)}
<h3>What increases it</h3>
${_ul(d.causes)}
<h3>When it rises</h3>
<p class="small">${esc(d.whenItRises.season)}</p>
<p class="small">${esc(d.whenItRises.timeOfDay)}</p>
<p class="small">${esc(d.whenItRises.lifeStage)}</p>
${_refLine(d.whenItRises.ref, d.whenItRises.verified)}
<h3>How to balance it</h3>
<h4 class="small">Food</h4>
${_ul(d.balance.food)}
<h4 class="small">Routine</h4>
${_ul(d.balance.routine)}
<h4 class="small">Exercise</h4>
${_ul(d.balance.exercise)}
<h4 class="small">Mind</h4>
${_ul(d.balance.mind)}
<h3>Tastes</h3>
<p class="small"><strong>Favour:</strong> ${d.tastes.favour.map(esc).join(', ')}</p>
<p class="small"><strong>Reduce:</strong> ${d.tastes.reduce.map(esc).join(', ')}</p>
${_refLine(d.tastes.ref, d.tastes.verified)}
<p class="small"><em>${esc(d.tip)}</em></p>
</details>`;
});
h += `<p class="small muted">${esc(DOSHA_GUIDE_NOTE)}</p>`;
return h;
}

// ---------- Chewing (from data-wisdom.js) ----------

function chewingShortHtml() {
if (typeof CHEWING === 'undefined') return '';
let h = `<div class="card stack chew-card"><h3 class="card-title">${esc(CHEWING.title)}</h3>`;
const first = CHEWING.classical && CHEWING.classical[0];
if (first) {
h += `<p>${esc(first.en)}</p>`;
h += `<p class="verse-ref">— ${esc(first.ref)}</p>`;
}
h += '<ul class="small">' + (CHEWING.tips || []).slice(0, 2).map((t) => `<li>${esc(t)}</li>`).join('') + '</ul>';
h += '<button class="btn ghost" data-chew-more>Read more</button></div>';
return h;
}

function chewingFullHtml() {
if (typeof CHEWING === 'undefined') return '';
let h = `<h2 class="card-title">${esc(CHEWING.title)}</h2>`;
h += `<p>${esc(CHEWING.intro)}</p>`;
h += '<h3 class="card-title">What the classics say</h3>';
(CHEWING.classical || []).forEach((c) => {
h += `<details class="details">
<summary>${esc(c.title)} <span class="small muted">· ${esc(c.ref)}</span></summary>
<div class="verse">
${c.dev ? `<div class="verse-dev" lang="sa">${esc(c.dev)}</div>` : ''}
${c.iast ? `<div class="verse-iast">${esc(c.iast)}</div>` : ''}
<div class="verse-en">${esc(c.en)}</div>
<div class="verse-ref">— ${esc(c.ref)}</div>
</div>
<p class="verse-note">${esc(c.note)}</p>
</details>`;
});
h += '<h3 class="card-title">What modern studies say</h3>';
h += '<ul class="small stack">';
(CHEWING.modern || []).forEach((m) => {
const src = m.source || '';
const idx = src.indexOf(' — http');
let srcLine;
if (idx === -1) {
srcLine = `<p class="source small muted">Source: ${esc(src)}</p>`;
} else {
const name = src.slice(0, idx);
const url = src.slice(idx + 3);
srcLine = `<p class="source small muted">Source: ${esc(name)} — <a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a></p>`;
}
h += `<li>${esc(m.point)}${srcLine}</li>`;
});
h += '</ul>';
h += '<h3 class="card-title">Popular sayings, checked</h3>';
(CHEWING.myths || []).forEach((m) => {
h += `<p><strong>${esc(m.claim)}</strong><br>${esc(m.truth)}</p>`;
});
h += '<h3 class="card-title">Simple habits</h3>';
h += '<ol class="small stack">' + (CHEWING.tips || []).map((t) => `<li>${esc(t)}</li>`).join('') + '</ol>';
h += `<p class="small muted">${esc(CHEWING.caution)}</p>`;
return h;
}

// ---------- Welcome (starting page) ----------

function showWelcome() {
openOverlay(`
<div class="card hero stack" data-welcome>
<div class="emblem">${_art('grainLotus')}</div>
<h2 class="card-title">Annamaya</h2>
<p class="name-meaning">(annamaya kośa — the body, the sheath made of food · Taittiriya Upanishad)</p>
<p class="theme-line">${esc(THEME_LINE)}</p>
<div class="verse">
<div class="verse-dev" lang="sa">${esc(HERO_VERSE.dev)}</div>
<div class="verse-iast">${esc(HERO_VERSE.iast)}</div>
<div class="verse-en">${esc(HERO_VERSE.en)}</div>
<div class="verse-ref">— ${esc(HERO_VERSE.ref)}</div>
</div>
<p class="attribution">${esc(ATTRIBUTION)}</p>
${chewingShortHtml()}
<button class="btn primary" data-welcome-close>Enter</button>
<button class="btn ghost" data-welcome-intro>What are doshas?</button>
</div>`, { locked: false });

const panel = document.querySelector('.overlay-panel');
if (panel) {
panel.onclick = (e) => {
if (e.target.closest('[data-welcome-close]')) { closeOverlay(); return; }
if (e.target.closest('[data-welcome-intro]')) {
openOverlay(`<div class="card hero stack" data-welcome>${doshaIntroHtml()}<div class="btn-row"><button class="btn ghost" data-welcome-back>Back</button><button class="btn primary" data-welcome-close>Enter</button></div><button class="btn ghost" data-welcome-learn>Learn more about each dosha</button></div>`, { locked: false });
const p = document.querySelector('.overlay-panel');
if (p) p.onclick = panel.onclick;
return;
}
if (e.target.closest('[data-chew-more]')) {
openOverlay(`<div class="card stack" data-welcome>${chewingFullHtml()}<div class="btn-row"><button class="btn ghost" data-welcome-back>Back</button><button class="btn primary" data-welcome-close>Enter</button></div></div>`, { locked: false });
const p = document.querySelector('.overlay-panel');
if (p) p.onclick = panel.onclick;
return;
}
if (e.target.closest('[data-welcome-back]')) showWelcome();
if (e.target.closest('[data-welcome-learn]')) {
closeOverlay();
render('learn');
requestAnimationFrame(() => {
const card = Array.from(document.querySelectorAll('#view .card')).find((c) => c.textContent.includes('Know your doshas'));
if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
return;
}
};
}
}

// ---------- Onboarding ----------

function startOnboarding() {
let step = 0;
const steps = [];
if (!settings.onboarded) {
steps.push(() => `
<div class="card hero stack stagger" data-onb>
<div class="emblem">${_art('grainLotus') || _art('lotus')}</div>
<h2 class="card-title">Annamaya</h2>
<p class="name-meaning">(annamaya kośa — the body, the sheath made of food · Taittiriya Upanishad)</p>
<p class="theme-line">${esc(THEME_LINE)}</p>
<div class="verse">
<div class="verse-dev" lang="sa">${esc(HERO_VERSE.dev)}</div>
<div class="verse-iast">${esc(HERO_VERSE.iast)}</div>
<div class="verse-en">${esc(HERO_VERSE.en)}</div>
<div class="verse-ref">— ${esc(HERO_VERSE.ref)}</div>
</div>
<p class="attribution">${esc(ATTRIBUTION)}</p>
<button class="btn primary" data-next>Begin</button>
</div>`);
if (!settings.disclaimerAccepted) {
steps.push(() => `
<div class="card hero stack stagger" data-onb>
<div class="illus">${_art('lamp')}</div>
<h2 class="card-title">A kind word first</h2>
<p class="small">${esc(DISCLAIMER)}</p>
<button class="btn primary" data-disclaimer>I understand</button>
</div>`);
}
steps.push(() => `
<div class="card hero stack" data-onb>
${doshaIntroHtml()}
<button class="btn primary" data-next>Continue</button>
</div>`);
steps.push(() => `
<div class="card hero stack stagger" data-onb>
<h2 class="card-title">How shall we begin?</h2>
<div class="stack">
<button class="btn primary" data-quiz>Find my dosha <span class="small">(2 min quiz)</span></button>
<button class="btn ghost" data-know>I know my type</button>
<button class="btn ghost" data-skip>Skip for now</button>
</div>
<div id="obPick" class="stack" hidden>
<p class="small muted">Choose your constitution:</p>
<div class="row">
${Object.keys(TYPES).map((k) => `<button class="chip" data-type="${k}">${esc(TYPES[k].name)}</button>`).join('')}
</div>
</div>
</div>`);
steps.push(() => `
<div class="card hero stack stagger" data-onb>
<h2 class="card-title">Your food habits</h2>
<p class="small muted">We hide foods that don't fit your choice.</p>
<div class="chips">
<button class="chip${settings.diet === 'veg' ? ' on' : ''}" aria-pressed="${settings.diet === 'veg' ? 'true' : 'false'}" data-diet="veg">Veg</button>
<button class="chip${settings.diet === 'egg' ? ' on' : ''}" aria-pressed="${settings.diet === 'egg' ? 'true' : 'false'}" data-diet="egg">Egg</button>
<button class="chip${settings.diet === 'nonveg' ? ' on' : ''}" aria-pressed="${settings.diet === 'nonveg' ? 'true' : 'false'}" data-diet="nonveg">Non-veg</button>
</div>
<button class="btn primary" data-next>Next</button>
</div>`);
steps.push(() => `
<div class="card hero stack stagger" data-onb>
<h2 class="card-title">Your goal</h2>
<div class="chips">
${['gain', 'lose', 'maintain'].map((g) => `<button class="chip${settings.goal === g ? ' on' : ''}" aria-pressed="${settings.goal === g ? 'true' : 'false'}" data-goal="${g}">${esc(GOALS[g].label)}</button>`).join('')}
</div>
<p class="small muted" id="obGoalNote">${GOALS[settings.goal || 'gain'].note || ''}</p>
<button class="btn primary" data-finish>Finish</button>
</div>`);
} else {
if (!settings.disclaimerAccepted) {
steps.push(() => `
<div class="card hero stack stagger" data-onb>
<div class="illus">${_art('lamp')}</div>
<h2 class="card-title">A kind word first</h2>
<p class="small">${esc(DISCLAIMER)}</p>
<button class="btn primary" data-disclaimer>I understand</button>
</div>`);
}
}

function draw() {
if (step >= steps.length) {
settings.onboarded = true; save();
$('#overlay').removeEventListener('click', onb);
closeOverlay(); render('today');
toast('Welcome. Your plan is ready.');
return;
}
openOverlay(steps[step](), { locked: !settings.disclaimerAccepted });
}

function handler(e) {
const t = e.target;
if (t.closest('[data-next]')) { step++; draw(); return; }
if (t.closest('[data-disclaimer]')) {
settings.disclaimerAccepted = true; save(); step++; draw(); return;
}
if (t.closest('[data-quiz]')) {
step++;
startQuiz(() => { draw(); });
return;
}
if (t.closest('[data-know]')) {
$('#obPick').hidden = false;
return;
}
if (t.closest('[data-skip]')) { step++; draw(); return; }
const tp = t.closest('[data-type]');
if (tp) {
settings.type = tp.dataset.type; save();
step++; draw(); return;
}
const dt = t.closest('[data-diet]');
if (dt) { settings.diet = dt.dataset.diet; save(); draw(); return; }
const gl = t.closest('[data-goal]');
if (gl) {
settings.goal = gl.dataset.goal; save(); draw();
const n = $('#obGoalNote');
if (n) n.textContent = GOALS[settings.goal].note || '';
return;
}
if (t.closest('[data-finish]')) { step++; draw(); return; }
}

draw();

function onb(e) {
if (!e.target.closest('[data-onb]')) return;
handler(e);
}
$('#overlay').addEventListener('click', onb);
}

// ---------- Quiz ----------

function startQuiz(onDone) {
let i = 0;
const answers = new Array(QUIZ.length).fill(null);

function finish() {
const r = scoreQuiz(answers);
const letters = Array.from(r.type);
const arts = letters.map((L) => ({ V: 'wind', P: 'flame', K: 'leaf' }[L]));
const T = TYPES[r.type];
openOverlay(`
<div class="card hero stack stagger">
<div class="row" style="justify-content:center">${arts.map((a) => `<span class="illus">${_art(a)}</span>`).join('')}</div>
<h2 class="card-title">${esc(T.name)}</h2>
<p class="muted">${esc(T.tagline)}</p>
<p>${esc(T.summary)}</p>
${_bars(r.pct)}
<div class="grid3">
<div class="card"><h3 class="card-title small">Eat more</h3><ul class="small">${T.eatMore.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
<div class="card"><h3 class="card-title small">Eat less</h3><ul class="small">${T.eatLess.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
</div>
<p class="small muted">This is your likely constitution, not a diagnosis. You can retake it any time.</p>
<div class="btn-row">
<button class="btn primary" data-use>Use this</button>
<button class="btn ghost" data-other>Choose differently</button>
</div>
<div id="qzPick" class="stack" hidden>
<div class="row">
${Object.keys(TYPES).map((k) => `<button class="chip" data-picktype="${k}">${esc(TYPES[k].name)}</button>`).join('')}
</div>
</div>
</div>`);

$('#overlay').onclick = (e) => {
if (e.target.closest('[data-use]')) {
settings.type = r.type; settings.quizPct = r.pct; save();
closeOverlay();
if (onDone) onDone(); else render(currentTab);
return;
}
if (e.target.closest('[data-other]')) { $('#qzPick').hidden = false; return; }
const pt = e.target.closest('[data-picktype]');
if (pt) {
settings.type = pt.dataset.picktype; settings.quizPct = null; save();
closeOverlay();
if (onDone) onDone(); else render(currentTab);
}
};
}

function draw() {
if (i >= QUIZ.length) { finish(); return; }
const q = QUIZ[i];
openOverlay(`
<div class="quiz card stack stagger">
<p class="small muted">${esc(QUIZ_INTRO)}</p>
<div class="progressbar"><span style="width:${Math.round((i / QUIZ.length) * 100)}%"></span></div>
<p class="small muted">${i + 1} of ${QUIZ.length}</p>
<h2 class="quiz-q card-title">${esc(q.q)}</h2>
<div class="stack" role="radiogroup" aria-label="${esc(q.q)}">
${q.a.map((a, j) => `
<label class="answer${answers[i] === a.d ? ' selected' : ''}">
<input type="radio" name="qz" value="${a.d}"${answers[i] === a.d ? ' checked' : ''}>
<span>${esc(a.t)}</span>
</label>`).join('')}
</div>
<div class="btn-row">
<button class="btn ghost" data-back${i === 0 ? ' disabled' : ''}>Back</button>
<button class="btn primary" data-next${answers[i] ? '' : ' disabled'}>Next</button>
</div>
</div>`);

const panel = document.querySelector('.overlay-panel');

panel.querySelectorAll('.answer input').forEach((inp) => {
inp.addEventListener('change', () => {
answers[i] = inp.value;
panel.querySelectorAll('.answer').forEach((l) => l.classList.remove('selected'));
inp.closest('.answer').classList.add('selected');
const nb = panel.querySelector('[data-next]');
if (nb) nb.disabled = false;
});
});
$('#overlay').onclick = (e) => {
if (e.target.closest('[data-back]') && i > 0) { i--; draw(); }
else if (e.target.closest('[data-next]') && answers[i]) { i++; draw(); }
};
}

draw();
}

// ---------- Foods ----------

function _norm(s) { return String(s).toLowerCase().replace(/[\s-]+/g, ''); }

// module-level Foods view state ('eat' | 'avoid' | 'all')
let foodView = 'eat';

function foodScore(f) {
const L = typeLetters();
if (!L.length) return 0;
return L.reduce((sum, l) => sum + (Number(f[l]) || 0), 0);
}

function renderFoods(el) {
const allRecipes = RECIPES.filter(recipeAllowed);
el.innerHTML = `
<div class="stack">
<details class="details card" data-recipes-card>
<summary>Recipes by dosha (${allRecipes.length})</summary>
<p class="small muted">Home recipes with spices adjusted for your dosha. Tick off ingredients and steps as you cook.</p>
<div class="recipe-grid">${allRecipes.map((r) => `<button class="chip" type="button" data-open-recipe="${r.id}">${esc(r.name)}</button>`).join('')}</div>
</details>
<div class="card stack">
<input class="search" type="search" placeholder="Search 160+ foods — try 'ragi' or 'fish'"
aria-label="Search foods" autocomplete="off">
<div data-dietchips></div>
<div data-viewchips></div>
<div class="chips" data-cats></div>
<p class="small muted" data-count></p>
<div data-list class="stack"></div>
</div>
<div data-notype></div>
</div>`;

el.querySelector('[data-recipes-card]').addEventListener('click', (e) => {
const b = e.target.closest('[data-open-recipe]');
if (b) openRecipes([RECIPES.find((r) => r.id === b.dataset.openRecipe)]);
});

const state = { q: '', cat: 'All' };

function matchesDiet(f) {
if (settings.diet === 'veg') return f.type === 'veg';
if (settings.diet === 'egg') return f.type === 'veg' || f.type === 'egg';
return true;
}

function visibleCats() {
const set = new Set(['All']);
FOODS.filter(matchesDiet).forEach((f) => set.add(f.cat));
return Array.from(set);
}

function matchesView(f) {
const L = typeLetters();
if (!settings.type || !L.length || foodView === 'all') return true;
if (L.length === 1) {
if (foodView === 'eat') return f[L[0]] === 1;
return f[L[0]] === -1;
}
if (foodView === 'eat') return foodScore(f) > 0 && L.every((l) => f[l] !== -1);
return foodScore(f) < 0;
}

function visible(f) {
if (!matchesDiet(f)) return false;
if (!matchesView(f)) return false;
if (state.cat !== 'All' && f.cat !== state.cat) return false;
if (state.q) {
const n = _norm(state.q);
if (!(_norm(f.name).includes(n) || (f.aka || []).some((a) => _norm(a).includes(n)))) return false;
}
return true;
}

function drawDietChips() {
const box = el.querySelector('[data-dietchips]');
const diets = [
{ v: 'veg', t: 'Veg' },
{ v: 'egg', t: 'Egg' },
{ v: 'nonveg', t: 'Non-veg' }
];
box.innerHTML = `<p class="small muted">I eat:</p><div class="chips">` +
diets.map((x) => `<button class="chip${settings.diet === x.v ? ' on' : ''}" aria-pressed="${settings.diet === x.v ? 'true' : 'false'}" data-fdiet="${x.v}">${esc(x.t)}</button>`).join('') +
'</div>';
}

function drawViewChips() {
const box = el.querySelector('[data-viewchips]');
const no = el.querySelector('[data-notype]');
if (!settings.type || !TYPES[settings.type]) {
box.innerHTML = '';
no.innerHTML = `<div class="card stack">
<p class="small">${esc('Choose your dosha at the top right (or take the quiz) to see what to eat and avoid.')}</p>
<button class="btn ghost" data-quizcta>Take the quiz</button>
</div>`;
return;
}
no.innerHTML = '';
const views = [
{ v: 'eat', t: '✓ Eat more' },
{ v: 'avoid', t: '✗ Avoid / reduce' },
{ v: 'all', t: 'All foods' }
];
box.innerHTML = `<p class="small muted">For ${esc(TYPES[settings.type].name)}:</p>` +
'<div class="chips">' + views.map((x) =>
`<button class="chip${foodView === x.v ? ' on' : ''}" aria-pressed="${foodView === x.v ? 'true' : 'false'}" data-fview="${x.v}">${esc(x.t)}</button>`).join('') + '</div>';
}

function drawChips() {
const cats = visibleCats();
const box = el.querySelector('[data-cats]');
if (state.cat !== 'All' && !cats.includes(state.cat)) state.cat = 'All';
box.innerHTML = cats.map((c) => `<button class="chip${state.cat === c ? ' on' : ''}" aria-pressed="${state.cat === c ? 'true' : 'false'}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
}

function drawList() {
const box = el.querySelector('[data-list]');
const list = FOODS.filter(visible);
let label = `${list.length} food${list.length === 1 ? '' : 's'}`;
if (settings.type && typeLetters().length) {
if (foodView === 'eat') label = `${list.length} food${list.length === 1 ? '' : 's'} to eat more of`;
else if (foodView === 'avoid') label = `${list.length} food${list.length === 1 ? '' : 's'} to reduce`;
}
el.querySelector('[data-count]').textContent = list.length ? label : '';
if (!list.length) {
box.innerHTML = '<p class="empty muted">No foods match. Try another word or category.</p>';
return;
}
box.innerHTML = list.map((f) => `
<div class="food" data-food="${esc(f.id)}" tabindex="0" role="button" aria-expanded="false">
<div class="food-head">
<div>${ficoHtml(iconFor(f))}<strong>${esc(f.name)}</strong><div class="small muted">${esc(f.cat)}</div></div>
<div class="marks">${_mark(f.V, 'Vata')}${_mark(f.P, 'Pitta')}${_mark(f.K, 'Kapha')}</div>
</div>
<div class="food-why" hidden><p class="small">${esc(f.why)}</p>${(f.aka && f.aka.length) ? `<p class="small muted">Also called: ${f.aka.map(esc).join(', ')}</p>` : ''}</div>
</div>`).join('');
}

function toggleFood(node) {
const why = node.querySelector('.food-why');
why.hidden = !why.hidden;
node.setAttribute('aria-expanded', String(!why.hidden));
}

el.querySelector('[data-list]').addEventListener('click', (e) => {
const f = e.target.closest('[data-food]');
if (f) toggleFood(f);
});
el.querySelector('[data-list]').addEventListener('keydown', (e) => {
if (e.key !== 'Enter' && e.key !== ' ') return;
const f = e.target.closest('[data-food]');
if (f) { e.preventDefault(); toggleFood(f); }
});

el.addEventListener('click', (e) => {
const fd = e.target.closest('[data-fdiet]');
if (fd) {
const value = fd.dataset.fdiet;
settings.diet = value; save();
toast(value === 'veg' ? 'Showing vegetarian foods and meals' : value === 'egg' ? 'Showing veg + egg foods and meals' : 'Showing all foods and meals');
render('foods');
return;
}
const fv = e.target.closest('[data-fview]');
if (fv) { foodView = fv.dataset.fview; drawViewChips(); drawChips(); drawList(); return; }
const c = e.target.closest('[data-cat]');
if (c) { state.cat = c.dataset.cat; drawChips(); drawList(); return; }
if (e.target.closest('[data-quizcta]')) { startQuiz(() => render('foods')); return; }
});

const input = el.querySelector('.search');
let deb = null;
input.addEventListener('input', () => {
clearTimeout(deb);
deb = setTimeout(() => { state.q = input.value; drawList(); }, 120);
});

drawDietChips();
drawViewChips();
drawChips();
drawList();
}

// ---------- Learn ----------

function _sourceLine(src) {
const idx = src.indexOf(' — http');
if (idx === -1) return `<p class="source small muted">Source: ${esc(src)}</p>`;
const name = src.slice(0, idx);
const url = src.slice(idx + 3);
return `<p class="source small muted">Source: ${esc(name)} — <a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a></p>`;
}

function _nlbr(s) { return esc(s).replace(/\n/g, '<br>'); }

function _agniCard() {
let h = '';
h += '<div class="card stack">';
h += `<span class="illus">${_art('flame') || _art('lamp')}</span>`;
h += `<h2 class="card-title">${esc(AGNI.title)}</h2>`;
h += `<p>${esc(AGNI.intro)}</p>`;
h += '<h3 class="card-title">From the scriptures</h3>';
AGNI.verses.forEach((v) => {
h += `<details class="details"${v.id === 'gita-15-14' ? ' open' : ''}>
<summary>${esc(v.title)} <span class="small muted">· ${esc(v.ref)}</span></summary>
<div class="verse">
<div class="verse-dev" lang="sa">${esc(v.dev)}</div>
<div class="verse-iast">${esc(v.iast)}</div>
<div class="verse-en">${esc(v.en)}</div>
<div class="verse-ref">— ${esc(v.ref)}</div>
</div>
<p class="verse-note">${esc(v.note)}</p>
</details>`;
});
h += '<h3 class="card-title">Jatharagni in Ayurveda</h3>';
h += '<ul class="small stack">';
AGNI.ayurveda.forEach((a) => {
h += `<li>${esc(a.point)}<p class="source small muted">Source: ${esc(a.ref)}${a.verified ? '' : ' (traditional teaching)'}</p></li>`;
});
h += '</ul>';
h += '<div class="card stack">';
h += `<h3 class="card-title">${esc(AGNI.practice.title)}</h3>`;
h += '<div class="verse">';
h += `<div class="verse-dev" lang="sa">${_nlbr(AGNI.practice.dev)}</div>`;
h += `<div class="verse-iast">${_nlbr(AGNI.practice.iast)}</div>`;
h += `<div class="verse-en">${esc(AGNI.practice.en)}</div>`;
h += `<div class="verse-ref">— ${esc(AGNI.practice.ref)}</div>`;
h += '</div>';
h += `<p class="verse-note">${esc(AGNI.practice.note)}</p>`;
h += '</div>';
h += '<ul class="small stack">';
AGNI.reflections.forEach((r) => { h += `<li><em>${esc(r)}</em></li>`; });
h += '</ul>';
h += `<p class="small muted">${esc(AGNI.caution)}</p>`;
h += '</div>';
return h;
}

function renderLearn(el) {
const L = typeLetters();
let html = '';

// All references (top)
html += '<div class="btn-row"><button class="btn ghost" data-open-refs>📚 All references</button></div>';

// Dosha introduction
html += '<div class="stack">';
html += '<div class="card stack stagger">' + doshaIntroHtml() + '</div>';

// Know your doshas
html += '<div class="card stack stagger">' + doshaGuideHtml() + '</div>';

// Your type
html += '<div class="card stack stagger">';
html += '<h2 class="card-title">Your type</h2>';
if (settings.type && TYPES[settings.type]) {
const T = TYPES[settings.type];
html += `<p><strong>${esc(T.name)}</strong> <span class="muted">${esc(T.tagline)}</span></p>`;
if (settings.quizPct) html += _bars(settings.quizPct);
html += `<p class="small">${esc(T.summary)}</p>`;
} else {
html += '<p class="muted">You have not picked a type yet. A two-minute quiz can suggest one.</p>';
html += '<button class="btn primary" data-learnquiz>Find my dosha</button>';
}
html += '</div>';

html += '<div class="kolam">' + _art('kolam') + '</div>';

// Food and the mind
html += '<h2 class="section-title">Food and the mind</h2>';
html += '<p class="small muted">Annamaya: we become what we eat.</p>';
html += '<div class="stack stagger">';
VERSES.forEach((v, idx) => {
html += `<details class="details card"${idx < 2 ? ' open' : ''}>
<summary>${esc(v.title)} <span class="small muted">· ${esc(v.ref)}</span></summary>
<div class="verse">
<div class="verse-dev" lang="sa">${esc(v.dev)}</div>
<div class="verse-iast">${esc(v.iast)}</div>
<div class="verse-en">${esc(v.en)}</div>
<div class="verse-ref">— ${esc(v.ref)}</div>
</div>
<p class="verse-note">${esc(v.note)}</p>
</details>`;
});
html += '</div>';

html += '<div class="kolam">' + _art('kolam') + '</div>';

// Gut and mind
html += `<h2 class="section-title">${esc(GUT.title)}</h2>`;
html += `<p>${esc(GUT.intro)}</p>`;
html += '<div class="stack stagger">';
html += '<div class="card stack">';
html += '<h3 class="card-title">What the old texts say</h3>';
GUT.ayurveda.forEach((a, idx) => {
html += `<details class="details"${idx === 0 ? ' open' : ''}>
<summary>${esc(a.title)} <span class="small muted">· ${esc(a.ref)}</span></summary>
<div class="verse">
<div class="verse-dev" lang="sa">${esc(a.dev)}</div>
<div class="verse-iast">${esc(a.iast)}</div>
<div class="verse-en">${esc(a.en)}</div>
<div class="verse-ref">— ${esc(a.ref)}</div>
</div>
<p class="verse-note">${esc(a.note)}</p>
</details>`;
});
html += '</div>';
html += '<div class="card stack">';
html += '<h3 class="card-title">What modern science says</h3>';
html += '<ul class="small stack">';
GUT.modern.forEach((m) => {
html += `<li>${esc(m.point)}${_sourceLine(m.source)}</li>`;
});
html += '</ul>';
html += '</div>';
html += '<div class="card stack">';
html += '<h3 class="card-title">In what order should I eat?</h3>';
html += `<p class="small">Ayurveda: ${esc(GUT.order.ayurveda.text)}</p><p class="source small muted">Source: ${esc(GUT.order.ayurveda.ref)}</p>`;
html += `<p class="small">Modern studies: ${esc(GUT.order.modern.text)}</p>${_sourceLine(GUT.order.modern.source)}`;
html += `<p><strong>${esc(GUT.order.together)}</strong></p>`;
html += '</div>';
html += '<div class="card stack">';
html += '<h3 class="card-title">Five simple habits</h3>';
html += '<ol class="small stack">';
GUT.tips.forEach((t) => { html += `<li>${esc(t)}</li>`; });
html += '</ol>';
html += `<p class="small muted">${esc(GUT.caution)}</p>`;
html += '</div>';
html += '</div>';

// Agni
html += '<div class="kolam">' + _art('kolam') + '</div>';
html += _agniCard();

html += '<div class="kolam">' + _art('kolam') + '</div>';

// Food myths
html += '<h2 class="section-title">Food myths, gently checked</h2>';
html += '<div class="stack stagger">';
MYTHS.forEach((m) => {
html += `<details class="details card">
<summary>Myth: ${esc(m.myth)}</summary>
<p><strong>What we know:</strong> ${esc(m.fact)}</p>
<p class="verse-note">Ayurveda: ${esc(m.ayurveda)}</p>
${_sourceLine(m.source)}
</details>`;
});
html += '</div>';

html += '<div class="kolam">' + _art('kolam') + '</div>';

// Is non-veg Vedic?
html += `<h2 class="section-title">${esc(NONVEG.title)}</h2>`;
html += `<p class="small muted">${esc(NONVEG.intro)}</p>`;
html += '<div class="stack stagger">';
[
['What Ayurveda says', NONVEG.ayurveda],
['In the Upanishads', NONVEG.upanishad],
['The Ayurvedic principle', NONVEG.principle],
['The vegetarian view', NONVEG.vegetarian]
].forEach(([heading, items]) => {
html += `<div class="card stack">
<h3 class="card-title">${esc(heading)}</h3>
<ul class="small stack">
${items.map((p) => `<li>${esc(p.point)}<p class="source small muted">Source: ${esc(p.ref)}${p.verified ? '' : ' (traditional teaching)'}</p></li>`).join('')}
</ul>
</div>`;
});
html += `<p><strong>${esc(NONVEG.summary)}</strong></p>`;
html += '</div>';

html += '<div class="kolam">' + _art('kolam') + '</div>';

// Wisdom from Japan
html += `<h2 class="section-title">${esc(JAPAN.title)}</h2>`;
html += `<p class="small muted">${esc(JAPAN.intro)}</p>`;
html += '<div class="stack stagger">';
JAPAN.habits.forEach((h) => {
html += `<details class="details card">
<summary>${esc(h.name)} <span class="small muted">· ${esc(h.jp)}</span></summary>
<p class="small">${esc(h.text)}</p>
<p class="verse-note">Ayurveda: ${esc(h.ayurveda)}</p>
</details>`;
});
html += `<p class="small muted">${esc(JAPAN.caution)}</p>`;
html += '<div class="row">' +
JAPAN.sources.map((s) => `<a class="btn ghost" href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.title)}</a>`).join('') +
'</div>';
html += '</div>';

html += '<div class="kolam">' + _art('kolam') + '</div>';

// What is a dosha?
html += '<h2 class="section-title">What is a dosha?</h2>';
html += '<div class="grid3 stagger">';
['V', 'P', 'K'].forEach((k) => {
const d = DOSHAS[k];
html += `<div class="card stack">
<span class="illus">${_art(d.symbol)}</span>
<h3 class="card-title">${esc(d.name)} <span class="muted small">· ${esc(d.element)}</span></h3>
<p class="small muted">${d.qualities.map(esc).join(', ')}</p>
<details class="details"><summary>Balanced</summary><ul class="small">${d.balanced.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>
<details class="details"><summary>Imbalanced</summary><ul class="small">${d.imbalanced.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>
</div>`;
});
html += '</div>';

html += '<div class="kolam">' + _art('kolam') + '</div>';

// Viruddha
html += '<h2 class="section-title">Foods that don\'t go together — Viruddha Ahara</h2>';
html += '<p class="small muted">Ayurveda classically lists food pairings and habits it considers incompatible. These are traditional teachings, not medical advice.</p>';
html += '<div class="stack stagger">';
VIRUDDHA.forEach((v) => {
html += `<div class="card viruddha stack">
<div class="food-head"><strong>${esc(v.pair)}</strong><span class="small muted">${esc(v.kind)}</span></div>
<p class="small">${esc(v.concern)}</p>
<p class="small">Instead: ${esc(v.instead)}</p>
<p class="source small muted">Source: ${esc(v.source)}${v.verified ? '' : ' (traditional teaching)'}</p>
</div>`;
});
html += '</div>';
html += '<details class="details card"><summary>The 18 kinds of incompatibility</summary><ul class="small stack">' +
VIRUDDHA_TYPES.map((t) => `<li><strong>${esc(t.name)}</strong> — ${esc(t.meaning)} e.g. ${esc(t.example)}</li>`).join('') +
`</ul><p class="source small muted">Source: ${esc(VIRUDDHA_TYPES_SOURCE)}</p></details>`;

html += '<div class="kolam">' + _art('kolam') + '</div>';

// Daily rules (Amendment 3)
html += '<h2 class="section-title">Daily rules</h2>';
html += '<div class="card stack"><ul class="small">' +
RULES.all.map((r) => `<li>${esc(r)}</li>`).join('') +
(L.length
? L.map((k) => RULES[k].map((r) => `<li>${esc(r)}</li>`).join('')).join('')
: ['V', 'P', 'K'].map((k) => RULES[k].map((r) => `<li>${esc(r)}</li>`).join('')).join('')) +
((settings.diet === 'egg' || settings.diet === 'nonveg')
? (RULES.egg || []).map((r) => `<li>${esc(r)}</li>`).join('')
: '') +
'</ul></div>';

html += '<div class="kolam">' + _art('kolam') + '</div>';

// Sources
html += '<h2 class="section-title">Ancient sources</h2>';
html += '<div class="stack stagger">';
SOURCES.forEach((s) => {
html += `<div class="card stack">
<h3 class="card-title">${esc(s.title)}</h3>
<p class="small muted">${esc(s.era)}</p>
<p class="small">${esc(s.about)}</p>
${s.link ? `<a class="btn ghost" href="${esc(s.link)}" target="_blank" rel="noopener">Read online</a>` : ''}
</div>`;
});
html += '</div>';

html += '<div class="kolam">' + _art('kolam') + '</div>';

// Disclaimer
html += '<div class="card stack"><h2 class="card-title">Disclaimer</h2><p class="small">' + esc(DISCLAIMER) + '</p></div>';
html += '</div>';

// All references (bottom)
html += '<div class="btn-row"><button class="btn ghost" data-open-refs>📚 All references</button></div>';

el.innerHTML = html;

const qb = el.querySelector('[data-learnquiz]');
if (qb) qb.addEventListener('click', () => startQuiz(() => render('learn')));

el.addEventListener('click', (e) => {
if (e.target.closest('[data-open-refs]')) openReferences();
});
}

// ---------- Me ----------

function renderMe(el) {
const L = typeLetters();
let html = '<div class="stack stagger">';

// Constitution
html += '<div class="card stack">';
html += '<h2 class="card-title">Constitution</h2>';
if (settings.type && TYPES[settings.type]) {
const T = TYPES[settings.type];
html += `<p><strong>${esc(T.name)}</strong> <span class="muted">${esc(T.tagline)}</span></p>`;
if (settings.quizPct) html += _bars(settings.quizPct);
html += '<div class="btn-row"><button class="btn ghost" data-retake>Retake quiz</button><button class="btn ghost" data-manual>Choose manually</button></div>';
html += '<div class="row" data-typepick hidden>' +
Object.keys(TYPES).map((k) => `<button class="chip" data-settype="${k}">${esc(TYPES[k].name)}</button>`).join('') + '</div>';
} else {
html += '<p class="muted">No type chosen yet.</p>';
html += '<div class="btn-row"><button class="btn primary" data-retake>Find my dosha</button><button class="btn ghost" data-manual>Choose manually</button></div>';
html += '<div class="row" data-typepick hidden>' +
Object.keys(TYPES).map((k) => `<button class="chip" data-settype="${k}">${esc(TYPES[k].name)}</button>`).join('') + '</div>';
}
html += '</div>';

// Diet
html += '<div class="card stack"><h2 class="card-title">Diet type</h2><div class="chips">' +
[['veg', 'Veg'], ['egg', 'Egg'], ['nonveg', 'Non-veg']].map((d) =>
`<button class="chip${settings.diet === d[0] ? ' on' : ''}" aria-pressed="${settings.diet === d[0] ? 'true' : 'false'}" data-dietset="${d[0]}">${d[1]}</button>`).join('') +
'</div></div>';

// Goal
html += '<div class="card stack"><h2 class="card-title">Goal</h2><div class="chips">' +
['gain', 'lose', 'maintain'].map((g) =>
`<button class="chip${settings.goal === g ? ' on' : ''}" aria-pressed="${settings.goal === g ? 'true' : 'false'}" data-goalset="${g}">${esc(GOALS[g].label)}</button>`).join('') +
'</div>';
if (settings.goal === 'lose' && GOALS.lose.note) html += `<p class="small muted">${esc(GOALS.lose.note)}</p>`;
if (settings.goal && GOALS[settings.goal] && GOALS[settings.goal].gym) html += `<p class="small">${esc(GOALS[settings.goal].gym)}</p>`;
html += '</div>';

// Meal times (Amendment 5)
html += '<div class="card stack"><h2 class="card-title">Meal times</h2><div class="stack">';
SLOTS.filter((s) => !s.gymOnly && !s.optional).forEach((s) => {
html += `<div class="form-row"><label class="field" for="time-${esc(s.id)}">${esc(s.label)}</label>` +
`<input type="time" id="time-${esc(s.id)}" data-time="${esc(s.id)}" value="${esc(timeOf(s))}"></div>`;
});
html += '</div><button class="btn ghost" data-resettimes>Reset to defaults</button></div>';

// Reminders
html += '<div class="card stack"><h2 class="card-title">Reminders</h2>' +
'<p class="small muted">Download a calendar file with daily reminders for every meal slot, ten minutes before each. Import it into your phone calendar.</p>' +
'<button class="btn primary" data-ics>Add meal reminders to my calendar</button>' +
'<p class="small muted" data-iosnote hidden>To download, open this page in Safari.</p></div>';

// Gym time
html += '<div class="card stack"><h2 class="card-title">Gym time</h2>' +
`<div class="form-row"><label class="field" for="gymtime">Gym time</label><input type="time" id="gymtime" data-gymtime value="${esc(settings.gymTime || '17:00')}"></div>` +
'</div>';

// Text size
html += '<div class="card stack"><h2 class="card-title">Text size</h2><div class="chips">' +
[['normal', 'Normal'], ['large', 'Large'], ['xl', 'Extra large']].map((t) =>
`<button class="chip${(settings.textSize || 'normal') === t[0] ? ' on' : ''}" aria-pressed="${(settings.textSize || 'normal') === t[0] ? 'true' : 'false'}" data-textset="${t[0]}">${t[1]}</button>`).join('') +
'</div></div>';

// Theme
html += '<div class="card stack"><h2 class="card-title">Theme</h2><div class="chips">' +
[['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']].map((t) =>
`<button class="chip${(settings.theme || 'auto') === t[0] ? ' on' : ''}" aria-pressed="${(settings.theme || 'auto') === t[0] ? 'true' : 'false'}" data-themeset="${t[0]}">${t[1]}</button>`).join('') +
'</div></div>';

// Grocery
html += '<div class="card stack"><h2 class="card-title">Grocery list</h2>' +
'<p class="small muted">Everything you need for your picked meals, grouped by aisle.</p>' +
'<button class="btn primary" data-grocery>Grocery list</button></div>';

// Backup
html += '<div class="card stack" id="backupCard"><h2 class="card-title">Backup</h2>' +
'<p class="small muted">All your data lives only on this device. Save a file to keep it safe.</p>' +
'<div class="btn-row"><button class="btn primary" data-export>Save my data</button>' +
'<button class="btn ghost" type="button" data-restore>Restore from a file</button>' +
'<input type="file" accept="application/json,.json" id="restoreFile" hidden></div>' +
'<div data-confirm hidden class="stack"><p class="small">This will overwrite the data on this device. Continue?</p>' +
'<div class="btn-row"><button class="btn danger" data-overwrite>Yes, restore</button><button class="btn ghost" data-cancelrestore>Cancel</button></div></div>' +
'<p class="small muted" data-iosnote2 hidden>To download, open this page in Safari.</p>' +
'<p class="small" data-backuperror hidden></p></div>';

// Disclaimer
html += '<details class="details card"><summary>Disclaimer</summary><p class="small">' + esc(DISCLAIMER) + '</p></details>';

// About
html += '<div class="card stack"><h2 class="card-title">About</h2>' +
'<p class="small muted">Vedic Lifestyle Diet · v2</p><p class="small">Made with care. Educational only.</p></div>';

html += '</div>';
el.innerHTML = html;
const root = el.firstElementChild;

// handlers
root.addEventListener('click', (e) => {
if (e.target.closest('[data-retake]')) { startQuiz(() => render('me')); return; }
if (e.target.closest('[data-manual]')) {
const p = root.querySelector('[data-typepick]');
if (p) p.hidden = !p.hidden;
return;
}
const st = e.target.closest('[data-settype]');
if (st) { settings.type = st.dataset.settype; settings.quizPct = null; save(); render('me'); return; }
const d = e.target.closest('[data-dietset]');
if (d) { settings.diet = d.dataset.dietset; save(); render('me'); return; }
const g = e.target.closest('[data-goalset]');
if (g) { settings.goal = g.dataset.goalset; save(); render('me'); return; }
if (e.target.closest('[data-resettimes]')) {
settings.times = {}; save(); render('me'); toast('Meal times reset.'); return;
}
if (e.target.closest('[data-ics]')) {
if (navigator.standalone) { const n = root.querySelector('[data-iosnote]'); if (n) n.hidden = false; }
download('vedic-diet-reminders.ics', 'text/calendar;charset=utf-8', buildIcs());
toast('Calendar file downloaded.');
return;
}
const t = e.target.closest('[data-textset]');
if (t) { settings.textSize = t.dataset.textset; save(); applyPrefs(); render('me'); return; }
const th = e.target.closest('[data-themeset]');
if (th) { settings.theme = th.dataset.themeset; save(); applyPrefs(); render('me'); return; }
if (e.target.closest('[data-grocery]')) { openGrocery(); return; }
if (e.target.closest('[data-export]')) {
if (navigator.standalone) { const n = root.querySelector('[data-iosnote2]'); if (n) n.hidden = false; }
exportBackup(); toast('Backup saved.');
return;
}
if (e.target.closest('[data-restore]')) {
const inp = document.getElementById('restoreFile');
if (inp) inp.click();
return;
}
if (e.target.closest('[data-cancelrestore]')) {
const c = root.querySelector('[data-confirm]');
if (c) c.hidden = true;
return;
}
if (e.target.closest('[data-overwrite]')) {
const card = document.getElementById('backupCard');
const pending = card && card._pendingBackup;
if (pending) {
try {
Object.keys(pending).forEach((k) => store.set(k, pending[k]));
location.reload();
} catch (err) { toast('Could not restore that file.'); }
}
return;
}
});

root.addEventListener('change', (e) => {
const tm = e.target.closest('[data-time]');
if (tm) {
settings.times = settings.times || {};
if (tm.value) settings.times[tm.dataset.time] = tm.value; else delete settings.times[tm.dataset.time];
save(); toast('Meal time saved.');
return;
}
const gt = e.target.closest('[data-gymtime]');
if (gt) { settings.gymTime = gt.value || '17:00'; save(); return; }
const imp = e.target.closest('#restoreFile');
if (imp && imp.files && imp.files[0]) {
const f = imp.files[0];
imp.value = '';
importBackup(f);
}
});

// show in-page confirm target inside backup card
const origConfirmHost = root.querySelector('[data-confirm]');
el._confirmHost = origConfirmHost;
}

// ---------- Grocery ----------

function openGrocery() {
const need = new Set();
const k = todayKey();
[k, addDays(k, 1)].forEach((day) => {
SLOTS.forEach((s) => {
const o = pickedOption(day, s);
if (o) (o.ing || []).forEach((i) => need.add(i));
});
});

function draw() {
const rows = Object.entries(CATEGORY).map(([cat, items]) => {
const inCat = items.filter((i) => need.has(i));
if (!inCat.length) return '';
return `<div class="stack"><h3 class="card-title">${esc(cat)}</h3>` + inCat.map((i) => {
const mf = findFood(i);
return `
<label class="chip${bought[i] ? ' on' : ''}" aria-pressed="${bought[i] ? 'true' : 'false'}"><input type="checkbox" data-g="${esc(i)}"${bought[i] ? ' checked' : ''}>${mf ? ficoHtml(iconFor(mf)) : ''}${esc(i)}</label>`;
}).join('') + '</div>';
}).join('');
openOverlay(`
<div class="card stack">
<h2 class="card-title">Grocery list</h2>
<p class="small muted">Ingredients for today and tomorrow, from your picked meals.</p>
<div data-glist class="stack">${rows || '<p class="empty muted">Nothing needed right now.</p>'}</div>
<div class="btn-row">
<button class="btn ghost" data-clear>Clear ticks</button>
<button class="btn primary" data-closeg>Close</button>
</div>
</div>`);
$('#overlay').onclick = (e) => {
if (e.target.closest('[data-closeg]')) { closeOverlay(); render(currentTab); return; }
if (e.target.closest('[data-clear]')) { bought = {}; save(); draw(); return; }
};
$('#overlay').onchange = (e) => {
const c = e.target.closest('[data-g]');
if (!c) return;
if (c.checked) bought[c.dataset.g] = true; else delete bought[c.dataset.g];
save();
const lbl = c.closest('.chip');
if (lbl) {
lbl.classList.toggle('on', c.checked);
lbl.setAttribute('aria-pressed', String(c.checked));
}
};
}
draw();
}

// ---------- .ics ----------

function buildIcs() {
function pad(n) { return String(n).padStart(2, '0'); }
function dtLocal(d) {
return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
}
function dtUtc(d) {
return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' +
pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z';
}
function icsEsc(s) {
return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}
function fold(line) {
// fold lines longer than 75 octets with CRLF + single space
const enc = new TextEncoder();
const out = [];
let cur = '';
for (const ch of line) {
const oct = enc.encode(cur + ch).length;
if (oct > 75) { out.push(cur); cur = ' ' + ch; }
else cur += ch;
}
out.push(cur);
return out;
}
const lines = [
'BEGIN:VCALENDAR',
'VERSION:2.0',
'PRODID:-//Vedic Lifestyle Diet//EN',
'CALSCALE:GREGORIAN',
'METHOD:PUBLISH'
];
const today = new Date();
const stamp = dtUtc(new Date());
const dateStr = dtLocal(today).slice(0, 8);

SLOTS.filter((s) => !s.gymOnly && !s.optional).forEach((s) => {
const t = timeOf(s);
const [h, m] = t.split(':').map(Number);
const opt = pickedOption(todayKey(), s);
lines.push(
'BEGIN:VEVENT',
'UID:vedic-diet-' + s.id + '@vedic-diet.app',
'DTSTAMP:' + stamp,
'DTSTART:' + dateStr + 'T' + pad(h) + pad(m) + '00',
'DURATION:PT15M',
'RRULE:FREQ=DAILY',
'SUMMARY:' + icsEsc(s.label + ' in 10 min'),
'DESCRIPTION:' + icsEsc(opt ? opt.name : ''),
'BEGIN:VALARM',
'ACTION:DISPLAY',
'TRIGGER:-PT10M',
'DESCRIPTION:Reminder',
'END:VALARM',
'END:VEVENT'
);
});
// daily prep event at 21:00
lines.push(
'BEGIN:VEVENT',
'UID:vedic-diet-prep@vedic-diet.app',
'DTSTAMP:' + stamp,
'DTSTART:' + dateStr + 'T210000',
'DURATION:PT15M',
'RRULE:FREQ=DAILY',
'SUMMARY:' + icsEsc('Prepare for tomorrow: soak dals / plan breakfast'),
'DESCRIPTION:' + icsEsc('Prepare for tomorrow: soak dals / plan breakfast'),
'BEGIN:VALARM',
'ACTION:DISPLAY',
'TRIGGER:-PT10M',
'DESCRIPTION:Reminder',
'END:VALARM',
'END:VEVENT',
'END:VCALENDAR'
);

const folded = [];
lines.forEach((l) => fold(l).forEach((f) => folded.push(f)));
return folded.join('\r\n') + '\r\n';
}

// ---------- Backup ----------

function exportBackup() {
const data = {};
for (let i = 0; i < localStorage.length; i++) {
const k = localStorage.key(i);
if (k && k.indexOf('pd.') === 0) {
try { data[k] = JSON.parse(localStorage.getItem(k)); } catch { data[k] = localStorage.getItem(k); }
}
}
const out = {
app: 'vedic-lifestyle-diet',
version: 2,
exported: new Date().toISOString(),
data: data
};
const d = new Date();
const name = 'vedic-diet-backup-' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + '.json';
download(name, 'application/json', JSON.stringify(out, null, 2));
}

function _backupFail(msg) {
const card = document.getElementById('backupCard');
if (card) {
card._pendingBackup = null;
const host = card._confirmHost || card.querySelector('[data-confirm]');
if (host) host.hidden = true;
const err = card.querySelector('[data-backuperror]');
if (err) { err.textContent = msg; err.hidden = false; }
}
toast(msg);
}

function _validBackupData(data) {
const isPlainObject = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
const isDateString = (s) => /^\d{4}-\d{2}-\d{2}$/.test(String(s));
const isTimeString = (v) => typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
if (!isPlainObject(data)) return false;
const keys = Object.keys(data);
if (keys.length === 0) return false;
if (!keys.every((k) => k.indexOf('pd.') === 0)) return false;
if ('pd.settings' in data && !isPlainObject(data['pd.settings'])) return false;
if ('pd.days' in data && !isPlainObject(data['pd.days'])) return false;
if ('pd.defaults' in data && !isPlainObject(data['pd.defaults'])) return false;
if ('pd.bought' in data && !isPlainObject(data['pd.bought'])) return false;
if ('pd.cook' in data && !(isPlainObject(data['pd.cook']) && Object.values(data['pd.cook']).every(isPlainObject))) return false;
if ('pd.settings' in data) {
const st = data['pd.settings'];
if ('gymTime' in st && !isTimeString(st.gymTime)) return false;
if ('times' in st) {
if (!isPlainObject(st.times)) return false;
if (!Object.values(st.times).every((t) => isTimeString(t))) return false;
}
}
if ('pd.days' in data) {
if (!Object.values(data['pd.days']).every((d) =>
isPlainObject(d) &&
(!('status' in d) || isPlainObject(d.status)) &&
(!('pick' in d) || isPlainObject(d.pick)) &&
(!('cheats' in d) || isPlainObject(d.cheats)) &&
(!('shift' in d) || (typeof d.shift === 'number' && Number.isFinite(d.shift))) &&
(!('gym' in d) || typeof d.gym === 'boolean')
)) return false;
}
if ('pd.defaults' in data) {
if (!Object.values(data['pd.defaults']).every((v) => typeof v === 'string')) return false;
}
if ('pd.bought' in data) {
if (!Object.values(data['pd.bought']).every((v) => typeof v === 'boolean')) return false;
}
if ('pd.weights' in data) {
if (!Array.isArray(data['pd.weights'])) return false;
if (!data['pd.weights'].every((w) =>
isPlainObject(w) &&
isDateString(w.date) &&
typeof w.kg === 'number' && Number.isFinite(w.kg)
)) return false;
}
return true;
}

function importBackup(file) {
const reader = new FileReader();
reader.onload = () => {
let obj;
try { obj = JSON.parse(String(reader.result)); } catch {
_backupFail('That file is not a valid backup.');
return;
}
if (!obj || typeof obj !== 'object' || !_validBackupData(obj.data)) {
_backupFail('That file is not a valid backup.');
return;
}
// in-page confirm inside the Me backup card
const card = document.getElementById('backupCard');
const host = card && (card._confirmHost || card.querySelector('[data-confirm]'));
if (!host) { toast('Open the Me tab to restore.'); return; }
const err = card && card.querySelector('[data-backuperror]');
if (err) err.hidden = true;
card._pendingBackup = obj.data;
host.hidden = false;
toast('Backup loaded. Confirm to restore.');
};
reader.onerror = () => toast('Could not read that file.');
reader.readAsText(file);
}

/* recipes.js — recipe viewer: dosha-adjusted spices and a tick-off cooking checklist.
   Uses globals from app.js / views.js (settings, store, esc, openOverlay, closeOverlay,
   typeLetters, startQuiz, render, toast). Ticks are saved in localStorage 'pd.cook'. */

const DOSHA_NAMES = { V: 'Vata', P: 'Pitta', K: 'Kapha' };

// { recipeId: { i0: true, s2: true } } — i = ingredient index, s = step index.
// Loaded on first use: app.js (which defines `store`) loads after this file.
let cook = null;
function loadCook() {
  if (cook) return cook;
  const raw = store.get('pd.cook', {});
  const out = {};
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    Object.keys(raw).forEach((id) => {
      const t = raw[id];
      if (!t || typeof t !== 'object' || Array.isArray(t)) return;
      const clean = {};
      Object.keys(t).forEach((k) => { if (/^[is]\d+$/.test(k) && t[k] === true) clean[k] = true; });
      out[id] = clean;
    });
  }
  cook = out;
  return cook;
}
const saveCook = () => store.set('pd.cook', cook);

// Recipes for a meal option name, filtered by the user's diet.
function recipesFor(name) {
  return RECIPES.filter((r) => r.match.test(name) && recipeAllowed(r));
}
function recipeAllowed(r) {
  if (settings.diet === 'veg') return r.type === 'veg';
  if (settings.diet === 'egg') return r.type !== 'nonveg';
  return true;
}

function recipeHtml(r, list) {
  const L = typeLetters();
  const ticks = loadCook()[r.id] || {};
  const letters = L.length ? L : ['V', 'P', 'K'];
  const adjust = letters.map((k) => `<li><strong>${DOSHA_NAMES[k]}:</strong> ${esc(r.adjust[k])}</li>`).join('');
  const check = (key, text) => `<li><label class="cook-check"><input type="checkbox" data-cook="${key}"${ticks[key] ? ' checked' : ''}><span>${esc(text)}</span></label></li>`;
  const done = Object.keys(ticks).length, total = r.ing.length + r.steps.length;
  const tabs = list.length > 1
    ? `<div class="chips" role="group" aria-label="Recipes in this meal">${list.map((x) => `<button class="chip${x.id === r.id ? ' on' : ''}" data-recipe-go="${x.id}" aria-pressed="${x.id === r.id}">${esc(x.name)}</button>`).join('')}</div>`
    : '';
  return `<div class="card stack" data-recipe-panel="${r.id}">
    ${tabs}
    <h2 class="card-title recipe-title">${esc(r.name)}</h2>
    <p class="small muted">Serves 2 · ${esc(r.time)}</p>
    <div class="recipe-adjust">
      <p class="card-title">${L.length ? 'Spices for your dosha (' + letters.map((k) => DOSHA_NAMES[k]).join('–') + ')' : 'Spices by dosha'}</p>
      <ul>${adjust}</ul>
      ${L.length ? '' : '<button class="btn ghost" type="button" data-recipe-quiz>Find your dosha (quiz)</button>'}
    </div>
    <div><p class="card-title">Ingredients</p><ul class="cook-list">${r.ing.map((x, i) => check('i' + i, x)).join('')}</ul></div>
    <div><p class="card-title">Steps</p><ol class="cook-list">${r.steps.map((x, i) => check('s' + i, (i + 1) + '. ' + x)).join('')}</ol></div>
    <p class="small muted" data-cook-count>${done} of ${total} ticked</p>
    <div class="btn-row">
      <button class="btn" type="button" data-cook-clear>Clear ticks</button>
      <button class="btn primary" type="button" data-recipe-close>Close</button>
    </div>
    <p class="small muted">Spice changes follow traditional Ayurvedic guidance. Not medical advice.</p>
  </div>`;
}

function openRecipes(list, id) {
  if (!list.length) return;
  const r = list.find((x) => x.id === id) || list[0];
  openOverlay(recipeHtml(r, list));
  const ov = $('#overlay'), panel = ov.querySelector('.overlay-panel');
  panel.scrollTop = 0;
  panel.onclick = (e) => {
    const go = e.target.closest('[data-recipe-go]');
    if (go) { openRecipes(list, go.dataset.recipeGo); return; }
    if (e.target.closest('[data-recipe-close]')) { closeOverlay(); return; }
    if (e.target.closest('[data-cook-clear]')) { delete cook[r.id]; saveCook(); openRecipes(list, r.id); toast('Ticks cleared.'); return; }
    if (e.target.closest('[data-recipe-quiz]')) { closeOverlay(); startQuiz(() => render('today')); }
  };
  ov.onchange = (e) => {
    const c = e.target.closest('[data-cook]');
    if (!c) return;
    const t = cook[r.id] || (cook[r.id] = {});
    if (c.checked) t[c.dataset.cook] = true; else delete t[c.dataset.cook];
    if (!Object.keys(t).length) delete cook[r.id];
    saveCook();
    const n = panel.querySelector('[data-cook-count]');
    if (n) n.textContent = `${Object.keys(cook[r.id] || {}).length} of ${r.ing.length + r.steps.length} ticked`;
  };
}

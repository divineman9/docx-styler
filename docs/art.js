/* Vedic Lifestyle Diet — art.js
   Inline SVG illustrations as template-literal strings.
   Line art: currentColor strokes, flat fills from CSS colour tokens. */
const ART = {

/* Wide hero scene: sun, birds, huts, banyan, fields, pot. */
village: `
<svg viewBox="0 0 360 150" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <g class="sun">
    <circle cx="292" cy="44" r="14" fill="var(--turmeric)" stroke="none"/>
    <path d="M292 18v-8M292 70v8M266 44h-8M326 44h8M274 26l-6-6M310 26l6-6M274 62l-6 6M310 62l6 6"/>
    <path d="M292 30v-6M292 58v6M278 44h-6M306 44h6"/>
  </g>
  <g class="birds">
    <path d="M60 30q4-6 8 0q4-6 8 0M92 22q3-5 6 0q3-5 6 0"/>
  </g>
  <g class="field">
    <path d="M10 130q60-14 120 0t120 0q50-10 100 0"/>
    <path d="M40 138h40M110 136h50M210 138h44M280 136h40"/>
    <path d="M30 122q14-8 28 0M150 118q14-8 28 0M250 120q14-8 28 0"/>
  </g>
  <g>
    <path d="M38 116v-26l18-12 18 12v26"/>
    <path d="M32 90q24-20 48 0"/>
    <path d="M28 116h52M44 116v-12h10v12M60 116v-12"/>
  </g>
  <g>
    <path d="M150 128v-14l12-9 12 9v14"/>
    <path d="M146 104q16-14 32 0"/>
    <path d="M142 128h40"/>
    <path d="M154 128v-8h6v8M166 128v-8h6v8"/>
  </g>
  <path d="M232 128v-40" />
  <path d="M232 100c-14-2-22 6-26 16M232 108c14-2 22 6 26 16M232 92c-8-8-6-18 0-24"/>
  <path d="M206 128c8-12 12-26 26-40 14 14 18 28 26 40"/>
  <path d="M232 128v14M224 142h16"/>
  <path d="M98 128c1-8 5-12 5-12s4 4 5 12c0 4-2 7-5 7s-5-3-5-7z"/>
  <path d="M108 118c3-2 6-1 8 1c-3 1-6 1-8-1z" fill="var(--neem)" stroke="none"/>
</svg>`,

banyan: `
<svg viewBox="0 0 120 100" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M60 96V56"/>
  <path d="M60 66c-12-1-18 5-22 13M60 74c12-1 18 5 22 13"/>
  <path d="M60 60c-22-2-34 14-38 30M60 60c22-2 34 14 38 30M60 54c-8-10-6-22 0-30M60 50c4 4 14 4 18 0M60 50c-4 4-14 4-18 0"/>
  <path d="M22 92h76"/>
  <path d="M46 92v-8h6v8M68 92v-8h6v8"/>
  <path d="M30 40c6-2 10 0 12 4-6 2-10 0-12-4zM90 40c-6-2-10 0-12 4 6 2 10 0 12-4z" fill="var(--forest)" stroke="none"/>
</svg>`,

pot: `
<svg viewBox="0 0 80 90" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M26 34h28c0 4-1 7-1 7 8 6 10 14 8 22c-2 10-12 16-21 16s-19-6-21-16c-2-8 0-16 8-22c0 0-1-3-1-7z" fill="var(--clay)" fill-opacity="0.25"/>
  <path d="M22 34h36"/>
  <path d="M28 26c4-2 20-2 24 0"/>
  <path d="M36 50c4 3 8 3 12 0"/>
  <path d="M40 26v-8" stroke="var(--neem)"/>
  <path d="M40 20c-6-6-14-6-18-2 6 4 12 5 18 2zM40 20c6-6 14-6 18-2-6 4-12 5-18 2z" fill="var(--neem)" stroke="var(--neem)" stroke-width="1.5"/>
</svg>`,

lamp: `
<svg viewBox="0 0 80 70" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 52c0-8 10-14 22-14s22 6 22 14c0 6-10 10-22 10s-22-4-22-10z" fill="var(--turmeric)" fill-opacity="0.2"/>
  <path d="M18 52h44"/>
  <path d="M24 48c-2 4-2 8 0 10M56 48c2 4 2 8 0 10"/>
  <path d="M32 44c2-4 12-4 14 0"/>
  <path class="flame" d="M40 34c-6-6-4-14 0-20c4 6 6 14 0 20z" fill="var(--clay)" stroke="var(--clay)" stroke-width="1.5"/>
  <path d="M40 30c-2-3-1-7 0-9" stroke="var(--turmeric)" stroke-width="1.5"/>
</svg>`,

leaf: `
<svg viewBox="0 0 60 60" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M50 10C30 10 12 22 10 48c26-2 38-20 40-38z" fill="var(--neem)" fill-opacity="0.2"/>
  <path d="M12 46C20 34 32 22 48 12"/>
  <path d="M22 36l8 2M30 28l8 2M38 20l7 2M18 42l6 4" stroke-width="1.5"/>
</svg>`,

flame: `
<svg viewBox="0 0 40 60" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path class="flame" d="M20 54c-9 0-14-6-14-13c0-10 8-14 10-24c2 6 5 8 8 12c3 4 5 8 5 12c0 7-4 13-9 13z" fill="var(--clay)" fill-opacity="0.25"/>
  <path d="M20 48c-4 0-7-3-7-7c0-5 4-8 7-13c3 5 7 8 7 13c0 4-3 7-7 7z" fill="var(--turmeric)" fill-opacity="0.6" stroke="none"/>
</svg>`,

wind: `
<svg viewBox="0 0 120 60" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 22h60c8 0 12-4 12-9s-5-8-9-8c-4 0-7 3-7 7"/>
  <path d="M14 34h74c7 0 12 4 12 9s-5 9-10 9c-4 0-8-3-8-8"/>
  <path d="M8 46h36"/>
</svg>`,

lotus: `
<svg viewBox="0 0 80 64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M40 12c5 8 7 16 5 24c-3 0-7 0-10 0c-2-8 0-16 5-24z" fill="var(--turmeric)" fill-opacity="0.3"/>
  <path d="M18 20c8 2 15 7 19 16c-3 2-6 3-9 3c-8-3-12-11-10-19z"/>
  <path d="M62 20c-8 2-15 7-19 16c3 2 6 3 9 3c8-3 12-11 10-19z"/>
  <path d="M8 40c10 8 20 12 32 12s22-4 32-12c-9-2-19-2-32-2s-23 0-32 2z" fill="var(--forest)" fill-opacity="0.2"/>
  <path d="M6 46c11 8 22 12 34 12s23-4 34-12"/>
</svg>`,

kolam: `
<svg viewBox="0 0 300 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
  <g>
    <path d="M12 8q8-10 16 0q-8 10-16 0z" fill="var(--turmeric)" fill-opacity="0.4"/>
    <circle cx="48" cy="8" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M78 8q8-10 16 0q-8 10-16 0z" fill="var(--turmeric)" fill-opacity="0.4"/>
    <circle cx="114" cy="8" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M144 8q8-10 16 0q-8 10-16 0z" fill="var(--turmeric)" fill-opacity="0.4"/>
    <circle cx="180" cy="8" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M210 8q8-10 16 0q-8 10-16 0z" fill="var(--turmeric)" fill-opacity="0.4"/>
    <circle cx="246" cy="8" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M276 8q8-10 16 0q-8 10-16 0z" fill="var(--turmeric)" fill-opacity="0.4"/>
  </g>
</svg>`,

sun: `
<svg viewBox="0 0 60 60" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
  <circle cx="30" cy="30" r="10" fill="var(--turmeric)" fill-opacity="0.5"/>
  <path d="M30 8v7M30 45v7M8 30h7M45 30h7M15 15l5 5M40 40l5 5M15 45l5-5M40 20l5-5"/>
</svg>`,

grainLotus: `
<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <g class="halo detail"><circle cx="40" cy="24" r="17" stroke="var(--turmeric)" stroke-dasharray="2 5"/></g>
  <path d="M40 72 C32 62 32 52 40 44 C48 52 48 62 40 72 Z" fill="var(--turmeric)" fill-opacity=".3"/>
  <path d="M40 72 C28 70 18 62 16 52 C26 52 34 58 40 72 Z" fill="var(--forest)" fill-opacity=".12"/>
  <path d="M40 72 C52 70 62 62 64 52 C54 52 46 58 40 72 Z" fill="var(--forest)" fill-opacity=".12"/>
  <path d="M20 76 H60"/>
  <path d="M40 46 C38 38 42 30 40 14"/>
  <path d="M40 38 C46 34 52 34 56 30 C50 28 44 32 40 38 Z" fill="var(--forest)" fill-opacity=".2"/>
  <ellipse cx="35.5" cy="20" rx="2.2" ry="4.2" transform="rotate(-30 35.5 20)" fill="var(--paper)"/>
  <ellipse cx="35" cy="27" rx="2.2" ry="4.2" transform="rotate(-30 35 27)" fill="var(--clay)" fill-opacity=".6"/>
  <ellipse cx="36" cy="34" rx="2.2" ry="4.2" transform="rotate(-30 36 34)" fill="var(--paper)"/>
  <ellipse cx="44.5" cy="17" rx="2.2" ry="4.2" transform="rotate(30 44.5 17)" fill="var(--paper)"/>
  <ellipse cx="45" cy="24" rx="2.2" ry="4.2" transform="rotate(30 45 24)" fill="var(--clay)" fill-opacity=".6"/>
  <ellipse cx="44" cy="31" rx="2.2" ry="4.2" transform="rotate(30 44 31)" fill="var(--paper)"/>
  <ellipse cx="40" cy="11" rx="2.2" ry="4.2" fill="var(--paper)"/>
</svg>`,

grainLotusMark: `
<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M40 72 C32 62 32 52 40 44 C48 52 48 62 40 72 Z" fill="var(--turmeric)" fill-opacity=".3"/>
  <path d="M40 72 C28 70 18 62 16 52 C26 52 34 58 40 72 Z" fill="var(--forest)" fill-opacity=".12"/>
  <path d="M40 72 C52 70 62 62 64 52 C54 52 46 58 40 72 Z" fill="var(--forest)" fill-opacity=".12"/>
  <path d="M40 46 C38 38 42 30 40 14"/>
  <ellipse cx="35.5" cy="21" rx="2.2" ry="4.2" transform="rotate(-30 35.5 21)"/>
  <ellipse cx="36" cy="31" rx="2.2" ry="4.2" transform="rotate(-30 36 31)"/>
  <ellipse cx="44.5" cy="18" rx="2.2" ry="4.2" transform="rotate(30 44.5 18)"/>
  <ellipse cx="44" cy="28" rx="2.2" ry="4.2" transform="rotate(30 44 28)"/>
  <ellipse cx="40" cy="12" rx="2.2" ry="4.2"/>
</svg>`,

iconToday: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 16a6 6 0 0 1 12 0"/>
  <path d="M12 4v2M4.5 8.5l1.4 1.4M19.5 8.5l-1.4 1.4"/>
  <path d="M3 16h18"/>
  <path d="M6 20h12"/>
</svg>`,

iconFoods: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h16a8 4.5 0 0 1-16 0z" fill="var(--turmeric)" fill-opacity="0.25"/>
  <path d="M4 12a8 4.5 0 0 0 16 0"/>
  <path d="M13 8c3 0 6-1.5 7-4c-4 0-7 .5-7 4z" fill="var(--neem)" fill-opacity="0.4"/>
  <path d="M13 8c0-2 1.5-4 4-5"/>
</svg>`,

iconLearn: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 5c2-1.5 4-1.5 7 0v14c-3-1.5-5-1.5-7 0z" fill="var(--paper)"/>
  <path d="M19 5c-2-1.5-4-1.5-7 0v14c3-1.5 5-1.5 7 0z"/>
  <path d="M8 8l2 1M8 11l2 1M16 8l-2 1M16 11l-2 1"/>
</svg>`,

iconProgress: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 21v-8"/>
  <path d="M12 13c0-4-2-6-6-7c0 5 2 7 6 7z" fill="var(--neem)" fill-opacity="0.4"/>
  <path d="M12 13c0-4 2-6 6-7c0 5-2 7-6 7z"/>
  <path d="M12 16c-2 0-4 1-4 3M12 18c2 0 4 1 4 3" stroke-width="1.5"/>
</svg>`,

iconMe: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="9" r="3.5"/>
  <path d="M5 20c1-4 3.5-6 7-6s6 2 7 6"/>
  <path d="M12 2a7 7 0 0 1 7 7" stroke="var(--turmeric)" stroke-dasharray="2 3"/>
</svg>`,

fRice: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22V10"/>
  <path d="M12 10c-3-1-5-3-6-7c4 1 6 3 6 7zM12 10c3-1 5-3 6-7c-4 1-6 3-6 7z"/>
  <path d="M12 15c-2-.5-3.5-2-4-4.5M12 15c2-.5 3.5-2 4-4.5M12 19c-2-.5-3.5-2-4-4.5M12 19c2-.5 3.5-2 4-4.5" stroke-width="1.5"/>
</svg>`,

fMillet: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22V8"/>
  <path d="M12 8V3"/>
  <path d="M12 6L8 4M12 6l4-2M12 9L8 7M12 9l4-2M12 12l-4-2M12 12l4-2M12 15l-4-2M12 15l4-2" stroke-width="1.5"/>
  <circle cx="7.5" cy="5" r="1" fill="currentColor" stroke="none"/>
  <circle cx="16.5" cy="5" r="1" fill="currentColor" stroke="none"/>
</svg>`,

fDal: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 13h16a8 4.5 0 0 1-16 0z" fill="var(--turmeric)" fill-opacity="0.25"/>
  <path d="M4 13a8 4.5 0 0 0 16 0"/>
  <path d="M9 13l-1.5 2M13 13l-1 2M16 13l-1.5 2" stroke-width="1.5"/>
</svg>`,

fLeafy: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22V9"/>
  <path d="M12 11C6 11 4 8 4 4c5 0 8 2 8 7z" fill="var(--neem)" fill-opacity="0.3"/>
  <path d="M12 13c6 0 8-3 8-7c-5 0-8 2-8 7z"/>
  <path d="M12 11L5 6M12 13l7-5" stroke-width="1.2"/>
</svg>`,

fVeg: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 8C12 5 13 3 15 2c0 2-1 4-2 5c2-1 5-1 6 1c-2 1-4 1-6 0"/>
  <path d="M12 8c-4 1-7 5-7 8c0 4 3 6 7 6s7-2 7-6c0-3-3-7-7-8z" fill="var(--neem)" fill-opacity="0.2"/>
  <path d="M12 10v10" stroke-width="1.5"/>
</svg>`,

fFruit: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 7C8 4 3 6 3 12c0 6 4 10 9 10s9-4 9-10c0-6-5-8-9-5z" fill="var(--turmeric)" fill-opacity="0.3"/>
  <path d="M12 7V4"/>
  <path d="M12 4c2-2 5-2 7-1c-1 2-4 3-7 1z" fill="var(--neem)" fill-opacity="0.4"/>
  <path d="M9 13c-1 1-1 3 0 4" stroke-width="1.5"/>
</svg>`,

fNuts: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7 5C4 7 4 14 7 18c3 2 6 1 7-1c1-4-1-11-4-13c-1-1-2 0-3 1z" fill="var(--clay)" fill-opacity="0.2"/>
  <path d="M8 6c-1 4-1 8 1 11" stroke-width="1.5"/>
  <path d="M17 15c-2 1-2 4 0 5s4 0 4-2c0-3-2-4-4-3z"/>
</svg>`,

fDairy: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 6h8c-1 2-1 2 0 4c2 2 3 4 3 6c0 3-3 5-7 5s-7-2-7-5c0-2 1-4 3-6c1-2 1-2 0-4z" fill="var(--clay)" fill-opacity="0.25"/>
  <path d="M6 6h12"/>
  <path d="M12 3v2"/>
  <path d="M10 13c1 1 3 1 4 0" stroke-width="1.5"/>
  <path d="M12 21v1.5" stroke-width="1.5"/>
</svg>`,

fGhee: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 16c0 3 3 4 7 4s7-1 7-4c0-2-3-3-7-3s-7 1-7 3z" fill="var(--turmeric)" fill-opacity="0.2"/>
  <path d="M5 16h14"/>
  <path class="flame" d="M12 11c-2-2-2-5 0-7c2 2 2 5 0 7z" fill="var(--clay)"/>
  <path d="M12 9c-.5-1-.5-2 0-3" stroke-width="1.2"/>
</svg>`,

fSpice: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 12h12c0 4-2 7-6 7s-6-3-6-7z" fill="var(--clay)" fill-opacity="0.2"/>
  <path d="M4 12h16"/>
  <path d="M8 8L15 2l3 3l-7 6c-1 1-3 0-3-1s0-2 0-2z"/>
</svg>`,

fSweet: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 9h12l2 11H4z" fill="var(--turmeric)" fill-opacity="0.25"/>
  <path d="M6 9l2-4h8l2 4"/>
  <path d="M9 13l6 4M15 13l-6 4M12 12v6" stroke-width="1.2"/>
</svg>`,

fDrink: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7 8h10l-1.5 13h-7z"/>
  <path d="M6 8h12"/>
  <path d="M9 5c0-1 1-1 1-2M13 5c0-1 1-1 1-2" stroke-width="1.2"/>
</svg>`,

fEgg: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2C8 2 6 9 6 14a6 6 0 0 0 12 0c0-5-2-12-6-12z" fill="var(--paper)"/>
  <path d="M9 10c-1 2-1 4 0 6" stroke-width="1.2"/>
</svg>`,

fFish: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 12c3-4 7-5 11-5c3 3 3 7 0 10c-4 0-8-1-11-5z" fill="var(--turmeric)" fill-opacity="0.2"/>
  <path d="M14 7l5-3l-1 5l1 5l-5 3"/>
  <circle cx="8" cy="11" r="0.8" fill="currentColor" stroke="none"/>
  <path d="M10 9c1 2 1 4 0 6" stroke-width="1.2"/>
</svg>`,

fMeat: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10" cy="9" r="5" fill="var(--turmeric)" fill-opacity="0.2"/>
  <path d="M13.5 12.5L20 19"/>
  <path d="M10 6.5c-1.5 0-2.5 1-2.5 2.5" stroke-width="1.2"/>
  <path d="M13 5c1-1.5 3-2 4.5-1c1 .7 1.3 2 .8 3"/>
</svg>`,

fCoconut: `
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="14" r="7" fill="var(--clay)" fill-opacity="0.2"/>
  <circle cx="11" cy="14" r="3.5"/>
  <path d="M13 11l7-7"/>
  <path d="M20 4l-1.5.5M20 4l-.5 1.5" stroke-width="1.2"/>
</svg>`
};

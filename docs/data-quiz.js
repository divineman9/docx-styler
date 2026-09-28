// data-quiz.js — QUIZ, QUIZ_INTRO, TYPES, scoreQuiz
// Plain browser JS. No modules.

const QUIZ_INTRO = "Think about how you have been for most of your life, not just recently.";

const QUIZ = [
  { q: 'How would you describe your body frame?', a: [
    { t: 'Thin, light, hard to gain weight', d: 'V' },
    { t: 'Medium, muscular', d: 'P' },
    { t: 'Broad, solid, gain weight easily', d: 'K' } ] },
  { q: 'How does your weight usually behave?', a: [
    { t: 'Solid build, weight stays or rises easily', d: 'K' },
    { t: 'Loses weight quickly when stressed or busy', d: 'V' },
    { t: 'Stays fairly steady at a medium level', d: 'P' } ] },
  { q: 'How is your skin most of the time?', a: [
    { t: 'Oily or moist, cool to touch', d: 'K' },
    { t: 'Dry, rough, especially in winter', d: 'V' },
    { t: 'Warm, easily flushed or prone to rashes', d: 'P' } ] },
  { q: 'How are your hair and scalp?', a: [
    { t: 'Fine, dry, frizzy or thinning', d: 'V' },
    { t: 'Oily scalp, thick, shiny hair', d: 'K' },
    { t: 'Fine, soft, early thinning or greying', d: 'P' } ] },
  { q: 'How is your appetite?', a: [
    { t: 'Irregular — hungry sometimes, forgets to eat', d: 'V' },
    { t: 'Sharp — very hungry on time, irritable if late', d: 'P' },
    { t: 'Steady but can skip meals comfortably', d: 'K' } ] },
  { q: 'How is your digestion most days?', a: [
    { t: 'Strong; can digest almost anything', d: 'P' },
    { t: 'Variable — gas, bloating or loose motions at times', d: 'V' },
    { t: 'Slow; feels full long after eating', d: 'K' } ] },
  { q: 'How much water do you usually need?', a: [
    { t: 'Variable thirst, often forgets to drink', d: 'V' },
    { t: 'Strong, frequent thirst', d: 'P' },
    { t: 'Low thirst, drinks little', d: 'K' } ] },
  { q: 'How is your sleep?', a: [
    { t: 'Deep and long; hard to wake up early', d: 'K' },
    { t: 'Light, broken; mind busy at night', d: 'V' },
    { t: 'Sound, moderate, wakes fresh', d: 'P' } ] },
  { q: 'Which weather suits you best?', a: [
    { t: 'Warm weather; dislikes cold and wind', d: 'V' },
    { t: 'Cool weather; struggles in heat', d: 'P' },
    { t: 'Warm, dry weather; dislikes damp and cold', d: 'K' } ] },
  { q: 'How is your sweat?', a: [
    { t: 'Little sweat, even in heat', d: 'V' },
    { t: 'Heavy sweat, easily, with a strong smell', d: 'P' },
    { t: 'Moderate sweat, cool and not much smell', d: 'K' } ] },
  { q: 'How do you usually speak?', a: [
    { t: 'Fast, talkative, jumps between topics', d: 'V' },
    { t: 'Clear, sharp, to the point', d: 'P' },
    { t: 'Slow, steady, few words', d: 'K' } ] },
  { q: 'How is your natural pace of activity?', a: [
    { t: 'Quick and energetic in bursts, tires easily', d: 'V' },
    { t: 'Steady, purposeful, good stamina', d: 'P' },
    { t: 'Slow and steady, prefers to take it easy', d: 'K' } ] },
  { q: 'How is your memory?', a: [
    { t: 'Learns fast, forgets fast', d: 'V' },
    { t: 'Sharp and clear, remembers well', d: 'P' },
    { t: 'Learns slowly, remembers for long', d: 'K' } ] },
  { q: 'How do you behave under stress?', a: [
    { t: 'Worried, anxious, overthinks', d: 'V' },
    { t: 'Irritable, short-tempered, impatient', d: 'P' },
    { t: 'Calm, quiet, withdraws or eats more', d: 'K' } ] },
  { q: 'How do you usually make decisions?', a: [
    { t: 'Steady and careful, takes time', d: 'K' },
    { t: 'Quickly, changes mind often', d: 'V' },
    { t: 'Quickly and firmly, with clear reasoning', d: 'P' } ] }
];

const TYPES = {
  V: {
    name: 'Vata',
    tagline: 'Light, quick, airy energy',
    summary: 'You are likely quick, creative and light on your feet. Ayurveda suggests keeping warm, oily and regular habits to steady this airy nature. Warm meals and gentle routines may help you feel your best.',
    eatMore: ['Warm cooked foods like khichdi or dal-rice', 'Ghee, sesame oil and healthy fats', 'Sour and salty tastes in moderation'],
    eatLess: ['Raw salads and cold food straight from the fridge', 'Excess bitter, dry snacks like chips and crackers', 'Carbonated drinks'],
    routine: ['Eat and sleep at the same times every day', 'Keep warm, especially in wind and cold weather', 'Do steady, gentle exercise — never to exhaustion']
  },
  P: {
    name: 'Pitta',
    tagline: 'Sharp, warm, driven strength',
    summary: 'You are likely focused, capable and full of warm drive. Ayurveda suggests cooling foods and a calm pace to keep this fire balanced. Cooling meals and time to unwind may help you stay sharp without burning out.',
    eatMore: ['Cooling foods like cucumber, coconut water and ghee', 'Sweet, bitter and astringent tastes', 'Sweet ripe fruits like grapes and pomegranate'],
    eatLess: ['Very spicy, hot and fried food', 'Sour fermented foods and excess salt', 'Coffee and alcohol in excess'],
    routine: ['Avoid heavy exercise and sun in the hot midday', 'Eat on time — do not skip meals', 'Make time for cooling walks and calm evenings']
  },
  K: {
    name: 'Kapha',
    tagline: 'Steady, calm, solid ground',
    summary: 'You are likely calm, strong and wonderfully steady. Ayurveda suggests light, warm foods and movement to keep this earthy nature from feeling heavy. Early rising and lively activity may help you feel light and clear.',
    eatMore: ['Light warm foods like millets, barley and moong dal', 'Pungent, bitter and astringent tastes like ginger and greens', 'Honey (in small amounts, never heated)'],
    eatLess: ['Heavy sweets, fried snacks and oily food', 'Curd, cheese and cold dairy in excess', 'Daytime sleeping after big meals'],
    routine: ['Wake early and move — vigorous morning exercise', 'Eat your main meal at noon, keep dinner light', 'Prefer warm, dry and light surroundings']
  },
  VP: {
    name: 'Vata-Pitta',
    tagline: 'Quick mind, warm drive',
    summary: 'You are likely quick-thinking with plenty of warm drive. Ayurveda suggests keeping cool and grounded at the same time — regular meals matter most for you. Warm but not spicy food and steady routines may help you shine.',
    eatMore: ['Cooling but cooked foods like lauki and moong dal', 'Ghee and coconut in cooking', 'Sweet mango'],
    eatLess: ['Very spicy, sour and fermented food', 'Raw salads, chips and dry snacks', 'Coffee, tea and alcohol in excess'],
    routine: ['Keep meal and sleep times very regular', 'Exercise gently and steadily, avoid midday heat', 'Take short breaks to breathe when work gets intense']
  },
  PK: {
    name: 'Pitta-Kapha',
    tagline: 'Strong build, steady fire',
    summary: 'You are likely strong with solid stamina and a warm, capable nature. Ayurveda suggests keeping meals light and cool so the fire stays steady without heaviness. Daily movement may help you feel light and clear.',
    eatMore: ['Bitter greens, lauki, ash gourd and barley', 'Sweet pomegranate and coconut water', 'Light dals like moong and toor'],
    eatLess: ['Fried, oily and very spicy food', 'Heavy sweets, cheese and cold desserts', 'Excess salt and sour foods'],
    routine: ['Do lively exercise in the cool morning', 'Keep dinner light and early', 'Take a calm evening walk to cool the mind']
  },
  VK: {
    name: 'Vata-Kapha',
    tagline: 'Gentle energy, solid calm',
    summary: 'You are likely gentle and steady, with a calm strength underneath. Ayurveda suggests warm, light and slightly spicy food to lift both dryness and heaviness. Daily movement and warmth may help you feel light and settled.',
    eatMore: ['Warm spiced foods like ginger, cumin and pepper in dal', 'Cooked vegetables and old rice', 'Honey in small amounts (never heated)'],
    eatLess: ['Cold, raw and refrigerated food', 'Heavy sweets, curd and fried snacks', 'Excess salty and sour tastes'],
    routine: ['Wake early and walk daily', 'Eat warm meals at fixed times', 'Stay warm and dry, avoid daytime naps']
  },
  VPK: {
    name: 'Tridoshic (Vata-Pitta-Kapha)',
    tagline: 'Balanced in all three energies',
    summary: 'Your answers suggest a fairly even blend of all three energies, which is a lovely balance. Ayurveda suggests mainly eating by the season and keeping regular habits. Small seasonal adjustments may help you keep this natural harmony.',
    eatMore: ['Seasonal fresh fruits and vegetables, cooked simply', 'Ghee, moong dal and old rice as everyday staples', 'Mild spices like cumin, coriander and turmeric'],
    eatLess: ['Very spicy or very cold food', 'Deep-fried and heavily sweet items', 'Large late-night meals'],
    routine: ['Follow regular meal and sleep times through the year', 'Eat lighter in spring, warmer in winter', 'Enjoy daily walks and gentle strength work']
  }
};

function scoreQuiz(answers) {
  var counts = { V: 0, P: 0, K: 0 };
  var total = 0;
  if (Array.isArray(answers)) {
    for (var i = 0; i < answers.length; i++) {
      var a = answers[i];
      if (a === 'V' || a === 'P' || a === 'K') {
        counts[a]++;
        total++;
      }
    }
  }
  var pct = { V: 0, P: 0, K: 0 };
  if (total > 0) {
    // integer percentages summing to 100
    var raw = {};
    var letters = ['V', 'P', 'K'];
    var sumFloor = 0;
    for (var j = 0; j < 3; j++) {
      var L = letters[j];
      raw[L] = (counts[L] * 100) / total;
      pct[L] = Math.floor(raw[L]);
      sumFloor += pct[L];
    }
    // distribute the remainder to the largest fractional parts
    var rem = 100 - sumFloor;
    var order = letters.slice().sort(function (x, y) {
      var fx = raw[x] - Math.floor(raw[x]);
      var fy = raw[y] - Math.floor(raw[y]);
      if (fy !== fx) return fy - fx;
      return counts[y] - counts[x];
    });
    var r = 0;
    while (rem > 0 && order.length) {
      pct[order[r % order.length]]++;
      rem--;
      r++;
    }
  }
  var type = 'VPK';
  if (total > 0) {
    var sorted = letters.slice().sort(function (x, y) {
      if (pct[y] !== pct[x]) return pct[y] - pct[x];
      return counts[y] - counts[x];
    });
    var top = pct[sorted[0]], second = pct[sorted[1]], third = pct[sorted[2]];
    if (top - second >= 15) {
      type = sorted[0];
    } else if (second - third >= 10) {
      // dual: letters ordered V, P, K
      var dual = sorted.slice(0, 2);
      type = ['V', 'P', 'K'].filter(function (L) { return dual.indexOf(L) !== -1; }).join('');
    } else {
      type = 'VPK';
    }
  }
  return { counts: counts, pct: pct, type: type };
}

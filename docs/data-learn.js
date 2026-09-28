/* data-learn.js — Learn content: doshas, viruddha ahara, sources, disclaimer.
   Educational only; all claims are traditional, not medical advice. */

const DISCLAIMER = 'Vedic Lifestyle Diet shares traditional Ayurvedic food wisdom for education. It is not medical advice, diagnosis or treatment. If you are pregnant, have diabetes, high BP, kidney, heart or thyroid conditions, allergies or take regular medicines, talk to your doctor before changing your diet. Never stop or change prescribed medicines because of this app.';

const DOSHAS = {
  V: {
    name: 'Vata',
    element: 'Air + Space',
    symbol: 'wind',
    qualities: ['Dry', 'Light', 'Cold', 'Rough', 'Mobile'],
    balanced: [
      'Quick, creative mind full of ideas',
      'Light and energetic body that moves easily',
      'Enthusiastic and cheerful mood',
      'Regular sleep and easy mornings when in rhythm'
    ],
    imbalanced: [
      'Feeling restless, anxious or worried',
      'Dry skin, dry lips or cracking joints',
      'Constipation, gas or bloating',
      'Light, broken or disturbed sleep',
      'Tiredness that comes in waves'
    ],
    tastesFavour: ['Sweet', 'Sour', 'Salty'],
    tastesReduce: ['Bitter', 'Pungent', 'Astringent'],
    routine: [
      'Eat warm, freshly cooked meals at fixed times',
      'Sip warm water through the day instead of cold drinks',
      'Massage the body with warm sesame oil weekly',
      'Keep a steady bedtime; rest before 10 pm',
      'Choose steady, gentle exercise — not exhausting workouts'
    ],
    season: 'Vata tends to rise in late autumn and early winter, and in cold, dry, windy weather.'
  },
  P: {
    name: 'Pitta',
    element: 'Fire + Water',
    symbol: 'flame',
    qualities: ['Hot', 'Sharp', 'Light', 'Oily', 'Spreading'],
    balanced: [
      'Strong digestion and steady appetite',
      'Sharp thinking and clear focus',
      'Warm, confident and courageous nature',
      'Comfortable cool skin and steady energy'
    ],
    imbalanced: [
      'Extra heat — burning sensation, acidity or heartburn',
      'Skin rashes, redness or inflammation',
      'Irritability, impatience or short temper',
      'Loose motions or urgent digestion',
      'Excess sweat and discomfort in heat'
    ],
    tastesFavour: ['Sweet', 'Bitter', 'Astringent'],
    tastesReduce: ['Pungent', 'Sour', 'Salty'],
    routine: [
      'Eat on time; never skip lunch, the main meal',
      'Favour cooling foods — cucumber, coconut water, ghee',
      'Reduce chilli, fried food and fermented sour items',
      'Avoid the midday sun and heavy exercise at noon',
      'Walk in moonlight or near water to cool the mind'
    ],
    season: 'Pitta tends to rise in summer and in hot, humid weather.'
  },
  K: {
    name: 'Kapha',
    element: 'Earth + Water',
    symbol: 'leaf',
    qualities: ['Heavy', 'Slow', 'Cool', 'Oily', 'Stable'],
    balanced: [
      'Strong, sturdy body with good stamina',
      'Calm, patient and caring nature',
      'Deep, restful sleep',
      'Smooth skin and steady immunity'
    ],
    imbalanced: [
      'Feeling heavy, sleepy or dull after eating',
      'Weight gain that is hard to shed',
      'Excess mucus, cold or chest congestion',
      'Slow digestion and low appetite',
      'Feeling lazy, clingy or low in mood'
    ],
    tastesFavour: ['Pungent', 'Bitter', 'Astringent'],
    tastesReduce: ['Sweet', 'Sour', 'Salty'],
    routine: [
      'Wake early, before sunrise, and start moving',
      'Do vigorous exercise in the morning — brisk walk, yoga',
      'Prefer warm, light, spiced food over cold and oily',
      'Keep dinner light and early; skip late-night snacking',
      'Use ginger, black pepper and turmeric generously in cooking'
    ],
    season: 'Kapha tends to rise in late winter and spring, in cold, damp weather.'
  }
};

const VIRUDDHA = [
  { id: 'fish-milk', pair: 'Fish with milk', kind: 'Samyoga (combination)', concern: 'Classical texts say this pairing may disturb the blood and block the body\'s channels; traditionally linked with skin troubles.', source: 'Charaka Samhita, Sutrasthana 26.82-83', verified: true, instead: 'Keep milk and fish at separate meals, several hours apart.' },
  { id: 'honey-heated', pair: 'Heated or cooked honey', kind: 'Samskara (processing)', concern: 'Classical texts say honey heated above body warmth is traditionally considered harmful and may not suit the body.', source: 'Charaka Samhita, Sutrasthana 26.84', verified: true, instead: 'Add honey to warm — not hot — food and drinks, after they cool a little.' },
  { id: 'honey-ghee-equal', pair: 'Honey and ghee in equal quantity', kind: 'Matra (quantity)', concern: 'Classical texts say honey and ghee taken in equal parts by weight may be incompatible; the mixture is traditionally avoided.', source: 'Charaka Samhita, Sutrasthana 26.84', verified: true, instead: 'Use unequal proportions — more ghee with a little honey — or take them separately.' },
  { id: 'milk-sour-fruit', pair: 'Milk with sour fruits or sour items', kind: 'Virya (potency)', concern: 'Classical texts say milk combined with sour things may curdle inside and disturb digestion; a traditional concern.', source: 'Charaka Samhita, Sutrasthana 26.84', verified: true, instead: 'Keep milk and citrus fruits, tomatoes or tamarind dishes at separate times.' },
  { id: 'milk-after-radish-garlic', pair: 'Milk after radish or garlic', kind: 'Krama (sequence)', concern: 'Classical texts say taking milk soon after eating radish or garlic may be incompatible and traditionally disturbs digestion.', source: 'Charaka Samhita, Sutrasthana 26.84', verified: true, instead: 'Leave several hours between radish or garlic dishes and milk.' },
  { id: 'banana-milk', pair: 'Banana with milk', kind: 'Samyoga (combination)', concern: 'Traditional teaching says banana with milk is a heavy pairing that may slow digestion.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Take banana alone, and milk separately — at least an hour apart.' },
  { id: 'banana-curd', pair: 'Banana with curd or buttermilk', kind: 'Samyoga (combination)', concern: 'Traditionally said to be a heavy, conflicting mix that may cause sluggish digestion or cold complaints.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Eat banana fresh, and curd as plain curd rice with a pinch of ginger.' },
  { id: 'curd-night', pair: 'Curd at night', kind: 'Kala (time)', concern: 'Classical texts give rules for curd; traditionally curd at night is said to increase kapha and congestion.', source: 'Charaka Samhita, Sutrasthana 27 (rules for curd)', verified: false, instead: 'Keep curd for lunch; at dinner choose a warm dal or soup instead.' },
  { id: 'curd-heated', pair: 'Curd heated or cooked', kind: 'Samskara (processing)', concern: 'Traditional teaching says heated curd may not suit the body; warm curd dishes are classically discouraged.', source: 'Charaka Samhita, Sutrasthana 27 (rules for curd)', verified: false, instead: 'Use curd fresh and cool, or finish curd-based gravies gently without long boiling.' },
  { id: 'curd-fish-meat', pair: 'Curd with fish or meat', kind: 'Samyoga (combination)', concern: 'Traditionally said to be a conflicting pair that may disturb digestion; often discouraged in classical lists.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Serve fish or meat with light veg sides, not curd-based gravies.' },
  { id: 'milk-salt', pair: 'Milk with salt', kind: 'Samyoga (combination)', concern: 'Traditionally, salted milk dishes are said to be incompatible and may not agree with the channels of the body.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Enjoy milk plain or lightly sweetened; keep salty dishes separate.' },
  { id: 'honey-hot-water', pair: 'Honey in hot water or hot tea', kind: 'Samskara (processing)', concern: 'Because heating honey is classically discouraged, honey in very hot drinks is traditionally avoided.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Let the drink become warm to the touch, then stir in honey.' },
  { id: 'fruit-milkshake', pair: 'Fruit with milk (milkshakes)', kind: 'Samyoga (combination)', concern: 'Sweet ripe fruit with milk is traditionally considered heavy; sour fruit with milk is a stronger classical concern.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Try dates + warm milk instead of fruit milkshakes.' },
  { id: 'before-digestion', pair: 'Eating before the previous meal is digested', kind: 'Krama (sequence)', concern: 'Ayurveda suggests waiting for hunger to return; eating on top of an undigested meal may cause ama (heaviness).', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Wait for true hunger, or at least 3-4 hours between main meals.' },
  { id: 'cold-after-hot', pair: 'Cold water right after hot food or tea', kind: 'Krama (sequence)', concern: 'Classical texts say cold drinks after hot food may weaken the digestive fire; a traditional concern.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Sip warm or room-temperature water during and after meals.' },
  { id: 'leftover-reheated', pair: 'Leftover or repeatedly reheated food', kind: 'Kala (time)', concern: 'Traditionally, food kept long and reheated many times is said to lose its vitality and become heavy.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Cook fresh for the meal when possible; store leftovers chilled and reheat only once.' },
  { id: 'eating-not-hungry', pair: 'Eating when not hungry', kind: 'Vidhi (method)', concern: 'Ayurveda suggests eating only when the previous meal is digested and true hunger appears.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Pause, sip warm water, and eat when the body asks for food.' },
  { id: 'heavy-night-meal', pair: 'Very large meal at night', kind: 'Kala (time)', concern: 'Traditionally a heavy late dinner is said to cause sluggish digestion, poor sleep and morning dullness.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Make lunch the biggest meal; keep dinner light and early.' },
  { id: 'raw-with-cooked', pair: 'Mixing raw and cooked in the same meal (meal order)', kind: 'Krama (sequence)', concern: 'Traditional teaching says raw and cooked foods digest at different speeds; mixing freely may strain digestion.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Start with cooked warm food; have salad in small amounts in season, not as a full course.' },
  { id: 'ghee-bronze-vessel', pair: 'Ghee kept ten days in a bronze vessel', kind: 'Samskara (processing)', concern: 'Classical texts describe storing ghee in bronze or brass as incompatible; traditionally it may change the ghee\'s quality.', source: 'Charaka Samhita, Sutrasthana 26.84', verified: true, instead: 'Store ghee in steel, glass or clay containers.' },
  { id: 'milk-salt-dishes', pair: 'Milk-based salty gravies (creamy salted curries)', kind: 'Samyoga (combination)', concern: 'Traditionally, combining milk with salt and spices in cooking is said to make a heavy, mixed dish.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Use coconut or cashew paste for creamy gravies instead of milk.' },
  { id: 'curd-with-hot-foods', pair: 'Curd taken with very hot food', kind: 'Virya (potency)', concern: 'Traditional teaching says mixing very hot food with cold curd may confuse digestion.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Let hot food cool a little; take curd at room temperature alongside.' },
  { id: 'equal-oil-honey-baked', pair: 'Honey baked into hot dishes or sweets', kind: 'Samskara (processing)', concern: 'Because heated honey is classically discouraged, sweets baked with honey are traditionally questioned.', source: 'Traditional Ayurvedic teaching', verified: false, instead: 'Bake with jaggery or sugar; drizzle honey after cooling.' }
];

const VIRUDDHA_TYPES = [
  { name: 'Desha (Place)', meaning: 'Food unsuited to the place or climate where one lives.', example: 'Very dry, rough snacks in a dry, hot region like Rayalaseema.' },
  { name: 'Kala (Time)', meaning: 'Food unsuited to the season or time of day it is eaten.', example: 'Curd or cold drinks late at night in winter.' },
  { name: 'Agni (Digestive fire)', meaning: 'Food that is too heavy or too light for one\'s strength of digestion.', example: 'A heavy fried meal when appetite is weak after illness.' },
  { name: 'Matra (Quantity)', meaning: 'Wrong quantity — too much, too little, or a bad ratio of two items.', example: 'Honey and ghee mixed in equal quantity by weight.' },
  { name: 'Satmya (Habituation)', meaning: 'Food opposite to what one has been used to since childhood.', example: 'Suddenly switching to only raw salads after a lifetime of warm rice and dal.' },
  { name: 'Dosha (Constitution)', meaning: 'Food, remedy or treatment that aggravates rather than balances one\'s dosha.', example: 'Lots of chilli and fried snacks for a fiery Pitta person in summer.' },
  { name: 'Samskara (Processing)', meaning: 'Food changed by cooking, storing or preparing in a way that harms it.', example: 'Honey heated in hot tea, or ghee kept in a bronze vessel.' },
  { name: 'Virya (Potency)', meaning: 'Combining foods of opposing potency — heating with cooling.', example: 'Hot milk poured over cold sour fruit.' },
  { name: 'Koshtha (Bowel nature)', meaning: 'Food unsuited to whether one\'s digestion and bowels run loose or tight.', example: 'Too much rice and little fibre for someone with sluggish bowels.' },
  { name: 'Avastha (State)', meaning: 'Food unsuited to one\'s current state — after exercise, sleep, illness or travel.', example: 'A heavy meal right after a long journey or a gym session.' },
  { name: 'Krama (Sequence)', meaning: 'Eating things in the wrong order or without a proper gap.', example: 'Drinking milk immediately after eating radish or garlic.' },
  { name: 'Parihara (Avoidance)', meaning: 'Taking something opposite to what was just avoided or treated.', example: 'Eating cold items right after deliberately avoiding cold food for a week.' },
  { name: 'Upachara (Treatment clash)', meaning: 'Food or habit that contradicts an ongoing regimen or treatment.', example: 'Sour and fermented foods while following a light, bland Ayurvedic regimen.' },
  { name: 'Paka (Cooking)', meaning: 'Food that is improperly cooked — raw inside, burnt, or half-done.', example: 'Rotis cooked on a weak flame till hard, or dosa burnt black.' },
  { name: 'Samyoga (Combination)', meaning: 'Two wholesome foods that become harmful when combined.', example: 'Fish cooked in milk, or banana mixed with curd.' },
  { name: 'Hridya (Palatability)', meaning: 'Food that is unappealing or forced down against one\'s natural liking.', example: 'Eating disliked bitter gourd forcefully with a heavy heart.' },
  { name: 'Sampad (Quality of ingredients)', meaning: 'Using ingredients that are stale, poor quality or missing their best attributes.', example: 'Rancid old oil or stale, wilted vegetables bought at a discount.' },
  { name: 'Vidhi (Rules of eating)', meaning: 'Eating in the wrong manner — too fast, too much, at odd hours, or without attention.', example: 'Scrolling the phone and gulping food quickly at midnight.' }
];

const VIRUDDHA_TYPES_SOURCE = 'Charaka Samhita, Sutrasthana 26.86-101';

const SOURCES = [
  {
    title: 'Charaka Samhita',
    era: 'c. 2nd century BCE – 2nd century CE (compiled)',
    about: 'The great classical text of Ayurvedic care and daily living. Its Sutrasthana teaches how food, taste, season and habit shape health, and lists viruddha ahara — incompatible foods.',
    link: 'https://www.carakasamhitaonline.com'
  },
  {
    title: 'Sushruta Samhita',
    era: 'c. 6th century BCE – 1st century CE (compiled)',
    about: 'The classical text of surgery, also rich in diet wisdom. It describes the qualities of grains, meats, oils and drinks, and how food choices support recovery and strength.',
    link: 'https://niimh.nic.in/ebooks/esushruta/'
  },
  {
    title: 'Ashtanga Hridaya',
    era: 'c. 7th century CE (Vagbhata)',
    about: 'A compact verse summary of Charaka and Sushruta, loved for daily-routine guidance. It clearly explains dinacharya (daily routine) and rules of eating — warm food, mindful meals, right order.',
    link: ''
  },
  {
    title: 'Bhavaprakasha',
    era: 'c. 16th century CE (Bhavamishra)',
    about: 'A later dictionary of foods, herbs and kitchen ingredients from Indian daily life. It lists the taste, potency and traditional effect of everyday foods — from rice and ghee to spices and fruits.',
    link: ''
  },
  {
    title: 'Madhava Nidana',
    era: 'c. 8th–9th century CE (Madhavakara)',
    about: 'A classical text on understanding disease patterns through its causes and signs. It shows how diet and daily habits are traditionally traced as roots of imbalance.',
    link: 'https://niimh.nic.in/ebooks/'
  }
];

const DOSHA_INTRO = {
  title: 'Three energies, one you',
  intro: 'Ayurveda says everything in nature — and in you — is made of five elements: space, air, fire, water and earth. In the body they work as three energies called doshas.',
  doshas: [
    { key: 'V', name: 'Vata', element: 'Air + Space', role: 'Movement — breath, heartbeat, thoughts.', balanced: 'Lively, creative, quick.', excess: 'Dryness, restlessness, worry, gas.' },
    { key: 'P', name: 'Pitta', element: 'Fire + Water', role: 'Heat and digestion — hunger, sharp thinking.', balanced: 'Focused, warm, confident.', excess: 'Acidity, anger, feeling too hot.' },
    { key: 'K', name: 'Kapha', element: 'Earth + Water', role: 'Structure and calm — strength, steadiness.', balanced: 'Calm, loving, strong.', excess: 'Heaviness, sleepiness, congestion.' }
  ],
  outro: 'Everyone has all three, in a different mix. Your natural mix from birth is your prakriti — that is why the same food suits one person and not another. The quiz helps you find your likely mix.'
};

/* ---- Know your doshas (Vata · Pitta · Kapha) — verified by Fable 2026-09-28 ---- */

const DOSHA_GUIDE = [
  { key: 'V', name: 'Vata', sanskrit: 'वात', element: 'Air + Space', symbol: 'wind',
    oneLine: 'Vata is the wind in you — it moves, breathes, and carries every signal.',
    qualities: {
      list: ['Dry (ruksha)', 'Cold (sheeta)', 'Light (laghu)', 'Subtle (sukshma)', 'Moving (chala)', 'Clear, not slimy (vishada)', 'Rough (khara)'],
      ref: 'Charaka Samhita, Sutrasthana 1.59', verified: true },
    seats: { text: 'Mainly the large intestine; also the waist, thighs, ears, bones and skin.', ref: 'Ashtanga Hridaya, Sutrasthana 12', verified: false },
    jobs: ['Moves everything — breath, blood, food, nerves', 'Starts every action and thought', 'Carries speech, touch and hearing', 'Kindles the digestive fire', 'Pushes out waste on time'],
    balanced: ['Quick, creative mind full of ideas', 'Light body that moves easily', 'Regular bowels, easy mornings', 'Cheerful, enthusiastic mood'],
    tooMuch: ['Restless, worried or anxious', 'Dry skin, dry lips, cracking joints', 'Gas, bloating or constipation', 'Light, broken sleep', 'Cold hands and feet, tiredness in waves'],
    causes: ['Cold, dry, raw or leftover food', 'Skipping meals or eating on the run', 'Late nights, too little sleep', 'Constant travel, screens and noise', 'Cold, windy or dry weather'],
    whenItRises: { season: 'Grows in summer, rises most in the rainy season; eases in autumn.', timeOfDay: 'Late afternoon and the small hours before dawn.', lifeStage: 'Old age.', ref: 'Ashtanga Hridaya, Sutrasthana 1 and 3', verified: false },
    balance: {
      food: ['Warm, freshly cooked, lightly oiled meals', 'Soups, khichdi, cooked vegetables, stewed fruit', 'Ghee, sesame oil, warm milk', 'Sweet, sour and salty tastes in measure', 'Warm water or ginger-cumin tea, not iced drinks'],
      routine: ['Eat and sleep at fixed times every day', 'Warm sesame-oil massage before a bath', 'Keep warm; cover the ears in wind', 'Bed by 10 pm, wake with the sun'],
      exercise: ['Gentle yoga, walking, slow swimming', 'Avoid exhausting, irregular workouts'],
      mind: ['Slow belly breathing, five minutes, twice a day', 'Alternate-nostril breathing (Nadi Shodhana) for a steady mind']
    },
    tastes: { favour: ['Sweet', 'Sour', 'Salty'], reduce: ['Pungent', 'Bitter', 'Astringent'], ref: 'Ashtanga Hridaya, Sutrasthana 1', verified: false },
    tip: 'Wind settles with warmth and routine. Same meal times, same bedtime — that is Vata\'s best friend.'
  },
  { key: 'P', name: 'Pitta', sanskrit: 'पित्त', element: 'Fire + Water', symbol: 'flame',
    oneLine: 'Pitta is the fire in you — it digests, warms and sharpens.',
    qualities: {
      list: ['Slightly oily (sasneha)', 'Hot (ushna)', 'Sharp (tikshna)', 'Liquid (drava)', 'Sour (amla)', 'Flowing (sara)', 'Pungent (katu)'],
      ref: 'Charaka Samhita, Sutrasthana 1.60', verified: true },
    seats: { text: 'Mainly around the navel — the stomach and small intestine; also sweat, blood, eyes and skin.', ref: 'Ashtanga Hridaya, Sutrasthana 12', verified: false },
    jobs: ['Digests food and separates nourishment from waste', 'Keeps body warmth steady', 'Gives hunger and thirst', 'Powers eyesight and skin glow', 'Sharpens understanding and courage'],
    balanced: ['Strong digestion, steady appetite', 'Clear thinking, good focus', 'Warm, confident, brave nature', 'Bright eyes, glowing skin'],
    tooMuch: ['Acidity, heartburn, burning feeling', 'Skin rashes, redness, boils', 'Short temper, impatience, criticism', 'Loose or urgent motions', 'Too much sweat, cannot bear heat'],
    causes: ['Chilli, fried, very sour or salty food', 'Alcohol, coffee, fermented foods in excess', 'Skipping lunch, eating late', 'Midday sun and overheating', 'Anger, competition, working without breaks'],
    whenItRises: { season: 'Grows in the rainy season, rises most in autumn; eases in early winter.', timeOfDay: 'Midday and around midnight.', lifeStage: 'The middle years.', ref: 'Ashtanga Hridaya, Sutrasthana 1 and 3', verified: false },
    balance: {
      food: ['Cooling, mildly spiced, freshly cooked meals', 'Rice, wheat, moong dal, coconut, cucumber, sweet fruit', 'Ghee, coriander, fennel, mint, rose', 'Sweet, bitter and astringent tastes', 'Cool (not iced) water, coconut water, buttermilk at lunch'],
      routine: ['Lunch on time — the main meal of the day', 'Avoid the midday sun; wear a hat', 'Cool coconut-oil head massage', 'Bed by 10 pm; no work in bed'],
      exercise: ['Swimming, moonlight walks, gentle cycling', 'Exercise early morning, never at noon'],
      mind: ['Cooling breath (Sheetali) — inhale through a curled tongue', 'Sit by water or greenery; loosen the schedule a little']
    },
    tastes: { favour: ['Sweet', 'Bitter', 'Astringent'], reduce: ['Pungent', 'Sour', 'Salty'], ref: 'Ashtanga Hridaya, Sutrasthana 1', verified: false },
    tip: 'Fire needs cooling, not starving. Eat on time, keep it mild, and let yourself rest.'
  },
  { key: 'K', name: 'Kapha', sanskrit: 'कफ', element: 'Water + Earth', symbol: 'leaf',
    oneLine: 'Kapha is the earth and water in you — it builds, holds and soothes.',
    qualities: {
      list: ['Heavy (guru)', 'Cold (sheeta)', 'Soft (mridu)', 'Oily (snigdha)', 'Sweet (madhura)', 'Steady (sthira)', 'Slimy (picchila)'],
      ref: 'Charaka Samhita, Sutrasthana 1.61', verified: true },
    seats: { text: 'Mainly the chest; also the throat, head, joints, stomach, fat, nose and tongue.', ref: 'Ashtanga Hridaya, Sutrasthana 12', verified: false },
    jobs: ['Builds and nourishes the body', 'Keeps joints oiled and smooth', 'Gives strength, stamina and immunity', 'Holds the body firm and steady', 'Brings patience, calm and forgiveness'],
    balanced: ['Strong, steady body and stamina', 'Calm, patient, loving nature', 'Deep sleep, good memory', 'Smooth skin, thick hair, strong joints'],
    tooMuch: ['Heaviness, sluggishness, sleeping too long', 'Weight gain that will not shift', 'Congestion, cough, cold, mucus', 'Dull appetite, slow digestion', 'Low mood, attachment, not wanting change'],
    causes: ['Sweet, oily, heavy, fried, cold food', 'Curd, cheese, ice cream, especially at night', 'Overeating and snacking without hunger', 'Daytime sleep, sitting all day', 'Cold, damp, cloudy weather'],
    whenItRises: { season: 'Grows in winter, rises most in spring; eases in summer.', timeOfDay: 'Early morning and early night.', lifeStage: 'Childhood.', ref: 'Ashtanga Hridaya, Sutrasthana 1 and 3', verified: false },
    balance: {
      food: ['Light, warm, well-spiced meals', 'Millets, barley, old rice, lots of vegetables', 'Ginger, pepper, turmeric, cumin, honey', 'Pungent, bitter and astringent tastes', 'Warm water with a little ginger; skip cold drinks'],
      routine: ['Rise before sunrise; no daytime naps', 'Light breakfast, or skip it if not hungry', 'Dry powder massage (udvartana) to stir the body', 'Lighter, earlier dinner'],
      exercise: ['Brisk walking, running, sun salutations, dancing', 'Sweat a little every morning'],
      mind: ['Energising breath (Bhastrika) with a teacher, if fit', 'Learn something new; say yes to change']
    },
    tastes: { favour: ['Pungent', 'Bitter', 'Astringent'], reduce: ['Sweet', 'Sour', 'Salty'], ref: 'Ashtanga Hridaya, Sutrasthana 1', verified: false },
    tip: 'Earth loves stillness a little too much. Move first, then eat, and keep it light.'
  }
];

const DOSHA_GUIDE_NOTE = 'Everyone has all three doshas; one or two usually lead. These are traditional descriptions for learning, not a diagnosis. Persistent symptoms need a doctor.';

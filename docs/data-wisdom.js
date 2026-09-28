/* ---- Annamaya · Vedic Lifestyle Diet — verse & wisdom content (verified by Fable 2026-09-28) ---- */

const HERO_VERSE = {
  dev: 'आयुःसत्त्वबलारोग्यसुखप्रीतिविवर्धनाः । रस्याः स्निग्धाः स्थिरा हृद्या आहाराः सात्त्विकप्रियाः ॥',
  iast: 'āyuḥ-sattva-balārogya-sukha-prīti-vivardhanāḥ | rasyāḥ snigdhāḥ sthirā hṛdyā āhārāḥ sāttvika-priyāḥ',
  en: 'Food that gives long life, a clear mind, strength, health and joy — juicy, wholesome, lasting and pleasing to the heart.',
  ref: 'Bhagavad Gita 17.8'
};

const ATTRIBUTION = 'Inspired by Bhagavad Gita 17.7–10 and Chandogya Upanishad 6.5.4, 7.26.2.';

const THEME_LINE = 'We become what we eat. A healthy way to live a happy life.';

const VERSES = [
  { id: 'chandogya-6-5-4', title: 'The mind is made of food',
    dev: 'अन्नमयं हि सोम्य मनः आपोमयः प्राणस्तेजोमयी वागिति ।',
    iast: 'annamayaṁ hi somya manaḥ, āpomayaḥ prāṇaḥ, tejomayī vāg iti',
    en: 'Dear one, the mind is made of food, the life-breath is made of water, and speech is made of fire.',
    note: 'What you eat today becomes the mind you think with tomorrow. Choose food you would like to become.',
    ref: 'Chandogya Upanishad 6.5.4', verified: true },
  { id: 'chandogya-7-26-2', title: 'Pure food, clear mind',
    dev: 'आहारशुद्धौ सत्त्वशुद्धौ ध्रुवा स्मृतिः स्मृतिलम्भे सर्वग्रन्थीनां विप्रमोक्षः ।',
    iast: 'āhāra-śuddhau sattva-śuddhau dhruvā smṛtiḥ, smṛti-lambhe sarva-granthīnāṁ vipramokṣaḥ',
    en: 'When food is pure, the inner being is pure; then memory becomes steady; with steady memory, all knots of the heart are loosened.',
    note: 'A clean, simple plate is the first step to a calm and steady mind.',
    ref: 'Chandogya Upanishad 7.26.2', verified: true },
  { id: 'gita-3-14', title: 'All beings come from food',
    dev: 'अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः । यज्ञाद्भवति पर्जन्यो यज्ञः कर्मसमुद्भवः ॥',
    iast: 'annād bhavanti bhūtāni parjanyād anna-sambhavaḥ | yajñād bhavati parjanyo yajñaḥ karma-samudbhavaḥ',
    en: 'All beings are born from food; food comes from rain; rain comes from sacrifice; and sacrifice is born of right action.',
    note: 'Every meal links you to rain, soil and the hands that grew it. Eat with that quiet gratitude.',
    ref: 'Bhagavad Gita 3.14', verified: true },
  { id: 'gita-6-16', title: 'Not too much, not too little',
    dev: 'नात्यश्नतस्तु योगोऽस्ति न चैकान्तमनश्नतः । न चाति स्वप्नशीलस्य जाग्रतो नैव चार्जुन ॥',
    iast: "nātyaśnatas tu yogo 'sti na caikāntam anaśnataḥ | na cāti-svapna-śīlasya jāgrato naiva cārjuna",
    en: 'Yoga is not for one who eats too much or too little, nor for one who sleeps too much or too little, Arjuna.',
    note: 'Balance is the whole secret. Neither stuffing nor starving — just enough, on time.',
    ref: 'Bhagavad Gita 6.16', verified: true },
  { id: 'gita-6-17', title: 'Yuktāhāra — the measured life',
    dev: 'युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु । युक्तस्वप्नावबोधस्य योगो भवति दुःखहा ॥',
    iast: 'yuktāhāra-vihārasya yukta-ceṣṭasya karmasu | yukta-svapnāvabodhasya yogo bhavati duḥkha-hā',
    en: 'For one measured in food and recreation, measured in effort and work, measured in sleep and waking, yoga removes all sorrow.',
    note: 'Regular meals, regular sleep, regular movement — the simple rhythm that keeps sorrow away.',
    ref: 'Bhagavad Gita 6.17', verified: true },
  { id: 'gita-17-7', title: 'Three kinds of food',
    dev: 'आहारस्त्वपि सर्वस्य त्रिविधो भवति प्रियः । यज्ञस्तपस्तथा दानं तेषां भेदमिमं शृणु ॥',
    iast: 'āhāras tv api sarvasya tri-vidho bhavati priyaḥ | yajñas tapas tathā dānaṁ teṣāṁ bhedam imaṁ śṛṇu',
    en: 'Even the food each person likes is of three kinds, as are sacrifice, discipline and giving. Hear now the difference between them.',
    note: 'Notice what you reach for. Your plate quietly shows the state of your mind.',
    ref: 'Bhagavad Gita 17.7', verified: true },
  { id: 'gita-17-8', title: 'Sattvic food',
    dev: 'आयुःसत्त्वबलारोग्यसुखप्रीतिविवर्धनाः । रस्याः स्निग्धाः स्थिरा हृद्या आहाराः सात्त्विकप्रियाः ॥',
    iast: 'āyuḥ-sattva-balārogya-sukha-prīti-vivardhanāḥ | rasyāḥ snigdhāḥ sthirā hṛdyā āhārāḥ sāttvika-priyāḥ',
    en: 'Foods that increase life, clarity, strength, health, happiness and contentment — juicy, wholesome, lasting and pleasing to the heart — are loved by the sattvic.',
    note: 'Fresh, warm, gently oiled food that leaves you light and content. That is the daily aim.',
    ref: 'Bhagavad Gita 17.8', verified: true },
  { id: 'gita-17-9', title: 'Rajasic food',
    dev: 'कट्वम्ललवणात्युष्णतीक्ष्णरूक्षविदाहिनः । आहारा राजसस्येष्टा दुःखशोकामयप्रदाः ॥',
    iast: 'kaṭv-amla-lavaṇāty-uṣṇa-tīkṣṇa-rūkṣa-vidāhinaḥ | āhārā rājasasyeṣṭā duḥkha-śokāmaya-pradāḥ',
    en: 'Foods that are very bitter, sour, salty, hot, pungent, dry and burning are liked by the rajasic; they bring pain, grief and illness.',
    note: 'A little spice is fine. When every meal must burn, the body is asked to pay for it.',
    ref: 'Bhagavad Gita 17.9', verified: true },
  { id: 'gita-17-10', title: 'Tamasic food',
    dev: 'यातयामं गतरसं पूति पर्युषितं च यत् । उच्छिष्टमपि चामेध्यं भोजनं तामसप्रियम् ॥',
    iast: 'yāta-yāmaṁ gata-rasaṁ pūti paryuṣitaṁ ca yat | ucchiṣṭam api cāmedhyaṁ bhojanaṁ tāmasa-priyam',
    en: 'Food that is stale, tasteless, foul-smelling, left overnight, left over by others or impure is liked by the tamasic.',
    note: 'Cook fresh when you can. Food loses its life as the hours pass.',
    ref: 'Bhagavad Gita 17.10', verified: true },
  { id: 'taittiriya-3-2', title: 'Food is Brahman',
    dev: 'अन्नं ब्रह्मेति व्यजानात् । अन्नाद्ध्येव खल्विमानि भूतानि जायन्ते । अन्नेन जातानि जीवन्ति । अन्नं प्रयन्त्यभिसंविशन्तीति ॥',
    iast: 'annaṁ brahmeti vyajānāt | annād dhy eva khalv imāni bhūtāni jāyante | annena jātāni jīvanti | annaṁ prayanty abhisaṁviśantīti',
    en: 'He understood that food is Brahman. From food all beings are born; by food, once born, they live; into food they return at the end.',
    note: 'The body is the "annamaya" sheath — made of food. Treat each meal as the material you are built from.',
    ref: 'Taittiriya Upanishad 3.2 (Bhrigu Valli)', verified: true }
];

const NONVEG = {
  title: 'Is non-veg Vedic?',
  intro: 'People often ask whether eating meat, fish or eggs is "against" the Vedic way. The honest answer: the tradition holds more than one view, and both are old and respected.',
  ayurveda: [
    { point: "Charaka lists meats by animal and habitat, with the qualities and best uses of each — a physician's catalogue, not a prohibition.", ref: 'Charaka Samhita, Sutrasthana 27 (mamsa varga)', verified: false },
    { point: 'Charaka states plainly that no other food equals meat for nourishing the body (brimhana).', ref: 'Charaka Samhita, Sutrasthana 27.87', verified: true },
    { point: 'Meats of wetland and aquatic animals are described as strength-giving, building the body and pacifying Vata.', ref: 'Charaka Samhita, Sutrasthana 27.56-57', verified: true },
    { point: 'In Charaka\'s "best of each kind" list, meat is named the best of nourishing substances (mamsam brimhaniyanam).', ref: 'Charaka Samhita, Sutrasthana 25.40', verified: true },
    { point: 'Meat soup (mamsa rasa) is traditionally given to the weak, the thin and those recovering, when digestion can bear it.', ref: 'Charaka Samhita, Sutrasthana 27 (traditional use)', verified: false },
    { point: "Sushruta groups meats by where the animal lives — dry land, marsh, water, domestic — and rates each group's heaviness and strength.", ref: 'Sushruta Samhita, Sutrasthana 46 (mamsa varga)', verified: false }
  ],
  upanishad: [
    { point: 'The Brihadaranyaka Upanishad, in a passage on wishing for a learned son, describes rice cooked with meat and ghee. It is stated here neutrally, as the text has it.', ref: 'Brihadaranyaka Upanishad 6.4.18', verified: true }
  ],
  principle: [
    { point: 'Charaka gives eight things that decide whether a food suits you: its nature, preparation, combination, quantity, place, time, rules of eating, and the eater.', ref: 'Charaka Samhita, Vimanasthana 1.21', verified: true },
    { point: 'So the classical question is never "is this food good?" but "is it good for this body, this season, this place, this digestion, this habit (satmya)?"', ref: 'Charaka Samhita, Vimanasthana 1.21', verified: true },
    { point: 'Whatever you eat, eat in measure: the texts say the right quantity, taken without upsetting Vata, Pitta and Kapha, supports a long life.', ref: 'Charaka Samhita, Vimanasthana 1.25', verified: true }
  ],
  vegetarian: [
    { point: 'The Chandogya Upanishad names ahimsa — non-harming — among the true offerings of a well-lived life, alongside austerity, giving, honesty and truth.', ref: 'Chandogya Upanishad 3.17.4', verified: true },
    { point: 'The Gita praises sattvic food that gives life, clarity and joy. The Gita itself does not name meat as forbidden; the sattvic reading is a tradition of interpretation.', ref: 'Bhagavad Gita 17.8', verified: true },
    { point: 'Manu says there is no fault in eating meat, for that is the way of living beings — but turning away from it brings great reward.', ref: 'Manusmriti 5.56', verified: true },
    { point: 'Many yoga and bhakti lineages choose vegetarian food to keep the mind calm and the heart gentle. That choice has deep roots too.', ref: 'Traditional teaching', verified: false }
  ],
  summary: 'Ayurveda chooses food for the body in front of it. Many spiritual paths prefer vegetarian food for a calm mind. Both are part of the tradition — choose what suits your body, your health and your beliefs.'
};

const DAILY_VERSES = [
  { text: 'Eat neither too much nor too little.', ref: 'Bhagavad Gita 6.16' },
  { text: 'Measured food, measured rest, measured work — this removes sorrow.', ref: 'Bhagavad Gita 6.17' },
  { text: 'Choose food that gives life, clarity, strength, health and joy.', ref: 'Bhagavad Gita 17.8' },
  { text: 'Fresh today beats stale yesterday.', ref: 'Bhagavad Gita 17.10' },
  { text: 'The mind is made of food. Feed it well.', ref: 'Chandogya Upanishad 6.5.4' },
  { text: 'Pure food, steady mind.', ref: 'Chandogya Upanishad 7.26.2' },
  { text: 'Stop at 80% full — hara hachi bu. Charaka said the same: leave a third of the stomach empty.', ref: 'Charaka Samhita, Vimanasthana 2.3' },
  { text: 'One soup, three small sides — variety on a small plate.', ref: 'Ichijū sansai (Japan)' }
];

const JAPAN = {
  title: 'Wisdom from Japan: eating for a long, happy life',
  intro: 'Okinawa and rural Japan are famous for long, active lives. Their everyday food habits sit surprisingly close to what the Charaka Samhita and the Gita taught — and where they differ, the difference is worth knowing.',
  habits: [
    { name: 'Stop at 80% full', jp: 'Hara hachi bu — "belly eight parts (of ten)"',
      text: 'Okinawan elders end a meal a little before they feel full. Fullness arrives late; stopping early avoids overeating without any counting.',
      ayurveda: 'Same idea, older: fill the stomach one third with food, one third with liquid, leave one third empty. — Charaka Samhita, Vimanasthana 2.3' },
    { name: 'One soup, three sides', jp: 'Ichijū sansai — "one soup, three dishes"',
      text: 'Rice, a bowl of soup, one main and two small sides. Many tastes, small portions, no single dish dominating the plate.',
      ayurveda: 'Matches the South Indian thali: rice, rasam or dal, two curries, a little pickle — all six tastes in one meal.' },
    { name: 'Eat with the season', jp: 'Shun — the peak season of a food',
      text: 'Vegetables and fish are chosen at their seasonal best, cooked lightly — steamed, simmered or quickly grilled — so their own flavour stays.',
      ayurveda: 'Ayurveda also eats by season (kala) but prefers warm, cooked food; raw and cold food can unsettle Vata and weak digestion. "Lightly cooked" is the meeting point.' },
    { name: 'Fermented foods, a little', jp: 'Miso, natto, tsukemono — soybean paste, fermented beans, pickles',
      text: 'A spoon of miso in soup or a small pickle appears at most Japanese meals, in small amounts rather than as a main dish.',
      ayurveda: 'Our curd, buttermilk and pickles play this role. Ayurveda keeps sour and fermented foods small, especially for Pitta, and avoids curd at night.' },
    { name: 'Green tea, not sugary drinks', jp: 'Ocha — tea; matcha and sencha are green teas',
      text: 'Plain green tea, without milk or sugar, is the everyday drink with and between meals.',
      ayurveda: 'Ayurveda favours warm water and light herbal infusions — cumin, coriander, fennel, ginger — for the same purpose. Tea is fine in moderation.' },
    { name: 'Gratitude, then eat slowly', jp: 'Itadakimasu — "I humbly receive"',
      text: 'A meal begins with a small word of thanks and ends with gochisōsama ("it was a feast"). Eating is unhurried and rarely done standing or scrolling.',
      ayurveda: 'The Gita sees food as a gift of rain and effort, to be eaten with thanks (Bhagavad Gita 3.13-14); Charaka lists attentive, unhurried eating among the rules.' },
    { name: 'Purpose and company', jp: 'Ikigai — reason to get up; moai — a lifelong circle of friends',
      text: 'Okinawan elders keep a daily purpose — a garden, weaving, grandchildren — and meet a small, steady group of friends for life.',
      ayurveda: "Ayurveda's idea of health includes a content mind and senses (prasanna atma-indriya-manas). Shared meals and a reason to rise belong to the diet." }
  ],
  caution: 'The Okinawa Centenarian Study (since 1975) reports these habits among long-lived elders, but its founder also noted that many simply ate little because there was little to eat. Claims about "Blue Zones" are debated. Take these as sensible habits, not proof of long life.',
  sources: [
    { title: 'Okinawa Centenarian Study', link: 'https://okinawacentenarian.org/the-study' },
    { title: 'Willcox et al., Caloric Restriction, the Traditional Okinawan Diet, and Healthy Aging (2007)', link: 'https://nyaspubs.onlinelibrary.wiley.com/doi/abs/10.1196/annals.1396.037' },
    { title: 'Science: Do "blue zones" rest on shaky science?', link: 'https://www.science.org/content/article/do-blue-zones-supposed-havens-longevity-rest-shaky-science' },
    { title: 'The Japanese Traditional Diet in Healthy Dietary Patterns (PMC, 2018)', link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5852749/' },
    { title: 'Charak Samhita Online — Trividhakukshiya Vimana (Vi.2.3)', link: 'https://www.carakasamhitaonline.com/index.php/Trividhakukshiya_Vimana' }
  ]
};

/* ---- Gut & mind, food myths, gut daily lines (verified by Fable 2026-09-28) ---- */

const GUT = {
  title: 'Gut and mind: the fire within',
  intro: 'People say "the gut is the second brain" and "70% of health is in the gut". The old texts said something close, but more carefully: digestion (agni) is the root of strength and health, a troubled mind spoils even good food, and good food builds a clear mind. Modern research agrees on the direction of the link, but is honest that the details are still being worked out.',
  ayurveda: [
    { title: 'Agni is the root',
      dev: 'शान्तेऽग्नौ म्रियते, युक्ते चिरं जीवत्यनामयः । रोगी स्याद्विकृते, मूलमग्निस्तस्मान्निरुच्यते ॥',
      iast: "śānte'gnau mriyate, yukte ciraṁ jīvaty anāmayaḥ | rogī syād vikṛte, mūlam agnis tasmān nirucyate",
      en: 'When agni is extinguished one dies; when it is balanced one lives long and free of disease; when it is disturbed one falls ill. Therefore agni is called the root.',
      note: 'The verse before it lists what depends on this fire: life, complexion, strength, health, enthusiasm, growth, lustre, ojas and warmth. Take care of digestion first; the rest follows.',
      ref: 'Charaka Samhita, Chikitsasthana 15.3-4', verified: true },
    { title: 'Weak fire, many troubles',
      dev: 'रोगाः सर्वेऽपि मन्देऽग्नौ सुतरामुदराणि तु ।',
      iast: "rogāḥ sarve'pi mande'gnau sutarām udarāṇi tu",
      en: 'Nearly all diseases arise when agni is weak; abdominal diseases especially so.',
      note: 'Vagbhata opens his chapter on abdominal disease with this line. Ayurveda reads most complaints by first asking: how is the digestion?',
      ref: 'Ashtanga Hridaya, Nidanasthana 12.1', verified: true },
    { title: 'Ama — the half-cooked residue',
      dev: 'ऊष्मणोऽल्पबलत्वेन धातुमाद्यमपाचितम् । दुष्टमामाशयगतं रसमामं प्रचक्षते ॥',
      iast: "ūṣmaṇo'lpabalatvena dhātum ādyam apācitam | duṣṭam āmāśayagataṁ rasam āmaṁ pracakṣate",
      en: 'When the digestive heat is weak, the first tissue (rasa) is left uncooked; that spoilt matter lying in the stomach is called ama.',
      note: 'Charaka adds that undigested food "turns sour and poison-like" (Chikitsasthana 15.44). Heaviness, coated tongue and dull appetite are the traditional signs. Ama is a classical idea, not a lab finding.',
      ref: 'Ashtanga Hridaya, Sutrasthana 13.25', verified: true },
    { title: 'Mind to gut: a worried meal is not digested',
      dev: 'मात्रयाऽप्यभ्यवहृतं पथ्यं चान्नं न जीर्यति । चिन्ताशोकभयक्रोधदुःखशय्याप्रजागरैः ॥',
      iast: "mātrayā'py abhyavahṛtaṁ pathyaṁ cānnaṁ na jīryati | cintā-śoka-bhaya-krodha-duḥkha-śayyā-prajāgaraiḥ",
      en: 'Even wholesome food, eaten in the right measure, is not digested by one troubled by worry, grief, fear, anger, an uncomfortable bed or lack of sleep.',
      note: 'The verse just before (Vi.2.8) adds desire, greed, envy, shame and conceit to the list, and food taken at the wrong time. Charaka saw the mind spoiling digestion two thousand years before "stress" was a word.',
      ref: 'Charaka Samhita, Vimanasthana 2.9', verified: true },
    { title: 'Gut to mind: everything rests on food',
      dev: 'प्राणाः प्राणभृतामन्नमन्नं लोकोऽभिधावति । वर्णः प्रसादः सौस्वर्यं जीवितं प्रतिभा सुखम् ॥ तुष्टिः पुष्टिर्बलं मेधा सर्वमन्ने प्रतिष्ठितम् ।',
      iast: "prāṇāḥ prāṇabhṛtām annam annaṁ loko'bhidhāvati | varṇaḥ prasādaḥ sausvaryaṁ jīvitaṁ pratibhā sukham || tuṣṭiḥ puṣṭir balaṁ medhā sarvam anne pratiṣṭhitam",
      en: 'Food is the life of living beings; the whole world runs after food. Complexion, clarity, a good voice, long life, understanding, happiness, contentment, growth, strength and intellect — all are established in food.',
      note: 'Clarity (prasada), understanding (pratibha) and intellect (medha) sit in the same list as strength and complexion. The Upanishad says it in one line: "the mind is made of food" (Chandogya 6.5.4).',
      ref: 'Charaka Samhita, Sutrasthana 27.349-350', verified: true },
    { title: 'How to eat: the classical rules',
      dev: 'उष्णं, स्निग्धं, मात्रावत्, जीर्णे वीर्याविरुद्धम्, इष्टे देशे, इष्टसर्वोपकरणं, नातिद्रुतं, नातिविलम्बितम्, अजल्पन्, अहसन्, तन्मना भुञ्जीत, आत्मानमभिसमीक्ष्य सम्यक् ॥',
      iast: 'uṣṇaṁ, snigdhaṁ, mātrāvat, jīrṇe vīryāviruddham, iṣṭe deśe, iṣṭa-sarvopakaraṇaṁ, nātidrutaṁ, nātivilambitam, ajalpan, ahasan, tanmanā bhuñjīta, ātmānam abhisamīkṣya samyak',
      en: 'Eat food that is warm, unctuous, in right measure, after the previous meal is digested, not antagonistic; in a pleasant place with all that you need; not too fast, not too slow; without talking or laughing; with the mind on the food; knowing yourself well.',
      note: 'Charaka explains each rule in the next verse: a pleasant place keeps the mind from being disturbed, and eating with attention lets you notice what suits you. Attention at the plate is part of digestion.',
      ref: 'Charaka Samhita, Vimanasthana 1.24-25', verified: true }
  ],
  modern: [
    { point: 'The gut and brain talk both ways through the vagus nerve, hormones and immune signals — the "gut-brain axis". The vagus nerve helps regulate mood, immune response, digestion and heart rate.',
      source: 'Breit et al., Vagus Nerve as Modulator of the Brain-Gut Axis, Frontiers in Psychiatry 2018 — https://pmc.ncbi.nlm.nih.gov/articles/PMC5859128/' },
    { point: 'About 90-95% of the body\'s serotonin is made by cells in the gut lining. But gut serotonin does not cross into the brain; it works locally on gut movement and signals the brain only indirectly. Gut serotonin is not "your happiness chemical".',
      source: 'Wei, Singh & Ghoshal, J Neurogastroenterol Motil 2022 — https://pmc.ncbi.nlm.nih.gov/articles/PMC9274469/' },
    { point: 'The real "70%": the gut\'s lymphoid tissue holds roughly 70% of the body\'s immune cells. That is the honest version of "70% of health is in the gut".',
      source: 'Vighi et al., Allergy and the gastrointestinal system, Clin Exp Immunol 2008 — https://pmc.ncbi.nlm.nih.gov/articles/PMC2515351/' },
    { point: 'Gut bacteria and mood is a promising field, but most strong results are from animal studies; human trials of "psychobiotics" are mixed, with little effect in healthy, low-stress people. Treat it as early science, not settled fact.',
      source: 'Sisubalan et al., Psychobiotics in mental health: insights from human clinical trials, Frontiers in Microbiology — https://pmc.ncbi.nlm.nih.gov/articles/PMC13066224/' },
    { point: 'Stress changes digestion: the stress response cuts blood flow and movement in the gut, and problems in brain-gut interaction are central to irritable bowel syndrome (IBS). Charaka\'s "worried meal" has a modern echo.',
      source: 'NIDDK, IBS Symptoms & Causes — https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/symptoms-causes' }
  ],
  order: {
    ayurveda: {
      text: 'Sushruta gives an order: sweet foods first, sour and salty in the middle, pungent, bitter and astringent at the end. He also says fruits such as pomegranate come first, then liquids and gruels, then solid dishes — and adds that dense food is eaten first, "though some say the reverse". So even the classics allowed more than one order.',
      ref: 'Sushruta Samhita, Sutrasthana 46.460-462 (verse numbers vary by edition)', verified: true },
    modern: {
      text: 'Small trials in people with type 2 diabetes found that eating vegetables and protein before the carbohydrate (rice, roti, bread) lowered the rise in blood glucose and insulin after the meal, compared with carbohydrate first. Results come from small, short studies, mostly in diabetes.',
      source: 'Shukla et al., BMJ Open Diabetes Res Care 2017 — https://pmc.ncbi.nlm.nih.gov/articles/PMC5604719/' },
    together: 'The two are not enemies. A South Indian plate can start with a little cooked vegetable and dal, take rice in the middle, and end light — buttermilk at lunch, not a heavy sweet. Sushruta\'s "sweet first" means naturally sweet, nourishing foods (grains, fruit), not dessert. Eating in a different order does not "ruin digestion"; it may just make the sugar rise steeper.'
  },
  tips: [
    'Eat when truly hungry, at a regular time — not because the clock says so, not after the hunger has passed.',
    'Sit down, put the phone away, and give the first few mouthfuls your full attention (Charaka\'s tanmana).',
    'Start the meal with a little cooked vegetable or dal; take rice or roti after; keep the last bite light.',
    'Upset, angry or exhausted? Wait ten minutes, sip warm water, then eat something small and simple.',
    'Keep dinner lighter and earlier than lunch, and leave two to three hours before sleep.'
  ],
  caution: 'This section shares classical ideas and early science for education. Persistent bloating, pain, blood in stool, unexplained weight loss, or low mood that lasts more than two weeks need a doctor, not a diet change. Never stop prescribed medicines for gut or mental health because of anything here.'
};

const MYTHS = [
  { myth: 'Carbs are the enemy',
    fact: 'Whole grains, millets, dals, fruit and vegetables give energy and fibre. Weight gain comes from an overall energy surplus, not carbohydrate itself; the type of carbohydrate matters far more than the amount.',
    ayurveda: 'Rice, wheat and barley are the everyday grains of the classics; the concern is quantity and freshness, not the grain. — Charaka, Sutrasthana 27',
    source: 'Harvard T.H. Chan School of Public Health, Carbohydrates — https://nutritionsource.hsph.harvard.edu/carbohydrates/' },
  { myth: 'Detox cleanses remove toxins',
    fact: 'Juice cleanses and detox teas are not needed. Liver, kidneys, lungs and gut clear waste continuously. A 2015 review found no compelling evidence that detox diets remove toxins or manage weight.',
    ayurveda: 'Ayurveda\'s own cleansing, panchakarma, is a supervised clinical therapy prescribed per person — not a juice cleanse. Daily "detox" is warm water, light meals and timely rest.',
    source: 'NCCIH, Detoxes and Cleanses — https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know' },
  { myth: 'Fat-free or low-fat is healthier',
    fact: 'When makers remove fat they often add sugar, refined starch or salt for taste. Ghee, nuts, seeds and good oils in measure support satiety and hormone health; the total and the type of fat matter.',
    ayurveda: 'Charaka lists warm, unctuous (snigdha) food among the rules of eating; a little ghee is classical, dryness is the concern. — Charaka, Vimanasthana 1.24',
    source: 'Harvard T.H. Chan School of Public Health, Fats and Cholesterol — https://nutritionsource.hsph.harvard.edu/what-should-you-eat/fats-and-cholesterol/' },
  { myth: 'Eating after 7 PM automatically causes weight gain',
    fact: 'The body does not store fat by the clock; total daily energy balance decides. But a controlled trial found late eating raised hunger and lowered energy burned, and late meals often mean mindless snacking and poorer sleep.',
    ayurveda: 'Dinner lighter than lunch, two to three hours before sleep. Kapha rises in the early night, so the fire is traditionally held weaker. — Ashtanga Hridaya, Sutrasthana 1',
    source: 'Vujović et al., Cell Metabolism 2022 — https://pmc.ncbi.nlm.nih.gov/articles/PMC10184753/' },
  { myth: 'Gluten-free is better for weight loss',
    fact: 'Gluten-free is necessary for coeliac disease and gluten sensitivity. For others there is no shown benefit, and many packaged gluten-free foods are higher in refined starch and sugar and lower in fibre.',
    ayurveda: 'Ayurveda judges a grain by the eater (satmya): what you are used to, and whether it digests well for you. — Charaka, Vimanasthana 1.21',
    source: 'Harvard T.H. Chan School of Public Health, Gluten — https://nutritionsource.hsph.harvard.edu/gluten/' },
  { myth: 'Skipping meals speeds up weight loss',
    fact: 'Skipping meals tends to bring low energy and strong hunger that leads to overeating later. Studies are mixed, but regular meals make good choices easier.',
    ayurveda: 'Eat on true hunger at regular times. Charaka also warns against eating before the previous meal is digested — so neither skipping nor stacking. — Charaka, Vimanasthana 1.24-25',
    source: 'Betts et al., Breakfast: To Skip or Not to Skip?, Frontiers in Public Health 2014 — https://pmc.ncbi.nlm.nih.gov/articles/PMC4042085/' },
  { myth: 'Intermittent fasting works the same for everyone',
    fact: 'Time-restricted eating helps some people manage intake, and trials show benefits in some groups. Responses vary with sex, age, health, medicines and work hours; it is not for pregnancy, under-18s or anyone on glucose-lowering drugs without a doctor.',
    ayurveda: 'Lightening therapy (langhana) is prescribed by strength, season and dosha — for the strong and heavy, not everyone. — Charaka, Sutrasthana 22',
    source: 'de Cabo & Mattson, Effects of Intermittent Fasting on Health, Aging, and Disease, NEJM 2019 — https://www.nejm.org/doi/full/10.1056/NEJMra1905136' }
];

const GUT_DAILY = [
  { text: 'Agni is the root. Guard your digestion and the rest follows.', ref: 'Charaka Samhita, Chikitsasthana 15.4' },
  { text: 'A worried meal is not digested. Settle the mind, then eat.', ref: 'Charaka Samhita, Vimanasthana 2.9' },
  { text: 'Clarity, contentment and intellect all rest on food.', ref: 'Charaka Samhita, Sutrasthana 27.349-350' }
];

/* ---- Agni: Jatharagni & Vaishvanara (verified by Fable 2026-09-28) ---- */

const AGNI = {
  title: 'Agni: the sacred fire within',
  intro: 'Agni is fire — the fire on the altar, the fire of the sun, and the fire of hunger in your own belly. In the Veda, Agni is the first deity invoked: the priest who carries every offering to the gods. The Upanishads turn inward and find the same fire in the body as Vaishvanara, "the fire of all people", the one that cooks what we eat. The Gita says plainly that this fire is the Lord himself. Ayurveda calls it jatharagni and makes it the root of health. Put together, a meal becomes a small yajna: the plate is the offering, the fire within is the receiver.',
  verses: [
    { id: 'rigveda-1-1-1', title: 'Agni, the first invoked',
      dev: 'अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् । होतारं रत्नधातमम् ॥',
      iast: 'agnim īḷe purohitaṁ yajñasya devam ṛtvijam | hotāraṁ ratnadhātamam',
      en: 'I praise Agni, the priest placed in front, the god who ministers the sacrifice, the invoker, the giver of treasures.',
      note: 'The very first verse of the Rig Veda is addressed to Agni — the fire that receives every offering and carries it to the gods. Every later idea of "fire within" grows from here.',
      ref: 'Rig Veda 1.1.1', verified: true },
    { id: 'gita-15-14', title: 'The Lord as the fire of digestion',
      dev: 'अहं वैश्वानरो भूत्वा प्राणिनां देहमाश्रितः । प्राणापानसमायुक्तः पचाम्यन्नं चतुर्विधम् ॥',
      iast: 'ahaṁ vaiśvānaro bhūtvā prāṇināṁ deham āśritaḥ | prāṇāpāna-samāyuktaḥ pacāmy annaṁ catur-vidham',
      en: 'Becoming the fire Vaishvanara, I dwell in the bodies of living beings; joined with the in-breath and out-breath, I digest the four kinds of food.',
      note: 'Tradition counts the four kinds as food that is chewed (bhojya), drunk or swallowed (peya), licked (lehya) and sucked (koshya). The one who cooks all of it inside you is, the Gita says, the Lord himself.',
      ref: 'Bhagavad Gita 15.14', verified: true },
    { id: 'gita-4-24', title: 'Eating as yajña',
      dev: 'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् । ब्रह्मैव तेन गन्तव्यं ब्रह्मकर्मसमाधिना ॥',
      iast: 'brahmārpaṇaṁ brahma havir brahmāgnau brahmaṇā hutam | brahmaiva tena gantavyaṁ brahma-karma-samādhinā',
      en: 'The offering is Brahman, the oblation is Brahman, poured by Brahman into the fire of Brahman. Brahman is reached by one absorbed in action that is Brahman.',
      note: 'Spoken of sacrifice, this verse is widely said before meals: the food, the eater, the act of eating and the fire that receives it are all one.',
      ref: 'Bhagavad Gita 4.24', verified: true },
    { id: 'brihadaranyaka-5-9-1', title: 'Vaishvanara, the fire within',
      dev: 'अयमग्निर्वैश्वानरो योऽयमन्तः पुरुषे येनेदमन्नं पच्यते यदिदमद्यते ।',
      iast: "ayam agnir vaiśvānaro yo 'yam antaḥ puruṣe yenedam annaṁ pacyate yad idam adyate",
      en: 'This fire that is within a person, by which the food that is eaten is digested — that is Vaishvanara.',
      note: 'The Upanishad adds that its sound can be heard when you close your ears, and that it falls silent when life leaves. Hunger is the fire asking to be fed.',
      ref: 'Brihadaranyaka Upanishad 5.9.1', verified: true },
    { id: 'chandogya-5-19-1', title: 'The first morsel is an offering',
      dev: 'तद्यद्भक्तं प्रथममागच्छेत्तद्धोमीयं स यां प्रथमामाहुतिं जुहुयात्तां जुहुयात्प्राणाय स्वाहेति प्राणस्तृप्यति ॥',
      iast: 'tad yad bhaktaṁ prathamam āgacchet tad dhomīyaṁ; sa yāṁ prathamām āhutiṁ juhuyāt tāṁ juhuyāt prāṇāya svāheti; prāṇas tṛpyati',
      en: 'The first food that comes should be treated as an offering. The first oblation one makes, one should make saying "prāṇāya svāhā" — and prāṇa is satisfied.',
      note: 'This is the prāṇāgnihotra: the meal itself is the fire-ritual, the breaths are the fires. It follows the Vaishvanara teaching (5.18), where the true eater is the Self present in all beings.',
      ref: 'Chandogya Upanishad 5.19.1', verified: true }
  ],
  ayurveda: [
    { point: 'Charaka calls agni the root: when it is extinguished one dies, when it is steady one lives long and well, when it is disturbed one falls ill.', ref: 'Charaka Samhita, Chikitsasthana 15.3-4', verified: true },
    { point: 'Ayurveda counts thirteen fires: one jatharagni in the gut, five bhutagni for the five elements, and seven dhatvagni for the seven tissues.', ref: 'Charaka Samhita, Chikitsasthana 15.13, 15.15, 15.39', verified: true },
    { point: 'Jatharagni, the digester of food, is the chief of all the fires; the rise and fall of every other agni depends on it.', ref: 'Charaka Samhita, Chikitsasthana 15.39', verified: true },
    { point: 'So the fire must be tended with fuel — food and drink taken by the rules — because life and strength rest on it.', ref: 'Charaka Samhita, Chikitsasthana 15.40', verified: true },
    { point: 'Agni is of four strengths: sama (balanced), vishama (irregular, Vata), tikshna (sharp, Pitta) and manda (slow, Kapha).', ref: 'Charaka Samhita, Vimanasthana 6.12', verified: true },
    { point: 'What weakens the fire: long fasting, eating on top of undigested food, overeating, irregular meals and unwholesome food.', ref: 'Charaka Samhita, Chikitsasthana 15.42-44', verified: true },
    { point: 'How to tend it: eat warm, lightly oiled food, in measure, only after the last meal has digested — with attention, neither hurried nor dawdling.', ref: 'Charaka Samhita, Vimanasthana 1.24-25', verified: true },
    { point: 'Warm water is said to kindle and aid digestion; tradition therefore avoids drowning a meal in cold water.', ref: 'Ashtanga Hridaya, Sutrasthana 5.16', verified: false }
  ],
  practice: {
    title: 'Before you eat',
    dev: 'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् । ब्रह्मैव तेन गन्तव्यं ब्रह्मकर्मसमाधिना ॥\nअहं वैश्वानरो भूत्वा प्राणिनां देहमाश्रितः । प्राणापानसमायुक्तः पचाम्यन्नं चतुर्विधम् ॥',
    iast: 'brahmārpaṇaṁ brahma havir brahmāgnau brahmaṇā hutam | brahmaiva tena gantavyaṁ brahma-karma-samādhinā ||\nahaṁ vaiśvānaro bhūtvā prāṇināṁ deham āśritaḥ | prāṇāpāna-samāyuktaḥ pacāmy annaṁ catur-vidham ||',
    en: 'The offering is Brahman, the food is Brahman, offered by Brahman into the fire of Brahman; seeing Brahman in every act, one reaches Brahman. As the fire Vaishvanara I live in every body and, with the breaths, digest the four kinds of food.',
    ref: 'Bhagavad Gita 4.24 and 15.14',
    note: 'Many families say this before meals: the food is an offering, the fire within is the receiver. The second verse is optional. If these words are not yours, you may pause for a moment of gratitude in your own way.'
  },
  reflections: [
    'Real hunger is the fire asking. Feed it then — not before, not long after.',
    'Offer the fire what it can burn: warm, fresh, in measure.',
    'Eat as if someone is receiving the gift. In this tradition, someone is.'
  ],
  caution: 'This section shares scripture and tradition as reflection, not as medical advice. Ayurvedic ideas about agni are presented as classical teaching, not as a medical claim. For health concerns, consult a qualified professional.'
};

/* ---- Chewing: pace, attention and the mouth (verified by Fable 2026-09-28) ---- */

const CHEWING = {
  title: 'Chew slowly, eat mindfully',
  intro: 'The classics never counted chews; they asked for a steady pace, a warm plate and a mind that stays with the food. Modern trials add that chewing each bite more tends to make a meal a little smaller and the eater a little fuller — a small, honest effect, not a remedy for anything.',
  classical: [
    { title: 'Why not too fast',
      dev: 'अतिद्रुतं हि भुञ्जानस्योत्स्नेहनमवसादनं भोजनस्याप्रतिष्ठानं च … तस्मान्नातिद्रुतमश्नीयात् ।',
      iast: 'atidrutaṁ hi bhuñjānasyotsnehanam avasādanaṁ bhojanasyāpratiṣṭhānaṁ ca … tasmān nātidrutam aśnīyāt',
      en: 'When one eats too fast, the food slips the wrong way, sinks, and does not settle; one cannot tell whether it is good or faulty. So do not eat too fast.',
      note: 'The same verse adds that eating while talking, laughing or with the mind elsewhere brings "the same faults as eating too fast". The point is attention, not a count of chews.',
      ref: 'Charaka Samhita, Vimanasthana 1.25', verified: true },
    { title: 'Why not too slow',
      dev: 'अतिविलम्बितं हि भुञ्जानो न तृप्तिमधिगच्छति, बहु भुङ्क्ते, शीतीभवत्याहारजातं, विषमं च पच्यते; तस्मान्नातिविलम्बितमश्नीयात् ।',
      iast: 'ativilambitaṁ hi bhuñjāno na tṛptim adhigacchati, bahu bhuṅkte, śītībhavaty āhārajātaṁ, viṣamaṁ ca pacyate; tasmān nātivilambitam aśnīyāt',
      en: 'When one eats too slowly, one feels no satisfaction, eats a lot, the food goes cold and is digested unevenly. So do not eat too slowly.',
      note: 'A useful check on the "chew forever" idea. Charaka wants a steady, unhurried meal — not a dawdling one that goes cold on the plate.',
      ref: 'Charaka Samhita, Vimanasthana 1.25', verified: true },
    { title: 'Vagbhata says it in one line',
      dev: 'काले सात्म्यं शुचि हितं स्निग्धोष्णं लघु तन्मनाः । षड्रसं मधुरप्रायं नातिद्रुतविलम्बितम् ॥',
      iast: 'kāle sātmyaṁ śuci hitaṁ snigdhoṣṇaṁ laghu tanmanāḥ | ṣaḍrasaṁ madhuraprāyaṁ nātidrutavilambitam',
      en: 'Eat at the right time, food that suits you, clean, wholesome, unctuous, warm and light, with the mind on the meal; of all six tastes, mostly sweet; neither too fast nor too slow.',
      note: 'The Ashtanga Hridaya repeats Charaka\'s rule almost word for word. Neither text mentions chewing (carvaṇa) or a number of chews.',
      ref: 'Ashtanga Hridaya, Sutrasthana 8.35-36', verified: true },
    { title: 'Sushruta: even pace, even digestion',
      en: 'Sit at ease on a good seat, body upright, the whole mind on the meal … neither too hurriedly nor too slowly, even when very hungry. Food eaten neither too slowly nor too hurriedly is digested evenly.',
      note: 'From Bhishagratna\'s English translation of the rules of eating at the end of the chapter. Verse numbers vary by edition and the Sanskrit was not checked, so only the chapter is given.',
      ref: 'Sushruta Samhita, Sutrasthana 46 (rules of eating)', verified: true },
    { title: 'Digestion begins on the tongue',
      dev: 'क्लेदकः सोऽन्नसङ्घातक्लेदनात् । रसबोधनात् बोधको रसनास्थायी ।',
      iast: "kledakaḥ so'nna-saṅghāta-kledanāt | rasa-bodhanāt bodhako rasanāsthāyī",
      en: 'Kledaka (kapha) in the stomach moistens the mass of food; bodhaka, seated on the tongue, makes taste known.',
      note: 'Ayurveda places tasting and moistening before the stomach\'s fire. Chewing is how the tongue does its work, and taste is what tells you when you have had enough.',
      ref: 'Ashtanga Hridaya, Sutrasthana 12.16-17', verified: true }
  ],
  modern: [
    { point: 'Digestion starts in the mouth. Chewing breaks food up, and saliva carries an enzyme (amylase) that begins to break down starch before the food reaches the stomach.',
      source: 'NIDDK, Your Digestive System & How It Works — https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works' },
    { point: 'Chewing each bite 1.5 or 2 times more than usual cut lunch intake by about 9.5% and 14.8% in a 45-person crossover trial — without leaving people hungrier afterwards.',
      source: 'Zhu & Hollis, J Acad Nutr Diet 2014 — https://pubmed.ncbi.nlm.nih.gov/24215801/' },
    { point: '40 chews per bite instead of 15 meant about 12% less eaten, lower ghrelin (the hunger hormone) and higher GLP-1 and CCK (fullness hormones) — in both lean and obese young men.',
      source: 'Li et al., Am J Clin Nutr 2011 — https://pubmed.ncbi.nlm.nih.gov/21775556/' },
    { point: 'Across 23 studies, fast eaters were about twice as likely to be obese (odds ratio 2.15) and had a BMI about 1.8 higher on average. This is an association; it does not prove that slowing down by itself causes weight loss.',
      source: 'Ohkuma et al., Int J Obes 2015 — https://pubmed.ncbi.nlm.nih.gov/26100137/' },
    { point: 'A review of 17 trials found chewing more reduced food intake in 10 of 16 experiments and modestly lowered self-rated hunger. The authors call the evidence "preliminary".',
      source: 'Miquel-Kergoat et al., Physiol Behav 2015 — https://pubmed.ncbi.nlm.nih.gov/26188140/' },
    { point: 'Chewing raises the small burst of heat the body makes after a meal (diet-induced thermogenesis) — real, but a few kilocalories, in a study of 11 men.',
      source: 'Hamada & Hayashi, Sci Rep 2021 — https://pmc.ncbi.nlm.nih.gov/articles/PMC8660770/' },
    { point: 'Blood sugar: chewing brown rice or chickpeas longer made smaller particles and more saliva mixing, but did not change the rise in blood glucose. What the food is matters more than how long it is chewed.',
      source: 'Chen et al., Eur J Nutr 2022 — https://pmc.ncbi.nlm.nih.gov/articles/PMC9596526/' }
  ],
  myths: [
    { claim: '"Chew every bite 32 times, one for each tooth."',
      truth: 'Not in any Ayurvedic text. The number is usually traced to the British prime minister William Gladstone and was made famous around 1900 by Horace Fletcher, "the Great Masticator", whose followers chewed until food turned liquid. Doctors of his day called it a fad. Trials do show more chews mean a little less eaten — but there is no magic number.' },
        { claim: '"Charaka says to chew each morsel thoroughly."',
      truth: 'Charaka, Sushruta and Vagbhata say "not too fast, not too slow", with the mind on the food. They never give a chewing count — and Charaka warns that eating too slowly also does harm: cold food, no satisfaction, overeating.' },
    { claim: '"Chewing more lowers blood sugar."',
      truth: 'Mixed. Chewing releases starch sugars a little sooner, and in a 2022 trial longer chewing did not change the glucose curve for rice or chickpeas. The kind of food — whole grain, dal, vegetables — matters far more.' }
  ],
  tips: [
    'Put the spoon down between mouthfuls; pick it up again only after you swallow.',
    'Let roti or rice be chewed before the next bite — do not wash every morsel down with water.',
    'Aim for a steady 20-minute meal: unhurried, but not so slow that the food goes cold (Charaka\'s "not too slow").',
    'Phone off, plate in front. Talking, laughing or scrolling bring "the same faults as eating too fast".'
  ],
  caution: 'For education only. Chewing more is a small help for appetite, not a treatment for weight, diabetes or reflux. Trouble chewing or swallowing, tooth or jaw pain, or food that sticks on the way down need a dentist or doctor.'
};

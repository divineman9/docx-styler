// Vedic Lifestyle Diet — RECIPES: simple home recipes with spice changes by dosha.
// Each recipe serves 2. `match` is tested against meal option names in SLOTS, so a
// meal shows a Recipe button for every dish it contains.
// `adjust` follows the app's language rule: traditional guidance, not medical advice.

const RECIPES = [
  {
    id: 'pappu', name: 'Pappu (simple dal)', type: 'veg', time: '30 min',
    match: /pappu|dal with ghee|yellow dal|methi dal|thotakura|\+ moong dal \+|\+ dal \+/i,
    ing: ['½ cup moong dal or toor dal, washed', '2 cups water', '¼ tsp turmeric', 'Salt to taste', '1 tsp ghee', '½ tsp cumin seeds', 'Pinch of hing (asafoetida)', '6–8 curry leaves', 'Optional: 1 tomato, or a handful of palak, methi or thotakura leaves'],
    steps: ['Pressure cook dal with water and turmeric for 3–4 whistles until very soft.', 'If adding tomato or greens, cook them with the dal or stir them in after and simmer 5 minutes.', 'Mash well, add salt and a little water to get a pouring consistency.', 'Heat ghee, add cumin, hing and curry leaves. When the cumin sizzles, pour over the dal.'],
    adjust: {
      V: 'Use moong dal, add 1 extra tsp ghee and a small piece of grated ginger. Keep it soft and a little runny.',
      P: 'Use moong dal. Skip green chilli and garlic, add chopped coriander at the end. Go easy on tomato.',
      K: 'Use ½ tsp ghee only. Add ¼ tsp black pepper and a little grated ginger. Greens (methi, palak) are a good addition.',
    },
  },
  {
    id: 'khichdi', name: 'Dal khichdi', type: 'veg', time: '30 min',
    match: /khichdi/i,
    ing: ['½ cup rice (or barley or broken wheat/dalia)', '¼ cup moong dal', '3 cups water', '¼ tsp turmeric', 'Salt to taste', '1–2 tsp ghee', '½ tsp cumin seeds', 'Pinch of hing', '1 small piece ginger, grated'],
    steps: ['Wash rice and dal together and soak for 15 minutes.', 'Heat ghee in a pressure cooker, add cumin, hing and ginger.', 'Add rice, dal, turmeric, salt and water. Cook for 3–4 whistles (barley needs 5–6).', 'Mash lightly and add hot water if too thick. Serve warm.'],
    adjust: {
      V: 'Use rice, add 1 extra tsp ghee on top and keep it soft and moist.',
      P: 'Use rice. Add a pinch of fennel and fresh coriander. Skip chilli.',
      K: 'Use barley or millet instead of rice, 1 tsp ghee only, and add ¼ tsp black pepper and some chopped vegetables.',
    },
  },
  {
    id: 'pongal', name: 'Ven pongal', type: 'veg', time: '30 min',
    match: /pongal/i,
    ing: ['½ cup rice', '¼ cup moong dal', '3 cups water', 'Salt to taste', '2 tsp ghee', '½ tsp whole black pepper, lightly crushed', '½ tsp cumin seeds', '1 small piece ginger, chopped', '6–8 curry leaves', '6 cashews'],
    steps: ['Dry roast moong dal for 2 minutes until it smells nutty.', 'Pressure cook rice and dal with water and salt for 4 whistles.', 'Heat ghee, fry cashews, then add pepper, cumin, ginger and curry leaves.', 'Pour the tempering over the pongal, mix well and serve hot.'],
    adjust: {
      V: 'Use the full ghee and serve it soft and hot.',
      P: 'Use half the pepper and skip extra spice. Coconut chutney on the side suits Pitta.',
      K: 'Use 1 tsp ghee only and skip cashews. The pepper and ginger can stay as is.',
    },
  },
  {
    id: 'upma', name: 'Rava upma', type: 'veg', time: '20 min',
    match: /upma/i,
    ing: ['½ cup rava (sooji) or foxtail millet', '1½ cups water', 'Salt to taste', '1 tsp ghee or oil', '½ tsp mustard seeds', '1 tsp urad dal', '6–8 curry leaves', '1 small onion, chopped (optional)', '¼ cup chopped carrot and beans', '6 cashews'],
    steps: ['Dry roast rava until lightly golden. Set aside. (Millet: wash and soak 20 minutes instead.)', 'Heat ghee, add mustard, urad dal, curry leaves and cashews.', 'Add onion and vegetables and cook 3 minutes. Add water and salt and bring to a boil.', 'Pour in rava slowly while stirring. Cover and cook on low for 3 minutes. (Millet: cook covered 12–15 minutes.)'],
    adjust: {
      V: 'Make it soft and moist with a little extra water and ghee.',
      P: 'Skip onion and green chilli. Add grated coconut and coriander on top.',
      K: 'Use foxtail millet instead of rava, less ghee, more vegetables and a pinch of black pepper.',
    },
  },
  {
    id: 'chilla', name: 'Moong dal chilla', type: 'veg', time: '20 min + soaking',
    match: /chilla/i,
    ing: ['½ cup yellow moong dal, soaked 3 hours', '1 small piece ginger', 'Salt to taste', '¼ tsp cumin seeds', 'Pinch of turmeric', 'Chopped coriander', 'Ghee for cooking'],
    steps: ['Grind soaked dal with ginger and a little water into a smooth batter.', 'Stir in salt, cumin, turmeric and coriander.', 'Heat a tawa, pour a ladle of batter and spread thin.', 'Drizzle ghee around the edges. Cook both sides until golden.'],
    adjust: {
      V: 'Cook with a little more ghee and eat warm, not crisp and dry.',
      P: 'Skip green chilli. Coriander and cumin are good.',
      K: 'Use very little ghee and add a pinch of black pepper and ajwain to the batter.',
    },
  },
  {
    id: 'pesarattu', name: 'Pesarattu', type: 'veg', time: '25 min + soaking',
    match: /pesarattu/i,
    ing: ['1 cup whole green moong, soaked 6 hours', '1 tbsp rice, soaked with the moong', '1 small piece ginger', '½ tsp cumin seeds', 'Salt to taste', 'Ghee for cooking'],
    steps: ['Grind moong, rice and ginger with a little water to a thick, slightly coarse batter.', 'Add cumin and salt.', 'Spread a ladle of batter thin on a hot tawa, like a dosa.', 'Drizzle ghee and cook until the edges crisp. Fold and serve with chutney.'],
    adjust: {
      V: 'Add a little extra ghee and eat it soft and warm.',
      P: 'Skip green chilli in the batter. Serve with coconut chutney, not red chutney.',
      K: 'Use very little ghee. Adding chopped onion and a pinch of pepper on top suits Kapha.',
    },
  },
  {
    id: 'poha', name: 'Poha', type: 'veg', time: '15 min',
    match: /poha/i,
    ing: ['1 cup thick poha', '1 tsp oil or ghee', '½ tsp mustard seeds', '6–8 curry leaves', '2 tbsp peanuts', '¼ tsp turmeric', 'Salt and a pinch of sugar', '1 small potato, cubed (optional)', 'Lemon and coriander to finish'],
    steps: ['Rinse poha in a strainer and let it rest 5 minutes to soften.', 'Heat oil, add mustard, curry leaves and peanuts, fry until peanuts crisp.', 'Add potato and turmeric, cover and cook until soft.', 'Add poha, salt and sugar, mix gently and steam 2 minutes covered. Finish with coriander.'],
    adjust: {
      V: 'Sprinkle a little water while cooking so it stays soft. Add a spoon of ghee.',
      P: 'Skip green chilli and use only a few drops of lemon. Add grated coconut.',
      K: 'Skip the potato and cut the peanuts to 1 tbsp. Add peas and a pinch of pepper.',
    },
  },
  {
    id: 'sambar', name: 'Sambar', type: 'veg', time: '40 min',
    match: /sambar/i,
    ing: ['½ cup toor dal', '1 cup mixed vegetables (drumstick, pumpkin, carrot, brinjal)', 'Small lemon-size tamarind, soaked in ½ cup warm water', '1½ tsp sambar powder', '¼ tsp turmeric', 'Salt to taste', '1 tsp oil or ghee', '½ tsp mustard seeds', 'Pinch of hing', '6–8 curry leaves'],
    steps: ['Pressure cook toor dal with turmeric for 4 whistles and mash.', 'Boil vegetables in tamarind water with salt and sambar powder until tender.', 'Add the dal and water to get the consistency you like. Simmer 5 minutes.', 'Temper mustard, hing and curry leaves in oil and pour over.'],
    adjust: {
      V: 'Use pumpkin and carrot, keep it thick and warm, and finish with ghee.',
      P: 'Halve the tamarind and sambar powder. Use pumpkin or ash gourd. Add coriander at the end.',
      K: 'Use drumstick and brinjal. The full sambar powder is fine, and add an extra pinch of hing.',
    },
  },
  {
    id: 'rasam', name: 'Pepper rasam', type: 'veg', time: '20 min',
    match: /rasam/i,
    ing: ['1 tomato, chopped', 'Small gooseberry-size tamarind, soaked', '1 tsp black pepper and 1 tsp cumin, coarsely crushed', '2 cups water', '¼ tsp turmeric', 'Salt to taste', '1 tsp ghee', '½ tsp mustard seeds', 'Pinch of hing', 'Curry leaves and coriander'],
    steps: ['Boil tomato, tamarind water, turmeric and salt for 5 minutes.', 'Add the crushed pepper and cumin and the rest of the water.', 'Heat until it just starts to froth, then turn off. Do not boil hard.', 'Temper mustard, hing and curry leaves in ghee, pour in and add coriander.'],
    adjust: {
      V: 'Use half the pepper and add a spoon of cooked dal for body.',
      P: 'Use ½ tsp pepper only and very little tamarind. Add extra coriander and cumin.',
      K: 'Keep the full pepper and add a small piece of crushed ginger. Rasam suits Kapha well.',
    },
  },
  {
    id: 'poriyal', name: 'Vegetable poriyal', type: 'veg', time: '20 min',
    match: /poriyal/i,
    ing: ['2 cups finely chopped vegetable (beans, cabbage, carrot, beetroot, snake gourd or raw banana)', '1 tsp oil or ghee', '½ tsp mustard seeds', '1 tsp urad dal', '6–8 curry leaves', 'Pinch of turmeric', 'Salt to taste', '2 tbsp grated coconut'],
    steps: ['Heat oil, add mustard, urad dal and curry leaves.', 'Add the vegetable, turmeric and salt. Sprinkle a little water.', 'Cover and cook on low until just tender (raw banana: boil the cubes first).', 'Stir in grated coconut and turn off the heat.'],
    adjust: {
      V: 'Cook the vegetable fully soft and use ghee. Carrot, beetroot and raw banana suit Vata.',
      P: 'Use a generous amount of coconut. Beans, cabbage and snake gourd suit Pitta. Skip dry red chilli.',
      K: 'Use less coconut and oil, and add a pinch of pepper. Cabbage, beans and snake gourd suit Kapha.',
    },
  },
  {
    id: 'kootu', name: 'Kootu (vegetable with dal and coconut)', type: 'veg', time: '30 min',
    match: /kootu/i,
    ing: ['2 cups chopped ash gourd, bottle gourd or palak', '¼ cup moong dal or chana dal, cooked soft', '3 tbsp grated coconut + ½ tsp cumin, ground to a paste', '¼ tsp turmeric', 'Salt to taste', '1 tsp ghee', '½ tsp mustard seeds', 'Curry leaves'],
    steps: ['Cook the vegetable with turmeric, salt and a little water until soft.', 'Add the cooked dal and the coconut-cumin paste.', 'Simmer 5 minutes until it thickens.', 'Temper mustard and curry leaves in ghee and pour over.'],
    adjust: {
      V: 'Use moong dal and a little extra ghee. Keep it soft and warm.',
      P: 'Ash gourd with moong dal is the classic cooling choice. Use full coconut.',
      K: 'Use chana dal or palak, halve the coconut and add a pinch of pepper.',
    },
  },
  {
    id: 'gourd', name: 'Mild gourd curry (lauki, ridge gourd, pumpkin)', type: 'veg', time: '20 min',
    match: /gourd curry|lauki sabzi|pumpkin curry/i,
    ing: ['2 cups peeled, chopped bottle gourd, ridge gourd or pumpkin', '1 tsp ghee or oil', '½ tsp cumin seeds', 'Pinch of hing', '¼ tsp turmeric', '½ tsp coriander powder', 'Salt to taste', '1 small tomato (optional)', 'Coriander leaves'],
    steps: ['Heat ghee, add cumin and hing.', 'Add tomato if using, and cook 2 minutes.', 'Add the gourd, turmeric, coriander powder and salt. Cover and cook on low in its own juices until soft.', 'Finish with coriander leaves.'],
    adjust: {
      V: 'Pumpkin suits Vata best. Add a little extra ghee and a pinch of grated ginger.',
      P: 'Bottle gourd and ridge gourd suit Pitta. Skip the tomato and any chilli.',
      K: 'Use oil sparingly and add a pinch of pepper and ginger.',
    },
  },
  {
    id: 'phulka', name: 'Phulka / roti', type: 'veg', time: '25 min',
    match: /phulka|chapati|roti/i,
    ing: ['1 cup whole-wheat atta (or jowar/bajra flour)', 'Warm water as needed', 'Pinch of salt', 'Ghee to brush'],
    steps: ['Mix atta and salt with warm water to a soft dough. Rest 15 minutes, covered.', 'Divide into small balls and roll thin.', 'Cook on a hot tawa until small bubbles appear, flip, then puff directly on the flame or press gently on the tawa.', 'Brush with ghee. (Jowar/bajra: pat by hand or between sheets, no puffing needed.)'],
    adjust: {
      V: 'Wheat suits Vata best. Brush generously with ghee and eat warm.',
      P: 'Wheat or jowar. A thin brush of ghee is good.',
      K: 'Jowar, bajra or a wheat–barley mix suits Kapha. Skip ghee or use very little.',
    },
  },
  {
    id: 'curdrice', name: 'Curd rice', type: 'veg', time: '10 min',
    match: /curd rice/i,
    ing: ['1 cup soft cooked rice, warm', '¾ cup fresh curd (not sour)', '2–3 tbsp milk', 'Salt to taste', '1 tsp oil or ghee', '½ tsp mustard seeds', '1 tsp urad dal', 'Curry leaves, a little grated ginger'],
    steps: ['Mash the warm rice lightly and let it cool slightly.', 'Mix in curd, milk and salt.', 'Temper mustard, urad dal, curry leaves and ginger and stir in.', 'Eat at lunch, not at night, as the app suggests for curd.'],
    adjust: {
      V: 'Use it at lunch only, add the ginger and a little ghee in the tempering.',
      P: 'Fresh, sweet curd and a little grated cucumber or coriander suits Pitta.',
      K: 'Curd is heavy for Kapha. Make it thin with more milk, or swap for buttermilk rice with pepper.',
    },
  },
  {
    id: 'chickenstew', name: 'Kerala-style chicken stew', type: 'nonveg', time: '40 min',
    match: /chicken stew/i,
    ing: ['250 g chicken, cut small', '1 cup thin coconut milk + ½ cup thick coconut milk', '1 small onion, sliced', '1 small piece ginger, julienned', '1 potato and 1 carrot, cubed', '4 cloves, 1 small cinnamon stick, 2 cardamom', '½ tsp black pepper', 'Curry leaves', 'Salt', '1 tsp coconut oil'],
    steps: ['Heat oil, add whole spices, then onion, ginger and curry leaves. Cook until soft, not brown.', 'Add chicken, vegetables, salt and thin coconut milk. Cover and simmer 20–25 minutes until cooked.', 'Lower the heat, add the thick coconut milk and pepper. Warm through without boiling.', 'Serve with appam or rice.'],
    adjust: {
      V: 'A good Vata dish as is. Serve it hot.',
      P: 'Skip green chilli and keep the pepper light. The coconut milk is cooling.',
      K: 'Use more thin coconut milk and less thick, add extra pepper and ginger, and more vegetables than chicken.',
    },
  },
  {
    id: 'chickencurry', name: 'Mild chicken curry', type: 'nonveg', time: '45 min',
    match: /chicken curry/i,
    ing: ['250 g desi chicken, cut small', '1 onion, finely chopped', '1 tomato, chopped', '1 tsp ginger-garlic paste', '¼ tsp turmeric', '1 tsp coriander powder', '½ tsp cumin powder', '½ tsp garam masala', 'Salt', '1 tbsp oil'],
    steps: ['Heat oil and cook onion until golden.', 'Add ginger-garlic paste and cook 1 minute, then tomato and powders. Cook until oil separates.', 'Add chicken and salt and stir well. Add ½ cup water, cover and cook 25–30 minutes (desi chicken may need a pressure cooker, 3 whistles).', 'Finish with coriander leaves.'],
    adjust: {
      V: 'Keep plenty of gravy and add a spoon of ghee at the end.',
      P: 'Skip red chilli, use a little garlic only, and add extra coriander powder and coriander leaves.',
      K: 'Use less oil, add ½ tsp black pepper and extra ginger. Keep the gravy thin.',
    },
  },
  {
    id: 'pepperchicken', name: 'Pepper chicken fry (shallow)', type: 'nonveg', time: '40 min',
    match: /pepper fry/i,
    ing: ['250 g chicken, small pieces', '¼ tsp turmeric', 'Salt', '1 tsp ginger-garlic paste', '1 tsp black pepper, freshly crushed', '½ tsp fennel powder', '1 small onion, sliced', 'Curry leaves', '1 tbsp oil'],
    steps: ['Marinate chicken with turmeric, salt and ginger-garlic paste for 20 minutes.', 'Cook in a covered pan with ¼ cup water until tender and dry.', 'Heat oil, fry onion and curry leaves until soft, add the chicken.', 'Add pepper and fennel and toss on medium heat until coated. No deep frying.'],
    adjust: {
      V: 'Use half the pepper and keep it a little moist. Eat with rice and dal.',
      P: 'Pepper fry is heating. Keep pepper to ½ tsp, add more fennel, and eat at lunch only.',
      K: 'Suits Kapha as written. Use very little oil.',
    },
  },
  {
    id: 'fishcurry', name: 'Mild fish or prawn curry', type: 'nonveg', time: '30 min',
    match: /fish curry|prawns curry/i,
    ing: ['250 g fish pieces (rohu, seer) or cleaned prawns', '¼ tsp turmeric and salt to marinate', '½ cup coconut paste or thin coconut milk', '1 small onion and 1 tomato, chopped', '1 tsp coriander powder', 'Small piece tamarind, soaked (optional)', 'Curry leaves', '1 tbsp oil'],
    steps: ['Rub fish with turmeric and salt and keep 10 minutes.', 'Heat oil, add curry leaves, onion and tomato, cook until soft.', 'Add coriander powder, coconut and ½ cup water (and tamarind if using). Simmer 5 minutes.', 'Slide in the fish and cook gently 6–8 minutes (prawns 4–5) without stirring hard.'],
    adjust: {
      V: 'Use coconut milk and skip tamarind. Serve warm with rice.',
      P: 'Skip tamarind and red chilli, use coconut milk and plenty of coriander. Keep fish for lunch.',
      K: 'Use less coconut, add pepper and ginger. Steamed or grilled fish suits Kapha even better.',
    },
  },
  {
    id: 'eggcurry', name: 'Mild tomato egg curry', type: 'egg', time: '25 min',
    match: /egg curry/i,
    ing: ['3–4 boiled eggs, peeled', '1 onion, chopped', '2 tomatoes, pureed', '½ tsp ginger paste', '¼ tsp turmeric', '1 tsp coriander powder', '½ tsp cumin powder', 'Salt', '1 tbsp oil', 'Coriander leaves'],
    steps: ['Make shallow slits on the eggs.', 'Heat oil, cook onion until golden, add ginger paste.', 'Add tomato puree and powders and cook until thick.', 'Add ½ cup water and salt, then the eggs. Simmer 5 minutes and finish with coriander.'],
    adjust: {
      V: 'Keep a thick gravy with a spoon of ghee. Eat warm.',
      P: 'Use 1 tomato only and add 2 tbsp coconut milk. Skip chilli.',
      K: 'Use less oil and add a pinch of pepper. Egg whites plus one yolk is lighter.',
    },
  },
  {
    id: 'bhurji', name: 'Mild egg bhurji', type: 'egg', time: '10 min',
    match: /bhurji/i,
    ing: ['3 eggs', '1 small onion and 1 small tomato, chopped', 'Pinch of turmeric', '¼ tsp cumin seeds', 'Salt', '1 tsp ghee or oil', 'Coriander leaves'],
    steps: ['Heat ghee, add cumin, then onion and cook until soft.', 'Add tomato, turmeric and salt and cook 2 minutes.', 'Pour in beaten eggs and stir gently on low heat until just set.', 'Finish with coriander.'],
    adjust: {
      V: 'Cook in ghee and keep it soft, not dry.',
      P: 'Skip green chilli and go light on onion.',
      K: 'Use little oil, add pepper and more tomato and onion.',
    },
  },
  {
    id: 'paneer', name: 'Paneer sabzi / palak paneer', type: 'veg', time: '25 min',
    match: /paneer/i,
    ing: ['150 g paneer, cubed', 'For palak paneer: 2 cups palak, blanched and pureed', '1 small onion, 1 tomato, chopped', '½ tsp ginger paste', '½ tsp cumin seeds', '¼ tsp turmeric', '1 tsp coriander powder', 'Salt', '1 tsp ghee'],
    steps: ['Heat ghee, add cumin, then onion and ginger. Cook until soft.', 'Add tomato and powders and cook until soft.', 'Add palak puree (for palak paneer) or ½ cup water, and salt. Simmer 3 minutes.', 'Add paneer and warm through for 2 minutes. Do not overcook or it turns rubbery.'],
    adjust: {
      V: 'Soak paneer cubes in warm water for 5 minutes first so they stay soft.',
      P: 'Paneer suits Pitta. Skip chilli and go light on tomato; add a spoon of cream or milk if you like.',
      K: 'Paneer is heavy for Kapha. Use half the paneer, more palak, and add pepper and ginger.',
    },
  },
  {
    id: 'mutton', name: 'Mild mutton curry', type: 'nonveg', time: '1 hr',
    match: /mutton curry/i,
    ing: ['250 g mutton, small pieces', '1 onion, sliced', '1 tomato, chopped', '1 tsp ginger-garlic paste', '¼ tsp turmeric', '1 tsp coriander powder', '½ tsp garam masala', 'Salt', '1 tbsp oil'],
    steps: ['Pressure cook mutton with turmeric, salt and 1 cup water for 5–6 whistles.', 'Heat oil, cook onion until golden, add ginger-garlic paste.', 'Add tomato and powders and cook until oil separates.', 'Add the mutton with its stock and simmer 10 minutes.'],
    adjust: {
      V: 'Mutton suits Vata. Keep a good amount of gravy and eat it at lunch.',
      P: 'Skip red chilli, use very little garam masala and plenty of coriander leaves. Eat small portions.',
      K: 'Mutton is heavy for Kapha. Keep portions small, trim fat, and add pepper and ginger.',
    },
  },
  {
    id: 'pulao', name: 'Vegetable pulao', type: 'veg', time: '30 min',
    match: /pulao/i,
    ing: ['1 cup basmati rice or foxtail millet, soaked 20 min', '1 cup mixed vegetables (beans, carrot, peas)', '2 cups water (millet: 2½)', '1 bay leaf, 2 cloves, 1 small cinnamon, 2 cardamom', '½ tsp cumin seeds', 'Salt', '1 tsp ghee'],
    steps: ['Heat ghee, add whole spices and cumin.', 'Add vegetables and cook 2 minutes.', 'Add rice (or millet), water and salt.', 'Pressure cook 2 whistles, or cook covered on low until done.'],
    adjust: {
      V: 'Use basmati rice and add 1 extra tsp ghee.',
      P: 'Skip the cloves and add a handful of mint and coriander.',
      K: 'Use foxtail millet, very little ghee, more vegetables and a pinch of pepper.',
    },
  },
  {
    id: 'ragimalt', name: 'Ragi malt', type: 'veg', time: '10 min',
    match: /ragi malt/i,
    ing: ['2 tbsp ragi flour', '1 cup water', '½ cup milk', '1–2 tsp jaggery', 'Pinch of cardamom powder'],
    steps: ['Mix ragi flour in ¼ cup cold water until smooth, no lumps.', 'Boil the rest of the water, pour in the ragi mix while stirring.', 'Cook on low 4–5 minutes until it thickens and turns glossy.', 'Add milk, jaggery and cardamom. Warm through and serve.'],
    adjust: {
      V: 'Add a spoon of ghee and drink it warm.',
      P: 'Suits Pitta well. Let it cool to warm, not hot.',
      K: 'Skip the milk (use all water) and add a pinch of dry ginger instead of jaggery.',
    },
  },
  {
    id: 'chutney', name: 'Coconut chutney', type: 'veg', time: '10 min',
    match: /coconut chutney/i,
    ing: ['½ cup fresh grated coconut', '1 tbsp roasted chana dal (putnalu)', 'Small piece ginger', 'Salt', 'Water to grind', '½ tsp oil, ½ tsp mustard seeds, curry leaves to temper'],
    steps: ['Grind coconut, chana dal, ginger and salt with a little water until smooth.', 'Heat oil, add mustard and curry leaves and pour over.'],
    adjust: {
      V: 'Add more ginger and serve at room temperature, not cold.',
      P: 'Skip green chilli completely and add a few coriander leaves while grinding.',
      K: 'Use less coconut and more roasted dal, and add a pinch of pepper.',
    },
  },
  {
    id: 'milk', name: 'Spiced warm milk', type: 'veg', time: '5 min',
    match: /warm milk|badam milk|almond-date milk/i,
    ing: ['1 cup milk', '¼ cup water', 'Pinch of cardamom (or turmeric, or a few crushed almonds, or 2 chopped dates)', 'Optional: ½ tsp jaggery'],
    steps: ['Bring milk and water to a boil.', 'Add the spice or almonds/dates and simmer 2 minutes.', 'Drink warm, on its own. Keep it away from sour fruit, salty food and fish, as the app suggests.'],
    adjust: {
      V: 'Almonds or dates and a pinch of nutmeg suit Vata at bedtime.',
      P: 'Cardamom and a few dates suit Pitta. Drink it warm, not very hot.',
      K: 'Use more water, add a pinch of dry ginger or turmeric, and skip the sweetener.',
    },
  },
  {
    id: 'sundal', name: 'Sundal', type: 'veg', time: '15 min + soaking',
    match: /sundal/i,
    ing: ['1 cup chickpeas, soaked overnight and pressure cooked', '1 tsp oil', '½ tsp mustard seeds', 'Pinch of hing', 'Curry leaves', 'Salt', '2 tbsp grated coconut'],
    steps: ['Heat oil, add mustard, hing and curry leaves.', 'Add the cooked chickpeas and salt and toss for 2 minutes.', 'Turn off the heat and mix in grated coconut.'],
    adjust: {
      V: 'Chickpeas are drying for Vata. Cook them very soft and add ghee and extra hing.',
      P: 'Suits Pitta. Use more coconut, skip chilli.',
      K: 'Suits Kapha. Use less coconut and add pepper.',
    },
  },
  {
    id: 'paratha', name: 'Stuffed paratha (aloo, palak, methi)', type: 'veg', time: '35 min',
    match: /paratha/i,
    ing: ['1 cup atta', 'Filling: 1 boiled mashed potato, or 1 cup chopped palak or methi', '¼ tsp cumin seeds, ¼ tsp ajwain', 'Salt', 'Coriander leaves', 'Ghee for cooking'],
    steps: ['Knead atta with water and salt into a soft dough. For palak/methi, knead the greens into the dough.', 'For aloo, mix potato with cumin, ajwain, salt and coriander.', 'Stuff a dough ball with filling, seal and roll gently.', 'Cook on a hot tawa with a little ghee on both sides.'],
    adjust: {
      V: 'Aloo or palak with generous ghee suits Vata.',
      P: 'Palak or methi with a light brush of ghee. Skip green chilli in the filling.',
      K: 'Methi paratha with very little ghee and extra ajwain suits Kapha. Have one, not two.',
    },
  },
  {
    id: 'dalia', name: 'Vegetable dalia', type: 'veg', time: '25 min',
    match: /vegetable dalia/i,
    ing: ['½ cup dalia (broken wheat)', '1 cup chopped carrot, beans, peas', '2 cups water', '1 tsp ghee', '½ tsp cumin seeds', 'Pinch of hing and turmeric', 'Salt'],
    steps: ['Dry roast dalia for 3 minutes.', 'Heat ghee, add cumin, hing and vegetables.', 'Add dalia, turmeric, salt and water.', 'Pressure cook 3 whistles, or cook covered 15 minutes until soft.'],
    adjust: {
      V: 'Add extra water to keep it porridge-like, and a spoon of ghee on top.',
      P: 'Suits Pitta. Add coriander at the end.',
      K: 'Use more vegetables, less ghee, and add pepper and ginger.',
    },
  },
  {
    id: 'waters', name: 'Warm digestive waters (jeera, ginger, fennel)', type: 'veg', time: '5 min',
    match: /jeera water|ginger water|dry ginger|fennel seeds/i,
    ing: ['2 cups water', '1 tsp cumin seeds, or 1 small piece ginger, or 1 tsp fennel seeds'],
    steps: ['Boil water with the seeds or ginger for 5 minutes.', 'Strain and sip warm.'],
    adjust: {
      V: 'Ginger or cumin water, sipped warm, suits Vata.',
      P: 'Fennel or cumin water suits Pitta. Skip ginger or keep it very mild, and drink it warm, not hot.',
      K: 'Ginger water suits Kapha best, especially in the morning.',
    },
  },
];

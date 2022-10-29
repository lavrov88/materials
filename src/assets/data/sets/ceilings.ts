export default [
  {
    title: 'Металлические потолочные каркасы',
    shortName: 'ceilFrames',
    unit: 'м2',
    sortRange: 3010,
    materials: [
      { material: 161382, amount: 0.026 }, // Дюбель-гвоздь 6*50
      { material: 129589, amount: 0.5 }, // ПН-профиль 28/27
      { material: 669848, amount: 1.3 }, // Подвес прямой для ПП-профилей 60х27
      { material: 129588, amount: 3.2 }, // ПП-профиль 60/27
      { material: 126402, amount: 0.07 }, // Саморезы черные клопы 3,9х11 (острые)
      { material: 670297, amount: 3.2 }, // Соединитель одноуровневый для ПП 60х27
    ]
  },
  {
    title: 'Зашивка потолка гипсокартоном',
    shortName: 'gklv9',
    unit: 'м2',
    sortRange: 3110,
    materials: [
      { material: 624957, amount: 0.7 }, // ГКЛВ 9.5
      { material: 107195, amount: 0.22 }, // Саморез черн. 3,5*25 по металл
    ]
  },
  {
    title: 'Шпаклевка потолка под покраску',
    shortName: 'ceilPutty',
    unit: 'м2',
    sortRange: 3210,
    materials: [
      { material: 157965, amount: 0.022 }, // Грунтовка Кнауф Тифенгрунд 10 л
      { material: 107945, amount: 0.022 }, // Малярный стеклохолст Oscar-эконом 50 м2
      { material: 168212, amount: 0.024 }, // Клей Oscar для стеклохолста 10 кг
      { material: 135469, amount: 0.156 }, // Шпаклевка финишная Knauf Ротбанд Профи паста 18 кг
    ]
  },
]

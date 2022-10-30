export default [
  {
    title: 'Металлические каркасы перегородок',
    shortName: 'wallFrame',
    unit: 'м2',
    sortRange: 2010,
    materials: [
      { material: 106203, amount: 0.47 },
      { material: 113522, amount: 1.33 },
      { material: 161383, amount: 0.04 },
      { material: 150826, amount: 0.08 },
      { material: 505706, amount: 0.08 },
    ]
  },
  {
    title: 'Перегородки в 1/2 кирпича',
    shortName: 'brick05',
    unit: 'м2',
    sortRange: 2020,
    materials: [
      { material: 679215, amount: 53 }, // Кирпич строительный одинарный полнотелый М-150
      { material: 502737, amount: 0.8 }, // Смесь цементно-песчаная (ЦПС) М150 ЯЗСМ 50кг
      { material: 637173, amount: 0.05 }, // Сетка дорожная 100*100 или 150*150 (5 мм)
    ]
  },
  {
    title: 'Перегородки в 1 кирпич',
    shortName: 'brick1',
    unit: 'м2',
    sortRange: 2021,
    materials: [
      { material: 679215, amount: 106 }, // Кирпич строительный одинарный полнотелый М-150
      { material: 502737, amount: 1.6 }, // Смесь цементно-песчаная (ЦПС) М150 ЯЗСМ 50кг
      { material: 637173, amount: 0.1 }, // Сетка дорожная 100*100 или 150*150 (5 мм)
    ]
  },
  {
    title: 'Перегородки из газобетона 100 мм',
    shortName: 'block10',
    unit: 'м2',
    sortRange: 2030,
    materials: [
      { material: 687533, amount: 7 }, // Газобетон 100х250х625 мм D500
      { material: 142843, amount: 0.23 }, // Клей для блоков и плит (RS-I) 25кг
    ]
  },
  {
    title: 'Перегородки из газобетона 150 мм',
    shortName: 'block15',
    unit: 'м2',
    sortRange: 2031,
    materials: [
      { material: 687534, amount: 7 }, // Газобетон 150х250х625 мм D500
      { material: 142843, amount: 0.35 }, // Клей для блоков и плит (RS-I) 25кг
    ]
  },
  {
    title: 'Утепление перегородок минеральной ватой',
    shortName: 'wallWarm',
    unit: 'м2',
    sortRange: 2110,
    materials: [
      { material: 106942, amount: 0.191 }, // Утеплитель
    ]
  },
  {
    title: 'Зашивка перегородок гипсокартоном',
    shortName: 'gklv12',
    unit: 'м2',
    sortRange: 2210,
    materials: [
      { material: 101932, amount: 0.7 }, // ГКЛВ 12.5
      { material: 107195, amount: 0.22 }, // Саморез черн. 3,5*25 по металл
    ]
  },
  {
    title: 'Штукатурка стен 20 мм',
    shortName: 'plast2',
    unit: 'м2',
    sortRange: 2312,
    materials: [
      { material: 106958, amount: 0.57 },
    ]
  },
  {
    title: 'Штукатурка стен 30 мм',
    shortName: 'plast3',
    unit: 'м2',
    sortRange: 2313,
    materials: [
      { material: 106958, amount: 0.85 },
    ]
  },
  {
    title: 'Штукатурка стен 40 мм',
    shortName: 'plast4',
    unit: 'м2',
    sortRange: 2314,
    materials: [
      { material: 106958, amount: 1.14 },
    ]
  },
  {
    title: 'Шпаклевка cтен под покраску',
    shortName: 'wallPutty',
    unit: 'м2',
    sortRange: 3410,
    materials: [
      { material: 157965, amount: 0.022 }, // Грунтовка Кнауф Тифенгрунд 10 л
      { material: 107945, amount: 0.022 }, // Малярный стеклохолст Oscar-эконом 50 м2
      { material: 168212, amount: 0.024 }, // Клей Oscar для стеклохолста 10 кг
      { material: 135469, amount: 0.156 }, // Шпаклевка финишная Knauf Ротбанд Профи паста 18 кг
    ]
  },
]

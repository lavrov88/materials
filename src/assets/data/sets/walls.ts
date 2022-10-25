export default [
  {
    title: 'Металлические каркасы перегородок',
    shortName: 'metFrame',
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
    shortName: 'aerocrete100',
    unit: 'м2',
    sortRange: 2030,
    materials: [
      { material: 687533, amount: 7 }, // Газобетон 100х250х625 мм D500
      { material: 142843, amount: 0.23 }, // Клей для блоков и плит (RS-I) 25кг
    ]
  },
  {
    title: 'Перегородки из газобетона 150 мм',
    shortName: 'aerocrete150',
    unit: 'м2',
    sortRange: 2031,
    materials: [
      { material: 687534, amount: 7 }, // Газобетон 150х250х625 мм D500
      { material: 142843, amount: 0.35 }, // Клей для блоков и плит (RS-I) 25кг
    ]
  },
]

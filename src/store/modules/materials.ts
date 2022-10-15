import { Getters, Mutations, Actions, Module, createComposable } from 'vuex-smart-module'

class MaterialState {
  137076 = {
    name: 'Гидроизоляция рулонная',
    title: 'Технониколь Стеклоизол Р ХПП',
    id: 137076,
    unit: 'рул.',
    price: 680,
    priceDate: '2022-10-14'
  }
  104724 = {
    name: 'Мастика резинобитумная',
    title: 'Bitumast 18 кг/21,5 л',
    id: 104724,
    unit: 'шт.',
    price: 3822,
    priceDate: '2022-10-14'
  }

  170040 = {
    name: 'Экструдированный пенополистирол',
    title: 'Пеноплэкс Фундамент 50х585х1185 мм',
    id: 170045,
    unit: 'л.',
    price: 355,
    priceDate: '2022-10-02'
  }
  506118 = {
    name: 'Экструдированный пенополистирол',
    title: 'Пеноплэкс Фундамент 100х585х1185 мм',
    id: 506118,
    unit: 'л.',
    price: 729,
    priceDate: '2022-10-14'
  }
  139532 = {
    name: 'Клей для пенополистирола',
    title: 'Penoplex Fastfix 750 мл',
    id: 139532,
    unit: 'шт.',
    price: 641,
    priceDate: '2022-10-02'
  }
  678025 = {
    name: 'Пена монтажная профессиональная ',
    title: 'Makroflex Мега 65 Pro летняя 850 мл',
    id: 678025,
    unit: 'шт.',
    price: 848,
    priceDate: '2022-10-14'
  }
  1514171 = {
    name: 'Керамзит',
    title: 'фракция 10-20 мм 0,05 куб.м',
    id: 1514171,
    unit: 'шт.',
    price: 159,
    priceDate: '2022-10-14'
  }
}

class MaterialGetters extends Getters<IMaterialState> {
  get materials() {
    return this.state
  }
}

const materials = new Module({
  state: MaterialState,
  getters: MaterialGetters
})

export const useMaterials = createComposable(materials)
export default materials

export type IMaterialState = {
  [key in MaterialId]: MaterialItem
}

export type MaterialId = keyof MaterialState

export interface MaterialItem {
  name: string
  title: string
  id: MaterialId,
  unit: string,
  price: number,
  priceDate: string
}

// export type MaterialId = 137076 | 104724 | 170040 | 139532
import { Getters, Mutations, Actions, Module, createComposable } from 'vuex-smart-module'
import type { MaterialId } from "./materials"

class SetsState {
  floorWaterproofing = {
    name: 'Устройство рулонной гидроизоляции',
    unit: 'м2',
    type: {
      name: 'floors',
      title: 'Полы'
    },
    materials: [
      { material: 137076, amount: 0.16 },
      { material: 104724, amount: 0.028 }
    ]
  }
  floorWarming50 = {
    name: 'Утепление пола пенополистиролом 50 мм',
    unit: 'м2',
    type: {
      name: 'floors',
      title: 'Полы'
    },
    materials: [
      { material: 170040, amount: 1.59 },
      { material: 139532, amount: 0.17 },
      { material: 678025, amount: 0.02 },
      { material: 1514171, amount: 0.022 },
    ]
  }
  floorWarming100 = {
    name: 'Утепление пола пенополистиролом 100 мм',
    unit: 'м2',
    type: {
      name: 'floors',
      title: 'Полы'
    },
    materials: [
      { material: 506118, amount: 1.59 },
      { material: 139532, amount: 0.17 },
      { material: 678025, amount: 0.02 },
      { material: 1514171, amount: 0.022 },
    ]
  }
  floorWarming101 = {
    name: 'Утепление пола пенополистиролом 100 мм',
    unit: 'м2',
    type: {
      name: 'floors',
      title: 'Полы'
    },
    materials: [
      { material: 506118, amount: 1.59 },
      { material: 139532, amount: 0.17 },
      { material: 678025, amount: 0.02 },
      { material: 1514171, amount: 0.022 },
    ]
  }
  floorWarming102 = {
    name: 'Утепление пола пенополистиролом 100 мм',
    unit: 'м2',
    type: {
      name: 'floors',
      title: 'Полы'
    },
    materials: [
      { material: 506118, amount: 1.59 },
      { material: 139532, amount: 0.17 },
      { material: 678025, amount: 0.02 },
      { material: 1514171, amount: 0.022 },
    ]
  }
  floorWarming103 = {
    name: 'Утепление пола пенополистиролом 100 мм',
    unit: 'м2',
    type: {
      name: 'floors',
      title: 'Полы'
    },
    materials: [
      { material: 506118, amount: 1.59 },
      { material: 139532, amount: 0.17 },
      { material: 678025, amount: 0.02 },
      { material: 1514171, amount: 0.022 },
    ]
  }
  floorWarming104 = {
    name: 'Утепление пола пенополистиролом 100 мм',
    unit: 'м2',
    type: {
      name: 'floors',
      title: 'Полы'
    },
    materials: [
      { material: 506118, amount: 1.59 },
      { material: 139532, amount: 0.17 },
      { material: 678025, amount: 0.02 },
      { material: 1514171, amount: 0.022 },
    ]
  }
  wallWarming100 = {
    name: 'Утепление стен пенополистиролом 100 мм',
    unit: 'м2',
    type: {
      name: 'walls',
      title: 'Стены'
    },
    materials: [
      { material: 506118, amount: 1.59 },
      { material: 139532, amount: 0.17 },
      { material: 678025, amount: 0.02 },
      { material: 1514171, amount: 0.022 },
    ]
  }
}

class SetsGetters extends Getters<ISetsState> {
  get sets() {
    return this.state
  }

  get types() {
    const types = [] as SetItemType[]
    const setsValues = Object.values(this.getters.sets)

    setsValues.forEach(set => {
      const setType = set.type
      const typeExists = types.find(t => t.name === set.type.name)

      if (!typeExists) {
        types.push(setType)
      }
    })

    return types
  }
}

const sets = new Module({
  state: SetsState,
  getters: SetsGetters
})

export const useSets = createComposable(sets)
export default sets

export type ISetsState = {
  [key in SetKey]: SetItem
}

export interface SetItemType {
  name: string,
  title: string
}

export interface SetItem {
  name: string
  unit: string
  type: SetItemType
  materials: Array<SetMaterials>
}

export interface SetMaterials {
  material: MaterialId
  amount: number
}

export type SetKey = keyof SetsState
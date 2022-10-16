import type { Store } from 'vuex'
import { Getters, Mutations, Actions, Module, createComposable, Context } from 'vuex-smart-module'
import sets, { type SetKey, type SetItem } from './sets'
import materials, { type IMaterialState, type MaterialItem } from './materials'

class WorksState {
  works = [] as WorkItem[]
  computedMaterials = [] as TComputedMaterialItem[]
}

class WorksGetters extends Getters<IWorksState> {
  setsContext!: Context<typeof sets>
  materialsContext!: Context<typeof materials>

  $init(store: Store<any>): void {
    this.setsContext = sets.context(store)
    this.materialsContext = materials.context(store)
  }

  get works() {
    return this.state.works
  }

  get sets() {
    return this.setsContext.getters.sets;
  }

  get materials() {
    return this.materialsContext.getters.materials;
  }

  get computedMaterials() {
    const works = this.getters.works
    const materials = this.getters.materials
    const computed: TComputedMaterialItem[] = []

    works.forEach(work => {
      const workAmount = work.amount
      const workMaterials = work.set.materials

      workMaterials.forEach(wm => {
        const materialItem = materials[wm.material]
        const unitAmount = wm.amount
        const totalAmount = Math.ceil(unitAmount * workAmount)
        const totalPrice = totalAmount * materialItem.price
        const materialExists = computed.find(m => m.material.id === wm.material)

        if (materialExists) {
          materialExists.amount += totalAmount
          materialExists.totalPrice += totalPrice
        } else {
          computed.push({
            material: materialItem,
            amount: totalAmount,
            totalPrice
          })
        }
      })
    })

    return computed
  }

  get computedMaterialsGrouped() {
    const works = this.getters.works
    const materials = this.getters.materials
    const computed: TComputedMaterialGroup[] = []

    works.forEach(work => {
      const workAmount = work.amount
      const workMaterials = work.set.materials
      const groupObj = {
        name: work.set.name,
        unit: work.set.unit,
        amount: workAmount,
        price: 0,
        totalPrice: 0,
        materials: [] as TComputedMaterialItem[]
      }

      workMaterials.forEach(wm => {
        const materialItem = materials[wm.material]
        const unitAmount = wm.amount
        const totalAmount = Math.ceil(unitAmount * workAmount)
        const totalPrice = totalAmount * materialItem.price
        groupObj.totalPrice += totalPrice

        groupObj.materials.push({
          material: materialItem,
          amount: totalAmount,
          totalPrice
        })
      })

      groupObj.price = groupObj.amount ?
                       Math.round(groupObj.totalPrice / groupObj.amount) :
                       0
      computed.push(groupObj)
    })

    return computed
  }

  get computedMaterialsTotalPrice() {
    return this.getters.computedMaterials.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    )
  }
}

class WorkMutations extends Mutations<IWorksState> {
  addWork(payload: WorkItem) {
    this.state.works.push(payload)
  }

  deleteWork(payload: number) {
    this.state.works.splice(payload, 1)
  }

  changeWorkAmount(payload: IChangeWorkAmount) {
    const { index, amount } = payload
    this.state.works[index].amount = amount
  }
}

class WorksActions extends Actions<
  WorksState, WorksGetters, WorkMutations, WorksActions
> {
  addWork({setKey, amount}: {setKey: SetKey, amount: number}) {
    const set = this.getters.sets[setKey]
    this.commit('addWork', { set, amount })
  }

  changeWorkAmount(payload: IChangeWorkAmount) {
    this.commit('changeWorkAmount', payload)
  }
}

const works = new Module({
  state: WorksState,
  getters: WorksGetters,
  mutations: WorkMutations,
  actions: WorksActions
})

export const useWorks = createComposable(works)
export default works

export type IWorksState = {
  works: WorkItem[]
  computedMaterials: TComputedMaterialItem[]
}

export type TComputedMaterialItem = {
  material: MaterialItem
  amount: number
  totalPrice: number
}

export type TComputedMaterialGroup = {
  name: string
  unit: string
  amount: number
  price: number
  totalPrice: number
  materials: TComputedMaterialItem[]
}

export interface WorkItem {
  set: SetItem
  amount: number
}

export interface IChangeWorkAmount {
  index: number
  amount: number
}
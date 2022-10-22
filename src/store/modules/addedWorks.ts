import type { Store } from 'vuex';
import { Getters, Mutations, Actions, Module, createComposable, Context } from 'vuex-smart-module';
import sets from './sets';
import materials from './materials';
import type { IWorksState, IWorkItem, IComputedMaterialItem, IComputedMaterialGroup, IChangeWorkAmount, IAddWorkPayload, IWorksByTypeItem, IWorkTypeItem } from '@/types/works';
import type { TSetsTypes } from '@/types/sets';
import { generateId } from '@/ultils/ultils';

class WorksState {
  works = [] as IWorkItem[]
  computedMaterials = [] as IComputedMaterialItem[]
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

  get worksByType() {
    const workTypes = Object.keys(this.getters.sets) as TSetsTypes[]
    const allWorks = this.getters.works
    const worksByType = [] as IWorksByTypeItem[]

    workTypes.forEach(wt => {
      worksByType.push({
        workType: wt,
        works: allWorks.filter(w => w.workType === wt)
      })
    })
    return worksByType
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
    const computed: IComputedMaterialItem[] = []

    works.forEach(work => {
      const workAmount = work.amount
      const workMaterials = work.set.materials

      workMaterials.forEach(wm => {
        const materialItem = materials.find(m => m.id === wm.material)
        if (!materialItem) {
          return
        }

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
    computed.sort((a, b) => a.totalPrice < b.totalPrice ? 1 : -1)

    return computed
  }

  get computedMaterialsGrouped() {
    const worksByType = this.getters.worksByType

    const materials = this.getters.materials
    const computed: IWorkTypeItem[] = []

    worksByType.forEach(wbt => {
      const { works, workType } = wbt
      const workTypeObj = {
        workType,
        works: [] as IComputedMaterialGroup[]
      }

      works.forEach(work => {
        const workAmount = work.amount
        const workMaterials = work.set.materials
        const groupObj = {
          title: work.set.title,
          unit: work.set.unit,
          amount: workAmount,
          price: 0,
          totalPrice: 0,
          materials: [] as IComputedMaterialItem[]
        }
  
        workMaterials.forEach(wm => {
          const materialItem = materials.find(m => m.id === wm.material)
          if (!materialItem) {
            return
          }
  
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
        workTypeObj.works.push(groupObj)
      })

      computed.push(workTypeObj)
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
  addWork(payload: IWorkItem) {
    this.state.works.push(payload)
  }

  deleteWork(payload: string) {
    this.state.works = this.state.works.filter(w => w.id !== payload)
  }

  clearWorks() {
    this.state.works = []
  }

  sortWorks() {
    this.state.works = [...this.state.works].sort((a, b) => {
      if (a.set.sortRange > b.set.sortRange) return 1
      if (a.set.sortRange < b.set.sortRange) return -1
      if (a.id > b.id) return 1
      if (a.id < b.id) return -1
      return 0
      // return a.set.sortRange > b.set.sortRange ? 1 : -1
    })
  }

  changeWorkAmount(payload: IChangeWorkAmount) {
    const { id, amount } = payload
    const workItem = this.state.works.find(w => w.id === id)
    if (workItem) {
      workItem.amount = amount
    }
  }
}

class WorksActions extends Actions<
  WorksState, WorksGetters, WorkMutations, WorksActions
> {
  addWork({workType, setTitle, amount}: IAddWorkPayload) {
    const set = this.getters.sets[workType].find(set => set.title === setTitle)
    if (set) {
      this.commit('addWork', {
        id: generateId(),
        workType,
        set,
        amount
      })
      this.commit('sortWorks')
    }
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

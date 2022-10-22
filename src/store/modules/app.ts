import { Getters, Mutations, Actions, Module, createComposable } from 'vuex-smart-module'

class AppState {
  optionsAreOpen = false
  mainTable = {
    materialsAreGrouped: true
  }
}

class AppGetters extends Getters<IAppState> {
  get optionsAreOpen() {
    return this.state.optionsAreOpen
  }
  get materialsAreGrouped() {
    return this.state.mainTable.materialsAreGrouped
  }
}

class AppMutations extends Mutations<IAppState> {
  toggleOptions() {
    this.state.optionsAreOpen = !this.state.optionsAreOpen
  }
  toggleGroupedMaterials(payload?: boolean) {
    let option = this.state.mainTable.materialsAreGrouped
    if (payload === undefined) {
      this.state.mainTable.materialsAreGrouped = !option
    } else {
      this.state.mainTable.materialsAreGrouped = payload
    }
  }
}

const app = new Module({
  state: AppState,
  getters: AppGetters,
  mutations: AppMutations
})

export const useApp = createComposable(app)
export default app

export interface IAppState {
  optionsAreOpen: boolean
  mainTable: {
    materialsAreGrouped: boolean
  }
}
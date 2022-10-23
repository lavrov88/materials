import type { IAppState } from '@/types/app'
import { Getters, Mutations, Actions, Module, createComposable } from 'vuex-smart-module'

class AppState {
  mobileLayout = false
  tabletLayout = false
  mobileMenus = {
    works: false,
    options: false
  }

  optionsAreOpen = false

  mainTable = {
    materialsAreGrouped: true
  }
}

class AppGetters extends Getters<IAppState> {
  get mobileLayout() {
    return this.state.mobileLayout
  }

  get tabletLayout() {
    return this.state.tabletLayout
  }

  get mobileMenus() {
    return this.state.mobileMenus
  }

  get optionsAreOpen() {
    return this.state.optionsAreOpen
  }

  get materialsAreGrouped() {
    return this.state.mainTable.materialsAreGrouped
  }
}

class AppMutations extends Mutations<IAppState> {
  toggleMobileLayout(value: boolean) {
    this.state.mobileLayout = value
  }

  toggleTabletLayout(value: boolean) {
    this.state.tabletLayout = value
  }

  toggleMobileWorks(value: boolean) {
    this.state.mobileMenus.works = value
  }

  toggleMobileOptions(value: boolean) {
    this.state.mobileMenus.options = value
  }

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

class AppActions extends Actions<
  AppState, AppGetters, AppMutations, AppActions
> {}

const app = new Module({
  state: AppState,
  getters: AppGetters,
  mutations: AppMutations,
  actions: AppActions
})

export const useApp = createComposable(app)
export default app

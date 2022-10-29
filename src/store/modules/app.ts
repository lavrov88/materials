import type { IAppState, TMainScrollbarEl, TMaterialsTitles } from '@/types/app'
import { Getters, Mutations, Actions, Module, createComposable } from 'vuex-smart-module'

class AppState {
  mobileLayout = false
  tabletLayout = false
  mobileMenus = {
    works: false,
    options: false
  }

  appIsInitialized = false
  addWorkDialogIsOpen = false
  optionsAreOpen = false

  mainTable = {
    materialsAreGrouped: true,
    materialsTitles: 'tooltip',
    mainScrollbarEl: null as TMainScrollbarEl
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

  get appIsInitialized() {
    return this.state.appIsInitialized
  }

  get addWorkDialogIsOpen() {
    return this.state.addWorkDialogIsOpen
  }

  get optionsAreOpen() {
    return this.state.optionsAreOpen
  }

  get materialsAreGrouped() {
    return this.state.mainTable.materialsAreGrouped
  }

  get materialsTitles() {
    return this.state.mainTable.materialsTitles
  }

  get mainScrollbarEl() {
    return this.state.mainTable.mainScrollbarEl
  }
}

class AppMutations extends Mutations<IAppState> {
  toggleMobileLayout(payload: boolean) {
    this.state.mobileLayout = payload
  }

  toggleTabletLayout(payload: boolean) {
    this.state.tabletLayout = payload
  }

  toggleMobileWorks(payload: boolean) {
    this.state.mobileMenus.works = payload
  }

  toggleMobileOptions(payload: boolean) {
    this.state.mobileMenus.options = payload
  }

  toggleAppIsInitialized() {
    this.state.appIsInitialized = !this.state.appIsInitialized
  }

  toggleAddWorkDialog(payload: boolean) {
    this.state.addWorkDialogIsOpen = payload
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

  toggleMaterialsTitles(payload: TMaterialsTitles) {
    this.state.mainTable.materialsTitles = payload
  }

  setMainScrollbarEl(payload: TMainScrollbarEl) {
    this.state.mainTable.mainScrollbarEl = payload
  }
}

class AppActions extends Actions<
  AppState, AppGetters, AppMutations, AppActions
> {
  toggleOptions() {
    const mainScroll = this.getters.mainScrollbarEl
    this.commit('toggleOptions')
    setTimeout(() => {
      mainScroll?.update()
    }, 400);
  }
}

const app = new Module({
  state: AppState,
  getters: AppGetters,
  mutations: AppMutations,
  actions: AppActions
})

export const useApp = createComposable(app)
export default app

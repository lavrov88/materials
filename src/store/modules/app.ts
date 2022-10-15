import { Getters, Mutations, Actions, Module, createComposable } from 'vuex-smart-module'

class AppState {
  updatesCounter = 0
}

class AppGetters extends Getters<IAppState> {
  get updatesCounter() {
    return this.state.updatesCounter
  }
}

class AppMutations extends Mutations<IAppState> {
  incrementCounter() {
    this.state.updatesCounter++
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
  updatesCounter: number
}

export type MaterialId = 170040 | 139532
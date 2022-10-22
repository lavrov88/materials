import FloorsSets from '@/assets/data/sets/floors'
import WallsSets from '@/assets/data/sets/walls'
import type { ISetsState } from '@/types/sets'
import { Getters, Module, createComposable } from 'vuex-smart-module'

export class SetsState {
  floors = FloorsSets
  walls = WallsSets
}

class SetsGetters extends Getters<ISetsState> {
  get sets() {
    return this.state
  }

  get types() {
    return Object.keys(this.state)
  }
}

const sets = new Module({
  state: SetsState,
  getters: SetsGetters
})

export const useSets = createComposable(sets)
export default sets
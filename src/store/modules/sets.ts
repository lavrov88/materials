import floorsSets from '@/assets/data/sets/floors'
import wallsSets from '@/assets/data/sets/walls'
import ceilingsSets from '@/assets/data/sets/ceilings'
import type { ISetsState } from '@/types/sets'
import { Getters, Module, createComposable } from 'vuex-smart-module'

export class SetsState {
  floors = floorsSets
  walls = wallsSets
  ceilings = ceilingsSets
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
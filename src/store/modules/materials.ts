import { Getters, Module, createComposable } from 'vuex-smart-module'
import materialItems from '@/assets/data/materials/materials'
import type { IMaterialsState } from '@/types/materials'

class MaterialState {
  materials = materialItems
}

class MaterialGetters extends Getters<IMaterialsState> {
  get materials() {
    return this.state.materials
  }
}

const materials = new Module({
  state: MaterialState,
  getters: MaterialGetters
})

export const useMaterials = createComposable(materials)
export default materials

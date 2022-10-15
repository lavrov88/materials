// import { createStore, type Module, type ModuleTree } from 'vuex'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'

import app from './modules/app'
import materials from './modules/materials'
import sets from './modules/sets'
import addedWorks from './modules/addedWorks'

const root = new Module({
  modules: {
    app,
    materials,
    sets,
    addedWorks
  }
})

export default createStore(root)

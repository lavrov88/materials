import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store/store'
import ElementPlus from 'element-plus'
import App from './App.vue'
import AppMain from './components/main/AppMain.vue'

import './assets/base.css'
import 'element-plus/dist/index.css'

const routes = [
  { path: '/', component: AppMain },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
  
createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')

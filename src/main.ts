import { createApp } from 'vue'
import store from './store/store'
import ElementPlus from 'element-plus'
import App from './App.vue'

import './assets/base.css'
import 'element-plus/dist/index.css'

createApp(App)
  .use(store)
  .use(ElementPlus)
  .mount('#app')

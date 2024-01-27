import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather'

import App from './App.vue'

import 'feather-icons'
import './assets/css/main.css'
import './assets/css/card.css'
import './assets/css/types.css'
import './assets/css/utils.css'

const pinia = createPinia()

const app = createApp(App)
app.component(VueFeather.name, VueFeather)
app.use(pinia)

app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'feather-icons'
import './assets/css/main.css'
import './assets/css/card.css'
import './assets/css/types.css'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

app.mount('#app')

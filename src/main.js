import './assets/main.css'
import router from './router'
// import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
// app.use(autoAnimatePlugin)
app.mount('#app')

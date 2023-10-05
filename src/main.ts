import { createApp } from 'vue'
import './main.sass'
import App from './main.vue'
import router from './router'

createApp(App)
.use(router)
.mount('#app')

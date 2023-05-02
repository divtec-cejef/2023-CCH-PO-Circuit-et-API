import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/main.scss'
import { createPinia } from 'pinia'
import VueQrcodeReader from "vue-qrcode-reader";
import "vue3-dropdown-navbar/preflight.css";

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(VueQrcodeReader);

app.mount('#app')

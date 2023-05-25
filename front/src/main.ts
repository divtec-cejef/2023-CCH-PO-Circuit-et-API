import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import'./assets/css/main.scss';
import { createPinia } from 'pinia';
import VueQrcodeReader from 'vue-qrcode-reader';
import vue3dLoader from 'vue-3d-loader';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(VueQrcodeReader);
app.use(vue3dLoader);
app.mount('#app');



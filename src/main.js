import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import gAuthPlugin from 'vue3-google-oauth2';

import './assets/main.scss';


const app = createApp(App);
let gauthClientId = "817163613918-nrgg7ft7qfj5jgoap350paivlt1df0ff.apps.googleusercontent.com";
app.use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', plugin_name: 'wixit',
//  fetch_basic_profile: false
 })

app.use(createPinia());
app.use(router);

app.mount('#app');

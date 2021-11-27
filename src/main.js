import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

import App from './App.vue';
import store from './store';
import router from './router';

createApp(App).use(store).use(router)
  .use(Quasar, quasarUserOptions)
  .mount('#app');

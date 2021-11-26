import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

import App from './App.vue';
import store from './store';
import router from './router';

createApp(App).use(Quasar, quasarUserOptions).use(router).use(store)
  .mount('#app');

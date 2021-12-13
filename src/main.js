import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

import App from './App.vue';
import store from './store';
import router from './router';

const checkLogin = async () => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (store.getters.isLoggedIn && (!session?.id || (+session?.expires * 1000) < Date.now())) await store.dispatch('logout');
};
checkLogin();

createApp(App).use(store).use(router)
  .use(Quasar, quasarUserOptions)
  .mount('#app');

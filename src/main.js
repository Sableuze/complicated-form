import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

import App from './App.vue';
import store from './store';
import router from './router';

const checkLogin = async () => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!store.getters.isLoggedIn) router.push({ name: 'Auth' });
  if (store.getters.isLoggedIn && (!session?.id || +session?.expires * 1000 < Date.now())) {
    await store.dispatch('logout');
    router.push({ name: 'Auth' });
  }
};
// prettier-ignore
createApp(App).use(store).use(router).use(Quasar, quasarUserOptions)
  .mount('#app');
checkLogin();

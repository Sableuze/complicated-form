import { createApp } from 'vue';
import { Notify, Quasar } from 'quasar';
import Ably from 'ably/callbacks';
import quasarUserOptions from './quasar-user-options';
import App from './App.vue';

import initNewStore from './store';
import initNewRouter from './router';
import initNewApi from './api/index';
import { redbox, dadata, authentication, database } from './api/http';

import connectApiAndInterceptors from './connectors/interceptors.connector';

import initNewWS from './utils/ws';
import initNewEventHandler from './utils/ablyWSEventHandler';
import { errorTypesDefault } from './helpers/validation/errorTypes';

import initNewDataReloader from './plugins/reloadData';

const getApp = () => {
  const ablyWS = initNewWS(Ably);
  const channel = ablyWS.channels.get('main');
  const api = initNewApi(redbox, dadata, authentication, database);
  const store = initNewStore(api, channel);
  const router = initNewRouter(store);
  const reloadData = initNewDataReloader(store);
  initNewEventHandler(channel, store, Notify);

  connectApiAndInterceptors(authentication, store, router, Notify, errorTypesDefault);
  connectApiAndInterceptors(database, store, router, Notify, errorTypesDefault);

  // eslint-disable-next-line no-use-before-define
  buildApp(store, router, reloadData);
};
const checkLogin = async (store, router) => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!store.getters.isLoggedIn) router.push({ name: 'Auth' });
  if (store.getters.isLoggedIn && (!session?.id || +session?.expires * 1000 < Date.now())) {
    await store.dispatch('logout');
    router.push({ name: 'Auth' });
  }
};

const buildApp = (store, router, reloadData) => {
  createApp(App).use(store).use(router).use(Quasar, quasarUserOptions)
    .provide('reloadData', reloadData)
    .mount('#app');
  checkLogin(store, router);
};
getApp();

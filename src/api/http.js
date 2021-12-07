import axios from 'axios';
import { Notify } from 'quasar';
import { dadataToken, authToken, db } from '@/api/tokens';

export const redbox = axios.create({
  baseURL: 'http://testwork.rdbx24.ru/api/',
});
export const dadata = axios.create({
  baseURL: 'https://suggestions.dadata.ru:443/suggestions/api/4_1/rs/suggest/address',
  params: {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${dadataToken}`,
    },
  },

});

export const authentication = axios.create({
  baseURL: 'https://api.m3o.com/v1/user',
  withCredentials: true,
});

authentication.defaults.headers.common['Content-Type'] = 'application/json';
authentication.defaults.headers.common.Authorization = `Bearer ${authToken}`;

export const database = axios.create({
  baseURL: 'https://api.m3o.com/v1/db',
  withCredentials: true,
});

database.defaults.headers.common['Content-Type'] = 'application/json';
database.defaults.headers.common.Authorization = `Bearer ${db}`;

export function addErrorHandler(fn) {
  authentication.interceptors.response.use((response) => response, fn);
  database.interceptors.response.use((response) => response, fn);
}

addErrorHandler((response) => {
  let text = 'Ошибка ответа от сервера';

  if ('vueAlert' in response.config) {
    text = ` ${response.config.vueAlert}`;
  }
  Notify.create({
    message: text,
    type: 'negative',
    position: 'top-right',
  });
  return { res: false };
});

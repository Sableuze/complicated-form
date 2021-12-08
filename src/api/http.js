import axios from 'axios';
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
export function addRequestHandler(fn) {
  authentication.interceptors.request.use(fn);
  database.interceptors.response.use(fn);
}
export function addResponseHandler(onSuccess, onError) {
  authentication.interceptors.response.use(onSuccess, onError);
  database.interceptors.response.use(onSuccess, onError);
}

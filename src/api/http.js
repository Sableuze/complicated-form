import axios from 'axios';
import { dadataToken, authToken } from '@/api/tokens';

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

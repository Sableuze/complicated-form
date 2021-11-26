import axios from 'axios';
import { dadataToken } from '@/api/tokens';

export const redbox = axios.create({
  token: 'e4182d30eca2db45b960d10c7703032c4ef3dbdb',
  baseURL: 'http://testwork.rdbx24.ru/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Token ${dadataToken}`,
  },
});
export const dadata = axios.create({
  baseURL: 'https://suggestions.dadata.ru:443/suggestions/api/4_1/rs/suggest/address',
});

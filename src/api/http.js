import axios from 'axios';

export const redbox = axios.create({
  baseURL: 'http://testwork.rdbx24.ru/api/',
});

export const dadata = axios.create({
  baseURL: process.env.VUE_APP_DADATA_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Token ${process.env.VUE_APP_DADATA_API_KEY}`,
  },
});

export const authentication = axios.create({
  baseURL: process.env.VUE_APP_AUTH_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_AUTH_API_KEY}`,
  },

});

export const database = axios.create({
  baseURL: process.env.VUE_APP_DB_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_DB_API_KEY}`,
  },
  timeout: 15000,

});

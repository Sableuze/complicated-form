import axios from 'axios';

export const redbox = axios.create({
  baseURL: 'http://testwork.rdbx24.ru/api/',
});
export const dadata = axios.create({
  baseURL: process.env.VUE_APP_DADATA_API_URL,
  params: {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${process.env.VUE_APP_DADATA_API_KEY}`,
    },
  },
});

export const authentication = axios.create({
  baseURL: process.env.VUE_APP_AUTH_API_URL,
  withCredentials: true,
});

authentication.defaults.headers.common['Content-Type'] = 'application/json';
authentication.defaults.headers.common.Authorization = `Bearer ${process.env.VUE_APP_AUTH_API_KEY}`;

export const database = axios.create({
  baseURL: process.env.VUE_APP_DB_API_URL,
  withCredentials: true,
});

database.defaults.headers.common['Content-Type'] = 'application/json';
database.defaults.headers.common.Authorization = `Bearer ${process.env.VUE_APP_DB_API_KEY}`;
export function addRequestHandler(fn) {
  authentication.interceptors.request.use(fn);
  database.interceptors.request.use(fn);
}
export function addResponseHandler(onSuccess, onError) {
  authentication.interceptors.response.use(onSuccess, onError);
  database.interceptors.response.use(onSuccess, onError);
}

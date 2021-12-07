import axios from 'axios';

const database = axios.create({
  baseURL: process.env.VUE_APP_DB_API_URL,
  withCredentials: true,
});

database.defaults.headers.common['Content-Type'] = 'application/json';
database.defaults.headers.common.Authorization = `Bearer ${process.env.VUE_APP_DB_API_KEY}`;

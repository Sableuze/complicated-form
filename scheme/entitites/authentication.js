import axios from 'axios';

const authentication = axios.create({
  baseURL: process.env.VUE_APP_AUTH_API_URL,
  withCredentials: true,
});

authentication.defaults.headers.common['Content-Type'] = 'application/json';
authentication.defaults.headers.common.Authorization = `Bearer ${process.env.VUE_APP_AUTH_API_KEY}`;

export default authentication;

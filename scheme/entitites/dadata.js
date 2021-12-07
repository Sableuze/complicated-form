import axios from 'axios';

const dadata = axios.create({
  baseURL: process.env.VUE_APP_DADATA_API_URL,
});

dadata.defaults.headers.common['Content-Type'] = 'application/json';
dadata.defaults.headers.common.Accept = 'application/json';
dadata.defaults.headers.common.Authorization = `Token ${process.env.VUE_APP_DADATA_API_KEY}`;

export default dadata;

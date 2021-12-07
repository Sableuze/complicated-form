import axios from 'axios';

const redbox = axios.create({
  baseURL: 'http://testwork.rdbx24.ru/api/',
});

export default redbox;

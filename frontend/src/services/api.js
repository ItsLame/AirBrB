import axios from 'axios';
import appConfig from '../config.json';

const api = axios.create({
  baseURL: 'http://127.0.0.1:' + appConfig.BACKEND_PORT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(appConfig.LS_ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken;
  }
  return config;
});

export default api;

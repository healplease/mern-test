import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/',
  json: true
});

client.interceptors.request.use(config => {
  const token = window.localStorage.getItem('authToken');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default client;

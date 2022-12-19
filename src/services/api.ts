import axios from 'axios';

const api = axios.create({
  // https://stackoverflow.com/a/59588664
  baseURL: 'http://10.0.2.2:3000',
});

export default api;

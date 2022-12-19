import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', // https://stackoverflow.com/a/59588664
});

export default api;

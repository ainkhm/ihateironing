import axios from 'axios';

const api = axios.create({
  baseURL: 'https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0/',
});

export default api;
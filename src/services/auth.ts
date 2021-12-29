import axios from 'axios';

export const auth = axios.create({
  baseURL: 'http://localhost:3333'
});

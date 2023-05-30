import axios from 'axios';

export default axios.create({
  baseURL: 'https://ac5c-190-237-46-229.ngrok-free.app',
  // baseURL: 'http://localhost:8080',
  headers: { 'ngrok-skip-browser-warning': 'true' },
});

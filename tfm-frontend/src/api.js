import axios from 'axios';

export default axios.create({
  baseURL: `http://api.open-gaming.fr`,
  withCredentials: true
});
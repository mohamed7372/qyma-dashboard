import axios from 'axios';
import { json } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL

const getCategories = (lang = 'fr', ) => axios
  .get(`${url}/categories`)
  .then((response) => response.data)
  .catch((error) => json(error));

export default {
  getCategories,
};

import axios from 'axios';
import { json } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL

const getReviews = (items=9, page=1) => axios
  .get(`${url}/reviews/best/rate?perPage=5&page=1`)
  .then((response) => response.data)

const getReviewsOfBussiness = (id, items=9, page=1) => axios
  .get(`${url}/business/reviews/${id}`)
  .then((response) => response.data)

export default {
  getReviews,
  getReviewsOfBussiness
};

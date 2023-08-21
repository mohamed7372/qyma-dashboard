import axios from 'axios';
import { json } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL

const getReviews = (items=9, page=1) => axios
  .get(`${url}/reviews`)
  .then((response) => response.data)
  
const getReview = (id) => axios
  .get(`${url}/review/${id}`)
  .then((response) => response.data)
  
const deleteReview = (id) => axios
  .delete(`${url}/review/delete/${id}`)
  .then((response) => response.data)
  
export default {
  getReviews,
  getReview,
  deleteReview
};

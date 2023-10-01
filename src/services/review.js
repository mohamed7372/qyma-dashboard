import axios from 'axios';
import { json } from 'react-router-dom';

// axios.defaults.withCredentials = true;

const url = process.env.REACT_APP_API_URL

const getReviews = (searchSlice, search2Slice, ratingSlice, dateFromSlice, dateToSlice, statusSlice) => axios
  .get(`${url}/reviews`)
  .then((response) => response.data)
  
const getReview = (id) => axios
  .get(`${url}/review/${id}`)
  .then((response) => response.data)
  
const getReviewOfBussiness = (id) => axios
  .get(`${url}/business/reviews/${id}`)
  .then((response) => response.data)
  
const deleteReview = (id) => axios
  .delete(`${url}/review/delete/${id}`)
  .then((response) => response.data)
  
  
const toggleReview = (id, token) => axios
  .patch(`${url}/review/change/state/${id}`,null, {
      headers: {
        Authorization: `Bearer ${'5|9Cfe4gDApewfwdYDLx0oVNpDZ9wfXVp15cCd8BSJ'}`,
        'Content-Type': 'application/json',
      },
  })
  .then((response) => response.data)
  
const testReview = (id, token) => axios
  .post(`${url}/category/create`,
    {
      displayNameEn: "Fast Food",
      description: "Description",
      descriptionAr: "مطعم",
      descriptionEn:"Fast Food",
    },
    {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'xsrf-token': token,
      },
  })
  // .patch(`${url}/review/change/state/${id}`,{home:'jsd'}, {
  // })
  .then((response) => response.data)
  
export default {
  getReviews,
  getReview,
  getReviewOfBussiness,
  deleteReview,
  toggleReview,
  testReview
};

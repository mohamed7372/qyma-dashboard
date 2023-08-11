import axios from 'axios';
import { json } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL

const getBussiness = (items = 9, page = 1, lang = 'fr', search = '', tags = '', wilaya = '', category = '', rate='') => {
  return axios
    .get(`${url}/businesses/search?perPage=${items}&page=${page}&lang=${lang}&search=${search}&tags=${tags}&wilayas=${wilaya}&categories=${category}&ratings=${rate}`)
    .then((response) => response.data)
}

const getAllWilaya = () => {
  return axios
    .get(`${url}/wilayas?land=ar`)
    .then((response) => response.data)
}

const getBussinessDetail = (id, lang='fr') => axios
  .get(`${url}/business/${id}?lang=${lang}`)
  .then((response) => {
    return response
  })
  .catch((error) => json(error));

const getSelectedBussiness = (lang='fr') => axios
  .get(`${url}/businesses/selected?perPage=3&page=1&lang=${lang}`)
  .then((response) => {
    return response
  })
  .catch((error) => json(error));



const getRecommandBussiness = (id) => axios
  .get(`${url}/business/look/like/${id}`)
  .then((response) => {
    return response
  })
  .catch((error) => json(error));

export default {
  getBussiness,
  getBussinessDetail,
  getRecommandBussiness,
  getSelectedBussiness,
  getAllWilaya
};
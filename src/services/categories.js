import axios from 'axios';
import { json } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL

const getAll = () => axios
    .get(`${url}/categories`)
    .then((response) => response.data)
    .catch((error) => json(error));

const get = (id) => axios
    .get(`${url}/category/${id}`)
    .then((response) => response.data)
    .catch((error) => json(error));

const addCategory = (title, description, image) => axios
    .post(`${url}/categories`, {
        title: title,
        description: description,
        image: image
    })
    .then((response) => response.data)
    .catch((error) => json(error));

const updateCategory = (id, title, description, image) => axios
    .patch(`${url}/categories/${id}`, {
        title: title,
        description: description,
        image: image
    })
    .then((response) => response.data)
    .catch((error) => json(error));

// const deleteCategory = (id) => axios
//     .get(`${url}/categories/${id}`)
//     .then((response) => response.data)
//     .catch((error) => json(error));



export default {
    getAll,
    get,
    addCategory,
    updateCategory
};

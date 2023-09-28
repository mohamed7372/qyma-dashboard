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

const addCategory = (title, titleAR, titleEN, description, descriptionAR, descriptionEN, topic, image) => {
    const formData = new FormData();
    formData.append('userId', '1')
    formData.append('name', 'sfd')
    formData.append('displayName', title)
    formData.append('displayNameAr', titleAR)
    formData.append('displayNameEn', titleEN)
    formData.append('description', description)
    formData.append('descriptionAR', descriptionAR)
    formData.append('descriptionEN', descriptionEN)
    formData.append('parent', topic)
    formData.append('image', image)

    return axios
        .post(
            `${url}/categories`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 18|aVIZebIfcrPrLXfVkkbt2EwIJS0GEFWKgpbRwKVD'
                }
            }
        )
        .then((response) => response.data)
        .catch((error) => json(error));
}

const updateCategory = (id, title, titleAR, titleEN, description, descriptionAR, descriptionEN, topic, image) => {
    const formData = new FormData();
    formData.append('userId', '1')
    formData.append('name', 'sfd')
    formData.append('displayName', title)
    formData.append('displayNameAr', titleAR)
    formData.append('displayNameEn', titleEN)
    formData.append('description', description)
    formData.append('descriptionAR', descriptionAR)
    formData.append('descriptionEN', descriptionEN)
    formData.append('parent', topic)
    formData.append('image', image)

    return axios
        .patch(
            `${url}/categories/${id}`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 18|aVIZebIfcrPrLXfVkkbt2EwIJS0GEFWKgpbRwKVD'
            }
            })
        .then((response) => response.data)
        .catch((error) => json(error));
}

const toggle = (id) => {
    return axios
        .patch(
            `${url}/categories/change/state/${id}`, 
            null,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 18|aVIZebIfcrPrLXfVkkbt2EwIJS0GEFWKgpbRwKVD'
            }
            })
        .then((response) => response.data)
        .catch((error) => json(error));
}

const deleteCategory = (id) => axios
    .get(`${url}/categories/${id}`)
    .then((response) => response.data)
    .catch((error) => json(error));



export default {
    getAll,
    get,
    addCategory,
    updateCategory,
    deleteCategory
};

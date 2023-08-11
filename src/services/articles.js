import axios from 'axios';
import { json } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL


const getAll = (limit = 100, search = '', startDate = '', endDate = '', duration, topic, status='') => {
    const querySearch = search ? `&search=${search}` : ''
    const queryDuration = duration ? `&duration=${duration}` : ''
    const queryTopic = topic ? `&category=${topic}` : ''
    const queryDateStart = startDate ? `&startDate=${startDate}` : ''
    const queryDateEnd = endDate ? `&endDate=${endDate}` : ''
    const queryStatus = status !== '' ? `&isPublished=${status}` : ''

    return axios
        .get(`${url}/articles?limit=${limit}${querySearch}${queryDuration}${queryTopic}${queryDateStart}${queryDateEnd}${queryStatus}`)
        .then((response) => response.data)
        .catch((error) => json(error));
}

const get = (id) => axios
    .get(`${url}/articles/${id}`)
    .then((response) => response.data)
    .catch((error) => json(error));

    
const getLast = () => axios
    .get(`${url}/getLastArticleNumber`)
    .then((response) => response)
    .catch((error) => json(error));

const addArticle = (title, topic, image, description, duration) => axios
    .post(`${url}/articles`, {
        title: title,
        content: description,
        image: image,
        readTime: duration,
        category: topic
    })
    .then((response) => response.data)
    .catch((error) => json(error));

const updateArticle = (id, title, topic, image, description, duration) => axios
    .patch(`${url}/articles/${id}`, {
        title: title,
        content: description,
        readTime: duration,
        category: topic,
        image: image
    })
    .then((response) => response.data)
    .catch((error) => json(error));

const deleteArticle = (id) => axios
    .delete(`${url}/categories/${id}`)
    .then((response) => response.data)
    .catch((error) => json(error));

const toggleArticle = (id) => axios
    .put(`${url}/articles/isPublished/${id}`)
    .then((res) => res.data)
    .catch((error) => json(error));


export default {
    getAll,
    get,
    getLast,
    addArticle,
    updateArticle,
    deleteArticle,
    toggleArticle
};

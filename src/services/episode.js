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
    .get(`${url}/episodes?limit=${limit}${querySearch}${queryDuration}${queryTopic}${queryDateStart}${queryDateEnd}${queryStatus}`)
    .then((response) => response.data)
    .catch((error) => json(error));
}

const get = (id) => axios
  .get(`${url}/episodes/${id}`)
  .then((response) => response.data)
  .catch((error) => json(error));

const getLast = () => axios
  .get(`${url}/episodes/last`)
  .then((response) => response.data)
  .catch((error) => json(error));

const getMostPlayed = (limit=5) => axios
  .get(`${url}/episodes/trending?limit=${limit}`)
  .then((response) => response.data)
  .catch((error) => json(error));

const getSimilar = (id) => axios
  .get(`${url}/episodes/similair/${id}`)
  .then((response) => response.data)
  .catch((error) => json(error));
  
const deleteEpisode = (id) => axios
  .delete(`${url}/episodes/${id}`)
  .then(() => json({data: 'success'}))
  .catch((error) => json(error));
  
const addEpisode = (title, topicId, img, audio, description, explication,duration) => axios
  .post(`${url}/episodes`, {
    title: title,
    category: topicId,
    image: img,
    audio: audio,
    description: description,
    explication: explication,
    duration: duration
  })
  .then((res) => res.data)
  .catch((error) => json(error));
  
const updateEpisode = (id, title, topicId, img, audio, description, explication,duration) => axios
  .patch(`${url}/episodes/${id}`, {
    title: title,
    category: topicId,
    image: img,
    audio: audio,
    description: description,
    explication: explication,
    duration: duration
  })
  .then((res) => res.data)
  .catch((error) => json(error));
  
const toggleEpisode = (id) => axios
  .put(`${url}/episodes/isPublished/${id}`)
  .then((res) => res.data)
  .catch((error) => json(error));
  

export default {
  getAll,
  get,
  getLast,
  getMostPlayed,
  getSimilar,
  deleteEpisode,
  addEpisode,
  updateEpisode,
  toggleEpisode
};

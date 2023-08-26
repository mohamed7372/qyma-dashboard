import axios from 'axios';
import { json } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL
  
const getUsers = (searchSlice, topicSlice, dateFromSlice, dateToSlice, statusSlice) => axios
  .get(`${url}/users`)
  .then((res) => res.data)
  .catch((error) => json(error));
  
const getUser = (id) => axios
  .get(`${url}/user/${id}`)
  .then((res) => res.data)
  .catch((error) => json(error));
  
const updateUser = (id, note, time) => axios
  .patch(`${url}/notes/${id}`, {
    note: note,
    time: time,
  })
  .then((res) => res.note)
  .catch((error) => json(error));
  
const toggleUser = (id, note, time) => axios
  .patch(`${url}/notes/${id}`, {
    note: note,
    time: time,
  })
  .then((res) => res.note)
  .catch((error) => json(error));
  
const deleteUser = (id) => axios
  .delete(`${url}/user/delete/${id}`)
  .then((res) => res.note)
  .catch((error) => json(error));
  

export default {
  getUsers,
  getUser,
  updateUser,
  toggleUser,
  deleteUser
};

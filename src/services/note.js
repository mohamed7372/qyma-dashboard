import axios from 'axios';
import { json } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL
  
const addNote = (id, note, time) => axios
  .post(`${url}/episodes/${id}/note`, {
    note: note,
    time: time,
  })
  .then((res) => res.episode)
  .catch((error) => json(error));
  
const updateNote = (id, note, time) => axios
  .patch(`${url}/notes/${id}`, {
    note: note,
    time: time,
  })
  .then((res) => res.note)
  .catch((error) => json(error));
  
const deleteNote = (id) => axios
  .delete(`${url}/notes/${id}`)
  .then((res) => res.note)
  .catch((error) => json(error));
  

export default {
  addNote,
  updateNote,
  deleteNote
};


import axios from "axios";


const API_URL = "https://note-app-1-6y4c.onrender.com/api";



export const getNotes = () => axios.get(API_URL);

export const getNoteById = (id) => axios.get(`${API_URL}/${id}`);

export const createNotes = (noteData)=>axios.post(API_URL , noteData);

export const editNotes = (id, noteData) => axios.patch(`${API_URL}/${id}`, noteData);

export const deleteNotes = (id) => axios.delete(`${API_URL}/${id}`);






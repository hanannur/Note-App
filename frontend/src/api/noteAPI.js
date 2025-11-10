// import axios from "axios";

// const API_URL = "https://note-app-1-6y4c.onrender.com";

// export const getNotes=()=> axios.get(API_URL);

// export const getNoteById=(id)=>axios.get(`${API_URL}/${id}`)
import axios from "axios";
import { data } from "react-router-dom";

const API_URL = "https://note-app-1-6y4c.onrender.com/api";



export const getNotes = () => axios.get(API_URL);

export const getNoteById = (id) => axios.get(`${API_URL}/${id}`);

export const createNotes = (noteData)=>axios.post(API_URL , noteData);

export const editNotes = (id, noteData) => axios.put(`${API_URL}/${id}`, noteData);

export const deleteNotes = (id) => axios.delete(`${API_URL}/${id}`);
// export const fetchNotes = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data; // Assuming backend returns an array of notes
//   } catch (error) {
//     console.error("Failed to fetch notes:", error);
//     return [];
//   }
// };






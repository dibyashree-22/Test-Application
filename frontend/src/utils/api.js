// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API URL
});

export const getQuestions = (roomId) => api.get(`/questions/room/${roomId}`);
export const submitTest = (roomId, answers) => api.post(`/tests/submit/${roomId}`, { answers });
export const getTestResults = (roomId) => api.get(`/tests/results/${roomId}`);
export const getNotes = () => api.get(`/notes`);

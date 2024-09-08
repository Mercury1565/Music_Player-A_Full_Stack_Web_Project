import api from './apiClient.js';  
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080';


// login and signup are open APIs
export const signUpUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/login`, userData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data;
}

export const logoutUser = async () => {
    const response = await api.post('/logout');
    return response.data;
}

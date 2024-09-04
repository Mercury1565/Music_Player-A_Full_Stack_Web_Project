import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

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
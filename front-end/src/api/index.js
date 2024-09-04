import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchMusicList = async () => {
  const response = await axios.get(`${API_BASE_URL}/musics`);
  return response.data;
};

// Add more API functions here as needed

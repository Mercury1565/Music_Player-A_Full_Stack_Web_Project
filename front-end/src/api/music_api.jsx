import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// music create api
export const createMusic = async (music) => {
  const response = await api.post(`/musics`, music);
  return response.data;
};

// delete music api
export const deleteMusic = async (id) => {
  const response = await api.delete(`/musics/${id}`);
  return response.data;
};

// music fetch apis
export const fetchMusicList = async () => {
  const response = await api.get(`/musics`);
  return response.data;
};

export const fetchTopMusicList = async () => {
  const response = await api.get(`/musics/top`);
  return response.data;
}

export const fetchRecentMusicList = async () => {
  const response = await api.get(`/musics/recent`);
  return response.data;
}

export const fetchYourMusicList = async () => {
  const response = await api.get(`/musics/your`);
  return response.data;
};

export const fetchFavouriteMusicList = async () => {
  const response = await api.get(`/favourites`);
  return response.data;
};

export const searchMusic = async (search) => {
  const response = await api.get(`/music/filter?artist=${search}&title=${search}&genre=${search}`);
  return response.data;
};

export const fetchMusicAudio = async (id) => {
  const response = await api.get(`/audio/${id}`, { responseType: 'blob' });
  return response.data;
}


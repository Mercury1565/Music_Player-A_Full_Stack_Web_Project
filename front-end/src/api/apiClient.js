import axios from 'axios';

const API_BASE_URL = 'music-player-a-full-stack-web-project-mvf7.vercel.app';
// const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.get(`${API_BASE_URL}/refresh`, {
            headers: {
              'Authorization': `Bearer ${refreshToken}`,
            }
          });
          // don't use axios instance that already configured for refresh token api call
          const newAccessToken = response.data.access_token;
          localStorage.setItem('accessToken', newAccessToken);  //set new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error) {
          // Handle token refresh failure
          // mostly logout the user and re-authenticate by login again
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
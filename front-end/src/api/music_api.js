import api from './apiClient';  

// music create api
export const createMusic = async (formData) => {
  const response = await api.post('/music', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

// delete music api
export const deleteMusic = async (filePath) => {
  const response = await api.delete(`/music/${filePath}`);
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

export const addToFavouriteMusicList = async (musicId) => {
  const response = await api.post(`/favourites/add/${musicId}`);
  return response.data;
}

export const removeFromFavouriteMusicList = async (musicId) => {
  const response = await api.post(`/favourites/remove/${musicId}`);
  return response.data;
}

export const searchMusic = async (search) => {
  const response = await api.get(`/music/filter?artist=${search}&title=${search}&genres=${search}`);
  return response.data;
};

export const fetchGenreList = async () => {
  const response = await api.get(`/music/genres`);
  return response.data;
}

export const fetchGenreMusicList = async (genre) => {
  const response = await api.get(`/music/filter?genres=${genre}`);
  return response.data;
}

export const fetchMusicAudio = async (publicID) => {
  const response = await api.get(`/audio/${publicID}`);
  return response.data;
}

export const fetchMusicCover = async (publicID) => {
  const response = await api.get(`/cover/${publicID}`);
  return response.data;
}
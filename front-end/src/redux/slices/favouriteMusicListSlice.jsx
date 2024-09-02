import { createSlice } from '@reduxjs/toolkit';

import { music_card } from '../../assets/assets';
const initialState = [
  {
      artist: 'Maroon 5',
      title: 'Memories',
      image: music_card,
      length: 500, 
      link: '',
      isFavourite: true,
  },
  {
      artist: 'Michael Jackson',
      title: 'Thriller',
      image: music_card,
      length: 300,
      link: '' ,
      isFavourite: true,
  },
];

const favouriteMusicListSlice = createSlice ({
  name: 'music-list',
  initialState,

  reducers: {
    setFavourites(state, action) {
        return action.payload;
    },
    appendFavourite(state, action) {
        state.push(action.payload);
    },
    removeFavourite(state, action) {
        return state.filter(music => music !== action.payload);
    }
  },
});

export const { setFavourites, appendFavourite, removeFavourite } = favouriteMusicListSlice.actions;
export default favouriteMusicListSlice.reducer;

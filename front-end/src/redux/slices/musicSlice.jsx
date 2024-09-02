import { createSlice, isFluxStandardAction } from '@reduxjs/toolkit';

import { music_card } from '../../assets/assets';
const initialState = {
  artist: "Michael Jackson",
  title: "Thriller",
  image: music_card,
  length: 200,
  link: '',
  isFavourite: false,
};

const musicSlice = createSlice ({
  name: 'music',
  initialState,

  reducers: {
    setMusic(state, action) {
      state.artist = action.payload.artist;
      state.title = action.payload.title;
      state.image = action.payload.image;
      state.length = action.payload.length;
      state.link = action.payload.link;
      state.isFavourite = action.payload.isFavourite;
    },
    
    clearMusic(state) {
      state.artist = '';
      state.title = '';
      state.image = '';
      state.length = '';
      state.link = '';
      state.isFavourite = false;
    },
  },
});

export const { setMusic, clearMusic } = musicSlice.actions;
export default musicSlice.reducer;

import { createSlice, isFluxStandardAction } from '@reduxjs/toolkit';

import { music_card } from '../../assets/assets';
const initialState = {};

const musicSlice = createSlice ({
  name: 'music',
  initialState,

  reducers: {
    setMusic(state, action) {
      return action.payload;
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

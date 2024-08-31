import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  artist: '',
  genre: '',
  link: ''
};

const musicSlice = createSlice ({
  name: 'music',
  initialState,

  reducers: {
    setMusic(state, action) {
      state.title = action.payload.title;
      state.artist = action.payload.artist;
      state.genre = action.payload.genre;
      state.link = action.payload.link;
    },
    
    clearMusic(state) {
      state.title = '';
      state.artist = '';
      state.genre = '';
      state.link = '';
    },
  },
});

export const { setMusic, clearMusic } = musicSlice.actions;
export default musicSlice.reducer;

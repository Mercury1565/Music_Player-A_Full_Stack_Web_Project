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
      artist: 'Tilahun Gessesse',
      title: 'Monaliza',
      image: music_card,
      length: 150, 
      link: '',
      isFavourite: false,
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
const searchedMusicListSlice = createSlice ({
  name: 'music-list',
  initialState,

  reducers: {
    setSearchList(state, action) {
        return action.payload;
    },
  },
});

export const { setMusicList } = searchedMusicListSlice.actions;
export default searchedMusicListSlice.reducer;

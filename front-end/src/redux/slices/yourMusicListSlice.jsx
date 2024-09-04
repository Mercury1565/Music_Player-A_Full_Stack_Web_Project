import { createSlice } from '@reduxjs/toolkit';

import { music_card } from '../../assets/assets';
const initialState = [];

const yourMusicListSlice = createSlice ({
  name: 'music-list',
  initialState,

  reducers: {
    setYourMusicList(state, action) {
        return action.payload;
    },
    appenYourdMusic(state, action) {
        state.push(action.payload);
    },
    removeMusic(state, action) {
        return state.filter(music => music !== action.payload);
    }
  },
});

export const { setYourMusicList, appendYourMusicList } = yourMusicListSlice.actions;
export default yourMusicListSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topMusicList: null,
  topMusicMessage: null,
  topMusicError: null
};

const topMusicListSlice = createSlice ({
  name: 'topMusicList-list',
  initialState,

  reducers: {
    setTopMusicList(state, action) {
      state.topMusicList = action.payload.data;
      state.topMusicMessage = action.payload.message;
      state.topMusicError = null;
    },
    setTopMusicListError(state, action) {
      state.topMusicList = null;
      state.topMusicMessage = null;
      state.topMusicError = action.payload.error;
    }
  },
});

export const { setTopMusicList, setTopMusicListError } = topMusicListSlice.actions;
export default topMusicListSlice.reducer;

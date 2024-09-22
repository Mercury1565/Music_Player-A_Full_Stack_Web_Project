import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  yourMusicList: null,
  yourMusicMessage: null,
  yourMusicError: null,
  yourMusicLoading: false,
};

const yourMusicListSlice = createSlice ({
  name: 'your-MusicList',
  initialState,

  reducers: {
    setYourMusicList(state, action) {
      state.yourMusicList = action.payload;
    },
    setYourMusicListRequest(state) {
      state.yourMusicMessage = null;
      state.yourMusicError = null;
      state.yourMusicLoading = true;
    },
    setYourMusicListSuccess(state, action) {
      state.yourMusicMessage = action.payload.message;
      state.yourMusicError = null;
      state.yourMusicLoading = false;
    },
    setYourMusicListError(state, action) {
      state.yourMusicMessage = null;
      state.yourMusicError = action.payload.error;
      state.yourMusicLoading = false;
    }, 
  },
});

export const { setYourMusicList, setYourMusicListRequest, setYourMusicListSuccess, setYourMusicListError } = yourMusicListSlice.actions;
export default yourMusicListSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  yourMusicList: null,
  yourMusicMessage: null,
  yourMusicError: null
};

const yourMusicListSlice = createSlice ({
  name: 'your-yourMusicList-list',
  initialState,

  reducers: {
    setYourMusicList(state, action) {
      state.yourMusicList = action.payload.data;
      state.yourMusicMessage = action.payload.message;
      state.yourMusicError = null;
    },
    setYourMusicListError(state, action) {
      state.yourMusicList = null;
      state.yourMusicMessage = null;
      state.yourMusicError = action.payload.error;
    }
  },
});

export const { setYourMusicList, setYourMusicListError } = yourMusicListSlice.actions;
export default yourMusicListSlice.reducer;

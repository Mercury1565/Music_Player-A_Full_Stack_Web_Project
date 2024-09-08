import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genreList: [],
  genreMessage: null,
  genreError: null
};

const genreListSlice = createSlice ({
  name: 'genreList',
  initialState,

  reducers: {
    setGenreList(state, action) {
      state.genreList = action.payload.data;
      state.genreMessage = action.payload.message;
      state.genreError = null;
    },
    setGenreListError(state, action) {
      state.genreList = null;
      state.genreMessage = null;
      state.genreError = action.payload.error;
    },
  },
});

export const { setGenreList, setGenreListError } = genreListSlice.actions;
export default genreListSlice.reducer;

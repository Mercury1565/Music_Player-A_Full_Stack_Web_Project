import { createSlice } from '@reduxjs/toolkit';
import { acoustic } from "../../assets/assets";

const initialState = [];

const genreListSlice = createSlice ({
  name: 'genreList',
  initialState,

  reducers: {
    setGenreList(state, action) {
        return action.payload;
    },
    appendGenreList(state, action) {
        state.push(action.payload);
    }
  },
});

export const { setGenreList, appendGenreList } = genreListSlice.actions;
export default genreListSlice.reducer;

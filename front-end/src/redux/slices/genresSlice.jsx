import { createSlice } from '@reduxjs/toolkit';
import { acoustic } from "../../assets/assets";

const initialState = [
    {
        name: '1',
        count: 98,
        image: acoustic
    },
    {
        name: '2',
        count: 143,
        image: acoustic
    },
    {
        name: '4',
        count: 98,
        image: acoustic
    },
    {
        name: '4',
        count: 143,
        image: acoustic
    },
];

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

import { createSlice, isFluxStandardAction } from '@reduxjs/toolkit';

const initialState = {};

const musicSlice = createSlice ({
  name: 'music',
  initialState,

  reducers: {
    setMusic(state, action) {
      return action.payload;
    },
  },
});

export const { setMusic } = musicSlice.actions;
export default musicSlice.reducer;

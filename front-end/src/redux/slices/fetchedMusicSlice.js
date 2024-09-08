import { createSlice, isFluxStandardAction } from '@reduxjs/toolkit';

const initialState = {
    audioFile: null,
    cover: null,
    error: null,
};

const fetchecMusicSlice = createSlice ({
  name: 'music',
  initialState,

  reducers: {
    setAudio(state, action) {
        state.audioFile = action.payload;
        state.error = null;
    },
    setCover(state, action) {
        state.cover = action.payload;
        state.error = null;
    },
    setError(state, action) {
        state.error = action.payload
    },
  },
});

export const { setAudio, setCover, setError } = fetchecMusicSlice.actions;
export default fetchecMusicSlice.reducer;

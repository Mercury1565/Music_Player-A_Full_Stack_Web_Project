import { configureStore } from '@reduxjs/toolkit';

import musicReducer from './slices/musicSlice';
import musicListReducer from './slices/musicListSlice';

export const store = configureStore({
  reducer: {
    music: musicReducer,
    musicList: musicListReducer,
  },
});
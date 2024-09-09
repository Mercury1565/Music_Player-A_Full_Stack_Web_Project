import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const sidebarSlice = createSlice ({
  name: 'sidebar',
  initialState,

  reducers: {
    toggleSidebar(state, action) {
      return action.payload;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;

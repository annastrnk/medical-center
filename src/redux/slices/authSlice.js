import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('authorized') === 'true',
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('authorized', 'true');
      localStorage.setItem('token', action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.setItem('authorized', 'false');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

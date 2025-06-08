import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import visitsReducer from './slices/visitSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    visits: visitsReducer,
  },
});

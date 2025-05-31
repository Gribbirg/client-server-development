import { configureStore } from '@reduxjs/toolkit';
import agreementReducer from '@/redux/agreementSlice';
import authReducer from '@/redux/authSlice';

export const store = configureStore({
  reducer: {
    agreement: agreementReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
import { configureStore } from '@reduxjs/toolkit';
import langReducer from './langReducer';

export const store = configureStore({
  reducer: { langReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

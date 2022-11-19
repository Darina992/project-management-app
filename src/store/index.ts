import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import langReducer from './langReducer';
import { reducerBoardSlice } from './boardReduser';

export const store = configureStore({
  reducer: {
    user: userReducer,
    langReducer: langReducer,
    boards: reducerBoardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

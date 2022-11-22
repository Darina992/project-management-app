import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import langReducer from './langReducer';
import { reducerBoardSlice } from './boardReduser';
import { reducerColumnSlice } from './columnReducer';
import { reducerOpenModal } from './modalReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    langReducer: langReducer,
    boards: reducerBoardSlice,
    columns: reducerColumnSlice,
    openModal: reducerOpenModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

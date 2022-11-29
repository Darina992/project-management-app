import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import langReducer from './langReducer';
import { reducerMainSlice } from './mainReducer ';
import { reducerColumnSlice } from './columnReducer';
import { reducerOpenModal } from './modalReducer';
import boardReducer from './boardReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    langReducer: langReducer,
    boards: reducerMainSlice,
    columns: reducerColumnSlice,
    openModal: reducerOpenModal,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

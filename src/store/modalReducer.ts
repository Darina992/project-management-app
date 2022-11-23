import { createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './index';

export interface SearchType {
  openModal: boolean;
  idBoard: string;
  openDilog: boolean;
  deliteId: string;
}

export const initialSearch: SearchType = {
  openModal: false,
  idBoard: '',
  openDilog: false,
  deliteId: '',
};

const openModal = createSlice({
  name: 'openModal',
  initialState: initialSearch,
  reducers: {
    setOpen: (state, actions) => {
      state.openModal = actions.payload;
    },
    setOpenDilog: (state, actions) => {
      state.openDilog = actions.payload;
    },
    setIdBoard: (state, actions) => {
      state.idBoard = actions.payload;
    },
    setDelteId: (state, actions) => {
      state.deliteId = actions.payload;
    },
  },
});

const { actions: actionsOpenModal, reducer: reducerOpenModal } = openModal;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const searchState = (state: RootState) => state.openModal;

export { actionsOpenModal, reducerOpenModal };

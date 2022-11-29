import { createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './index';

export interface SearchType {
  openModal: boolean;
  idBoard: string;
  columnId: string;
  openDilog: boolean;
  deliteId: string;
  actionFor: string;
}

export const initialSearch: SearchType = {
  openModal: false,
  idBoard: '',
  columnId: '',
  openDilog: false,
  deliteId: '',
  actionFor: '',
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
    setIdColumn: (state, actions) => {
      state.columnId = actions.payload;
    },
    setDelteId: (state, actions) => {
      state.deliteId = actions.payload.id;
      state.actionFor = actions.payload.actionFor;
    },
  },
});

const { actions: actionsOpenModal, reducer: reducerOpenModal } = openModal;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const searchState = (state: RootState) => state.openModal;

export { actionsOpenModal, reducerOpenModal };

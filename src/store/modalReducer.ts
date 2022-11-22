import { createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './index';

export interface SearchType {
  openModal: boolean;
  idBoard: string;
}

export const initialSearch: SearchType = {
  openModal: false,
  idBoard: '',
};

const openModal = createSlice({
  name: 'openModal',
  initialState: initialSearch,
  reducers: {
    setOpen(state, actions) {
      return {
        ...state,
        openModal: actions.payload,
      };
    },
    setIdBoard(state, actions) {
      return {
        ...state,
        idBoard: actions.payload,
      };
    },
  },
});

const { actions: actionsOpenModal, reducer: reducerOpenModal } = openModal;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const searchState = (state: RootState) => state.openModal;

export { actionsOpenModal, reducerOpenModal };

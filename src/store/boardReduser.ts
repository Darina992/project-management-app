import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createNewBoard, getAllBoards } from '../pages/mainPage/Fapi';
import { INewBoard, IBoards, IBoard } from '../types/boardsTypes';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './index';

export const initialBoardState: IBoards = {
  boards: [],
  isCreated: false,
};

export const createNewBoards = createAsyncThunk(
  'boards/createNewBoards',
  async (options: INewBoard) => {
    const data = await createNewBoard(options.title, options.description);
    return data;
  }
);

export const getAllBoard = createAsyncThunk('boards/getAllBoards', async () => {
  const data = await getAllBoards();
  return data;
});

export const boardSlice = createSlice({
  name: 'boards',
  initialState: initialBoardState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewBoards.pending, (state: IBoards) => {
        state.isCreated = true;
      })
      .addCase(createNewBoards.fulfilled, (state: IBoards, action) => {
        console.log('ok');
      })
      .addCase(createNewBoards.rejected, (state: IBoards) => {
        state.isCreated = false;
      });
    builder
      .addCase(getAllBoard.pending, (state: IBoards) => {
        state.isCreated = true;
      })
      .addCase(getAllBoard.fulfilled, (state: IBoards, action) => {
        state.boards = action.payload;
        console.log('action.payload', action.payload, state);
      })
      .addCase(getAllBoard.rejected, (state: IBoards) => {
        state.isCreated = false;
      });
  },
});

const { actions: actionsBoardSlice, reducer: reducerBoardSlice } = boardSlice;

export const getBoardsSelector: TypedUseSelectorHook<RootState> = useSelector;
export const getBoardsState = (state: RootState) => state.boards;

export { actionsBoardSlice, reducerBoardSlice };

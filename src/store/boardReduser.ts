import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { createNewBoard, getAllBoards, deleteBoard, updateBoardId } from '../pages/mainPage/Fapi';
import { INewBoard, IBoards, IBoard } from '../types/boardsTypes';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './index';
import { api } from '../api/api';

export const initialBoardState: IBoards = {
  boards: [],
  isCreated: false,
};

export const createNewBoards = createAsyncThunk(
  'boards/createNewBoards',
  async (options: INewBoard) => {
    const data = await api.createNewBoard(options.title, options.description);
    return data;
  }
);

export const getAllBoard = createAsyncThunk('boards/getAllBoard', async () => {
  const data = await api.getAllBoards();
  return data;
});

export const deleteBoardID = createAsyncThunk('boards/deleteBoard', async (id: string) => {
  const data = await api.deleteBoard(id);
  return data;
});

export const updateBoard = createAsyncThunk('boards/updateBoard', async (data: IBoard) => {
  const dataUp = await api.updateBoardId(data.id, data.title, data.description);
  return dataUp;
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
      .addCase(createNewBoards.fulfilled, (state: IBoards) => {
        state.isCreated = true;
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
      })
      .addCase(getAllBoard.rejected, (state: IBoards) => {
        state.isCreated = false;
      });
    builder
      .addCase(deleteBoardID.pending, (state: IBoards) => {
        state.isCreated = true;
      })
      .addCase(deleteBoardID.fulfilled, (state: IBoards, action) => {
        state.boards = state.boards.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteBoardID.rejected, (state: IBoards) => {
        state.isCreated = false;
      });
    builder
      .addCase(updateBoard.pending, (state: IBoards) => {
        state.isCreated = true;
      })
      .addCase(updateBoard.fulfilled, (state: IBoards) => {
        state.isCreated = true;
      })
      .addCase(updateBoard.rejected, (state: IBoards) => {
        state.isCreated = false;
      });
  },
});

const { actions: actionsBoardSlice, reducer: reducerBoardSlice } = boardSlice;

export const getBoardsSelector: TypedUseSelectorHook<RootState> = useSelector;
export const getBoardsState = (state: RootState) => state.boards;

export { actionsBoardSlice, reducerBoardSlice };

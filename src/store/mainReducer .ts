import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { INewBoard, IBoards, IBoard } from '../types/boardsTypes';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './index';
import { api } from '../api/api';

export const initialBoardState: IBoards = {
  boards: [],
  isCreated: false,
  boardsInline: [],
  openSnackbarMain: false,
  errorMessageMain: '',
};

export const createNewBoards = createAsyncThunk(
  'boards/createNewBoards',
  async (options: INewBoard, { rejectWithValue }) => {
    const data = await api.createNewBoard(options.title, options.description).catch((err) => {
      return rejectWithValue(err.message);
    });
    return data;
  }
);

export const getAllBoard = createAsyncThunk(
  'boards/getAllBoard',
  async (_, { rejectWithValue }) => {
    const data = await api.getAllBoards().catch((err) => {
      return rejectWithValue(err.message);
    });
    return data;
  }
);

export const deleteBoardID = createAsyncThunk(
  'boards/deleteBoard',
  async (id: string, { rejectWithValue }) => {
    const data = await api.deleteBoard(id).catch((err) => {
      return rejectWithValue(err.message);
    });
    return data;
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async (data: IBoard, { rejectWithValue }) => {
    const dataUp = await api.updateBoardId(data.id, data.title, data.description).catch((err) => {
      return rejectWithValue(err.message);
    });
    return dataUp;
  }
);

export const mainReducer = createSlice({
  name: 'boards',
  initialState: initialBoardState,
  reducers: {
    setOpenSnackbarMain: (state, actions) => {
      state.openSnackbarMain = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewBoards.pending, (state: IBoards) => {
        state.isCreated = true;
      })
      .addCase(createNewBoards.fulfilled, (state: IBoards) => {
        state.isCreated = true;
      })
      .addCase(createNewBoards.rejected, (state: IBoards, action) => {
        state.isCreated = false;
        state.errorMessageMain = action.payload as string;
        state.openSnackbarMain = true;
      });
    builder
      .addCase(getAllBoard.pending, (state: IBoards) => {
        state.isCreated = true;
      })
      .addCase(getAllBoard.fulfilled, (state: IBoards, action) => {
        state.boards = action.payload;
      })
      .addCase(getAllBoard.rejected, (state: IBoards, action) => {
        state.isCreated = false;
        state.errorMessageMain = action.payload as string;
        state.openSnackbarMain = true;
      });
    builder
      .addCase(deleteBoardID.pending, (state: IBoards) => {
        state.isCreated = true;
      })
      .addCase(deleteBoardID.fulfilled, (state: IBoards, action) => {
        state.boards = state.boards.filter((el) => el.id !== action.payload.id);
        state.errorMessageMain = action.payload as string;
        state.openSnackbarMain = true;
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
      .addCase(updateBoard.rejected, (state: IBoards, action) => {
        state.isCreated = false;
        state.errorMessageMain = action.payload as string;
        state.openSnackbarMain = true;
      });
  },
});

const { actions: actionsMainSlice, reducer: reducerMainSlice } = mainReducer;

export const getBoardsSelector: TypedUseSelectorHook<RootState> = useSelector;
export const getBoardsState = (state: RootState) => state.boards;

export { actionsMainSlice, reducerMainSlice };
export const { setOpenSnackbarMain } = actionsMainSlice;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'api/api';
import { IBoard, ITask } from 'api/typesApi';

export const initialBoardState: IBoardState = {
  boardData: null,
  tasks: [],
};

export interface IBoardState {
  boardData: IBoard | null;
  tasks: ITask[];
}

export const getBoardData = createAsyncThunk('board/getBoardData', async (idBoard: string) => {
  const data = await api.getBoard(idBoard);
  return data;
});

export const createColumn = createAsyncThunk(
  'board/createColumn',
  async (options: { idBoard: string; title: string }) => {
    const data = await api.createColumn(options.idBoard, options.title);
    return data;
  }
);

export const deleteColumn = createAsyncThunk(
  'board/deleteColumn',
  async (options: { boardId: string; title: string; columnId: string }) => {
    const data = await api.deleteColumn(options.boardId, options.title, options.columnId);
    return data;
  }
);

export const updateColumn = createAsyncThunk(
  'board/updateColumn',
  async (options: { boardId: string; title: string; columnId: string; order: number }) => {
    const data = await api.updateColumn(
      options.boardId,
      options.title,
      options.columnId,
      options.order
    );
    return data;
  }
);

export const getAllTasks = createAsyncThunk(
  'board/getAllTasks',
  async (options: { boardId: string; columnId: string }) => {
    const data = await api.getAllTasks(options.boardId, options.columnId);
    console.log(data);
    return data;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardState,
  // reducers: {
  //   setBoardData: (state: IBoardState, action: PayloadAction<IBoard>) => {
  //     state.boardData = action.payload;
  //   },
  // },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardData.fulfilled, (state, action) => {
        state.boardData = action.payload;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = boardSlice;

// export const { setBoardData } = actions;

export default reducer;

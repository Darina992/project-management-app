import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'api/api';
import { IBoard, IColumn, ITask } from 'api/typesApi';
import { IGetColumn } from 'types/boardPageType';
import { sorted } from 'utils/utils';

export const initialBoardState: IBoardState = {
  boardData: null,
  columns: [],
  column: null,
  tasks: [],
  isLoading: false,
};

export interface IBoardState {
  boardData: IBoard | null;
  columns: IColumn[];
  column: IColumn | null;
  tasks: ITask[];
  isLoading: boolean;
}

export const getBoardData = createAsyncThunk('board/getBoardData', async (idBoard: string) => {
  const data = await api.getBoard(idBoard);
  console.log(data);
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
    console.log(data);
    return data;
  }
);

export const getAllColumns = createAsyncThunk('board/getAllColumns', async (idBoard: string) => {
  const data = await api.getAllColumns(idBoard);
  console.log(data);
  return data;
});

export const getColumn = createAsyncThunk('board/getColumns', async (options: IGetColumn) => {
  const data = await api.getColumn(options.boardId, options.columnId);
  console.log(data);
  return data;
});

export const getAllTasks = createAsyncThunk(
  'board/getAllTasks',
  async (options: { boardId: string; columnId: string }) => {
    const data = await api.getAllTasks(options.boardId, options.columnId);
    console.log(data);
    return data;
  }
);

export const deleteTask = createAsyncThunk(
  'board/deleteTask',
  async (options: { boardId: string; columnId: string; taskId: string }) => {
    const data = await api.deleteTask(options.boardId, options.columnId, options.taskId);
    return data;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(getBoardData.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(getBoardData.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.boardData = JSON.parse(JSON.stringify(action.payload));
        // state.isLoading = false;
        state.columns = state.columns && JSON.parse(JSON.stringify(sorted(action.payload.columns)));
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.tasks = JSON.parse(JSON.stringify(action.payload));
        // state.isLoading = true;
      })
      // .addCase(getAllTasks.pending, (state) => {
      //   state.isLoading = false;
      // })
      // .addCase(getAllColumns.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getAllColumns.fulfilled, (state, action) => {
      //   state.columns = JSON.parse(JSON.stringify(sortedColumns(action.payload)));
      //   // state.isLoading = false;
      // })
      .addCase(getColumn.fulfilled, (state, action) => {
        state.column = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = boardSlice;

export default reducer;

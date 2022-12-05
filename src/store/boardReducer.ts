import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'api/api';
import { IBoard, IColumn, ITask } from 'api/typesApi';
import { IGetColumn, IBodyTask } from 'types/boardPageType';
import { sorted } from 'utils/utils';

export const initialBoardState: IBoardState = {
  boardData: null,
  columns: [],
  column: null,
  tasks: [],
  openModalTask: false,
  columnTitle: '',
  columnCreateUser: '',
  task: {
    id: '',
    title: '',
    order: 0,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
    files: [
      {
        filename: '',
        fileSize: 0,
      },
    ],
  },
  boardTitle: '',
  isLoading: false,
  openSnackbar: false,
  errorMessage: '',
};

export interface IBoardState {
  boardData: IBoard | null;
  columns: IColumn[];
  column: IColumn | null;
  tasks: ITask[];
  openModalTask: boolean;
  columnTitle: string;
  columnCreateUser: string;
  task: {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
    files: [
      {
        filename: string;
        fileSize: number;
      }
    ];
  };
  boardTitle: string;
  isLoading: boolean;
  openSnackbar: boolean;
  errorMessage: string;
}

export const getBoardData = createAsyncThunk(
  'board/getBoardData',
  async (idBoard: string, { rejectWithValue }) => {
    const data = await api.getBoard(idBoard).catch((err) => {
      return rejectWithValue(err.message);
    });
    return data;
  }
);

export const deleteColumn = createAsyncThunk(
  'board/deleteColumn',
  async (options: { boardId: string; title: string; columnId: string }, { rejectWithValue }) => {
    const data = await api
      .deleteColumn(options.boardId, options.title, options.columnId)
      .catch((err) => {
        return rejectWithValue(err.message);
      });
    return data;
  }
);

export const updateColumn = createAsyncThunk(
  'board/updateColumn',
  async (
    options: { boardId: string; title: string; columnId: string; order: number },
    { rejectWithValue }
  ) => {
    const data = await api
      .updateColumn(options.boardId, options.title, options.columnId, options.order)
      .catch((err) => {
        return rejectWithValue(err.message);
      });
    return data;
  }
);

export const getAllColumns = createAsyncThunk(
  'board/getAllColumns',
  async (idBoard: string, { rejectWithValue }) => {
    const data = await api.getAllColumns(idBoard).catch((err) => {
      return rejectWithValue(err.message);
    });
    return data;
  }
);

export const getColumn = createAsyncThunk(
  'board/getColumns',
  async (options: IGetColumn, { rejectWithValue }) => {
    const data = await api.getColumn(options.boardId, options.columnId).catch((err) => {
      return rejectWithValue(err.message);
    });
    return data;
  }
);

export const getTask = createAsyncThunk(
  'board/getTask',
  async (options: { boardId: string; columnId: string; taskId: string }, { rejectWithValue }) => {
    const data = await api
      .getTask(options.boardId, options.columnId, options.taskId)
      .catch((err) => {
        return rejectWithValue(err.message);
      });
    return data;
  }
);

export const updateTask = createAsyncThunk(
  'board/updateTask',
  async (
    options: { boardId: string; columnId: string; taskId: string; body: IBodyTask },
    { rejectWithValue }
  ) => {
    const data = await api
      .updateTask(options.boardId, options.columnId, options.taskId, options.body)
      .catch((err) => {
        return rejectWithValue(err.message);
      });
    return data;
  }
);

export const deleteTask = createAsyncThunk(
  'board/deleteTask',
  async (options: { boardId: string; columnId: string; taskId: string }, { rejectWithValue }) => {
    const data = await api
      .deleteTask(options.boardId, options.columnId, options.taskId)
      .catch((err) => {
        return rejectWithValue(err.message);
      });
    return data;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {
    setOpen: (state, actions) => {
      state.openModalTask = actions.payload;
    },
    setBoardTitle: (state, actions) => {
      state.boardTitle = actions.payload;
    },
    setColumnTitle: (state, actions) => {
      state.columnTitle = actions.payload;
    },
    setColumnCreateUser: (state, actions) => {
      state.columnCreateUser = actions.payload;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    setOpenSnackbar: (state, actions) => {
      state.openSnackbar = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoardData.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.boardData = JSON.parse(JSON.stringify(action.payload));
        const copyColumns: IColumn[] = JSON.parse(JSON.stringify(sorted(action.payload.columns)));
        copyColumns.map((column) => {
          return sorted(column.tasks as ITask[]);
        });
        state.columns = state.columns && JSON.parse(JSON.stringify(sorted(copyColumns)));
        state.isLoading = false;
      })
      .addCase(getBoardData.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.openSnackbar = true;
      })
      .addCase(getAllColumns.fulfilled, (state, action) => {
        state.columns = JSON.parse(JSON.stringify(action.payload));
      })
      .addCase(getAllColumns.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.openSnackbar = true;
      })
      .addCase(getColumn.fulfilled, (state, action) => {
        state.column = action.payload;
      })
      .addCase(getColumn.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.openSnackbar = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.task = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.openSnackbar = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log(action);
        state.errorMessage = action.payload as string;
        state.openSnackbar = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.errorMessage = action.payload as string;
        state.openSnackbar = true;
      })
      .addCase(updateColumn.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.openSnackbar = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.openSnackbar = true;
      })
      .addDefaultCase(() => {});
  },
});

const { reducer, actions } = boardSlice;

export default reducer;
export const {
  setOpen,
  setBoardTitle,
  setColumnCreateUser,
  setColumnTitle,
  setColumns,
  setOpenSnackbar,
} = actions;

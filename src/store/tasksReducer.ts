import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { INewTask } from '../api/typesApi';

export const initialTasksState: TasksState = {
  id: '',
  isOpenAddTask: false,
  idColumn: '',
};

export interface TasksState {
  id: string;
  isOpenAddTask: boolean;
  idColumn: string;
}

export const createNewTask = createAsyncThunk('main/createNewTask', async (options: INewTask) => {
  const data = await api.createTask(
    options.boardId,
    options.columnId,
    options.title,
    options.description,
    options.userId
  );
  return data;
});

export const tasksSlice = createSlice({
  name: 'Tasks',
  initialState: initialTasksState,
  reducers: {
    setIsOpenAddTask: (state, actions) => {
      state.isOpenAddTask = actions.payload;
    },
    setColumnId: (state, actions) => {
      state.idColumn = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewTask.fulfilled, (state, action) => {
      state.id = action.payload!.id;
    });
  },
});

export const { setIsOpenAddTask, setColumnId } = tasksSlice.actions;

export default tasksSlice.reducer;

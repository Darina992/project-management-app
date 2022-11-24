import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { INewTask } from '../api/typesApi';

export const initialTasksState: TasksState = {
  id: '',
  isLoading: false,
};

export interface TasksState {
  id: string;
  isLoading: boolean;
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewTask.pending, (state: TasksState) => {
      state.isLoading = true;
    }),
      builder.addCase(createNewTask.fulfilled, (state, action) => {
        state.id = action.payload!.id;
        state.isLoading = false;
      });
  },
});

//export const {  } = tasksSlice.actions;

export default tasksSlice.reducer;

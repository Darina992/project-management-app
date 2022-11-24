import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { InewColumn, IColumns } from '../types/boardPageType';
import { RootState } from './index';
import { api } from '../api/api';

export const initialColumnState: IColumns = {
  columns: [],
  isCreated: false,
};

export const createNewColumn = createAsyncThunk(
  'columns/createNewColumn',
  async (options: InewColumn) => {
    const data = await api.createNewColumn(options.idBoard, options.title);
    return data;
  }
);

export const columnSlice = createSlice({
  name: 'columns',
  initialState: initialColumnState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewColumn.pending, (state: IColumns) => {
        state.isCreated = true;
      })
      .addCase(createNewColumn.fulfilled, (state: IColumns) => {
        state.isCreated = true;
      })
      .addCase(createNewColumn.rejected, (state: IColumns) => {
        state.isCreated = false;
      });
  },
});

const { actions: actionsColumnSlice, reducer: reducerColumnSlice } = columnSlice;

export const getColumnsSelector: TypedUseSelectorHook<RootState> = useSelector;
export const getColumnsState = (state: RootState) => state.columns;

export { actionsColumnSlice, reducerColumnSlice };

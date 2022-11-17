import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { IUser, INewUser } from '../api/typesApi';
import { useNavigate } from 'react-router-dom';

export const initialUserState: UserState = {
  id: '',
  name: '',
  isReg: false,
  isLoading: false,
};

export interface UserState {
  id: string;
  name: string;
  isReg: boolean;
  isLoading: boolean;
}

export const createNewUser = createAsyncThunk('main/createNewUser', async (options: INewUser) => {
  const data = await api.createNewUser(options.name, options.login, options.password);
  return data;
});

export const userSlice = createSlice({
  name: 'User',
  initialState: initialUserState,
  reducers: {
    resetReg: (state: UserState) => {
      state.isReg = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUser.pending, (state: UserState) => {
      state.isLoading = true;
    }),
      builder.addCase(createNewUser.fulfilled, (state, action) => {
        if (action.payload === 409) {
          state.isReg = true;
        } else {
          state.id = (action.payload as IUser).id;
          state.name = (action.payload as IUser).name;
        }
        state.isLoading = false;
      });
  },
});

export const { resetReg } = userSlice.actions;

export default userSlice.reducer;

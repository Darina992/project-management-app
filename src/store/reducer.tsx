import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { IUser, INewUser } from '../api/typesApi';

export const initialUserState: UserState = {
  id: '',
  name: '',
  login: '',
  password: '',
};

export interface UserState {
  id: string;
  name: string;
  login: string;
  password: string;
}

export const createNewUser = createAsyncThunk('main/createNewUser', async (options: INewUser) => {
  const data = await api.createNewUser(options.name, options.login, options.password);
  return data as IUser;
});

export const userSlice = createSlice({
  name: 'User',
  initialState: initialUserState,
  reducers: {
    saveUserInfo: (state: UserState, action: PayloadAction<INewUser>) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUser.pending, (state: UserState) => {
      //loading
    }),
      builder.addCase(createNewUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.login = action.payload.login;
        console.log(state.id);
      });
  },
});

export const { saveUserInfo } = userSlice.actions;

export default userSlice.reducer;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { IUser, INewUser, IAuthUser, IToken } from '../api/typesApi';
import { setToLocalStorage, getFromLocalStorage } from '../utils/utils';

export const initialUserState: UserState = {
  id: getFromLocalStorage('$userId') as string,
  name: '',
  isReg: false,
  isAuth: false,
  isLoading: false,
  showAlert: false,
  successReg: false,
};

export interface UserState {
  id: string;
  name: string;
  isReg: boolean;
  isAuth: boolean;
  isLoading: boolean;
  showAlert: boolean;
  successReg: boolean;
}

export const createNewUser = createAsyncThunk('main/createNewUser', async (options: INewUser) => {
  const data = await api.createNewUser(options.name, options.login, options.password);
  return data;
});

export const signInUser = createAsyncThunk('main/signInUser', async (options: IAuthUser) => {
  const data = await api.signInUser(options.login, options.password);
  return data;
});

export const userSlice = createSlice({
  name: 'User',
  initialState: initialUserState,
  reducers: {
    resetReg: (state: UserState) => {
      state.isReg = false;
      state.showAlert = false;
    },
    resetAuth: (state: UserState) => {
      state.isAuth = false;
      state.showAlert = false;
    },
    signIn: (state: UserState) => {
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUser.pending, (state: UserState) => {
      state.isLoading = true;
    }),
      builder.addCase(createNewUser.fulfilled, (state, action) => {
        if (action.payload === 409) {
          state.isReg = true;
          state.showAlert = true;
          state.successReg = false;
        } else {
          state.id = (action.payload as IUser).id;
          state.name = (action.payload as IUser).name;
          state.successReg = true;
          setToLocalStorage('$userId', state.id);
        }
        state.isLoading = false;
      });
    builder.addCase(signInUser.pending, (state: UserState) => {
      state.isLoading = true;
    }),
      builder.addCase(signInUser.fulfilled, (state, action) => {
        if (action.payload === 403) {
          state.isAuth = false;
          state.showAlert = true;
        } else {
          state.isAuth = true;
          console.log(action.payload);
          setToLocalStorage('$token', (action.payload as IToken).token);
        }
        state.isLoading = false;
      });
  },
});

export const { resetReg, resetAuth, signIn } = userSlice.actions;

export default userSlice.reducer;

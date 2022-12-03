import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { IUser, INewUser, IAuthUser, IToken } from '../api/typesApi';
import {
  setToLocalStorage,
  getFromLocalStorage,
  isValidToken,
  updateUserIdFromToken,
} from '../utils/utils';

export const initialUserState: UserState = {
  id: getFromLocalStorage('$userId') as string,
  name: '',
  login: '',
  isReg: false,
  isAuth: getFromLocalStorage('$userIsAuth') === 'true' && isValidToken() ? true : false,
  isLoading: false,
  showAlert: false,
  showConfirm: false,
  successReg: false,
  successEdit: false,
  successDelete: false,
  unsuccessDelete: false,
  isValidToken: isValidToken(),
};

export interface UserState {
  id: string;
  name: string;
  login: string;
  isReg: boolean;
  isAuth: boolean;
  isLoading: boolean;
  showAlert: boolean;
  showConfirm: boolean;
  successReg: boolean;
  successEdit: boolean;
  successDelete: boolean;
  unsuccessDelete: boolean;
  isValidToken: boolean;
}

export const createNewUser = createAsyncThunk('main/createNewUser', async (options: INewUser) => {
  const data = await api.createNewUser(options.name, options.login, options.password);
  return data;
});

export const signInUser = createAsyncThunk('main/signInUser', async (options: IAuthUser) => {
  const data = await api.signInUser(options.login, options.password);
  return data;
});

export const editUser = createAsyncThunk('main/editUser', async (options: INewUser) => {
  console.log(options);
  const data = await api.editUser(options.name, options.login, options.password);
  return data;
});

export const deleteUser = createAsyncThunk('main/deleteUser', async () => {
  const data = await api.deleteUser();
  return data;
});

export const getUserById = createAsyncThunk('main/getUserById', async (id: string) => {
  const data = await api.getUserById();
  return data;
});

export const userSlice = createSlice({
  name: 'User',
  initialState: initialUserState,
  reducers: {
    resetReg: (state: UserState) => {
      state.isReg = false;
      state.showAlert = false;
      state.successReg = false;
    },
    resetAuth: (state: UserState) => {
      state.isAuth = false;
      setToLocalStorage('$userIsAuth', JSON.stringify(state.isAuth));
      state.showAlert = false;
      state.successReg = false;
    },
    signIn: (state: UserState) => {
      state.isAuth = true;
      setToLocalStorage('$userIsAuth', JSON.stringify(state.isAuth));
    },
    resetSuccessEdit: (state: UserState) => {
      state.successEdit = false;
    },
    resetSuccessDelete: (state: UserState) => {
      state.successDelete = false;
    },
    resetUnsuccessDelete: (state: UserState) => {
      state.unsuccessDelete = false;
    },
    showConfirm: (state: UserState) => {
      state.showConfirm = true;
    },
    closeConfirm: (state: UserState) => {
      state.showConfirm = false;
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
          state.login = (action.payload as IUser).login;
          state.successReg = true;
          setToLocalStorage('$userId', state.id);
          setToLocalStorage('$name', state.name);
          setToLocalStorage('$login', state.login);
        }
        state.isLoading = false;
      });
    builder.addCase(signInUser.pending, (state: UserState) => {
      state.isLoading = true;
    }),
      builder.addCase(signInUser.fulfilled, (state, action) => {
        if (action.payload === 403) {
          state.isAuth = false;
          setToLocalStorage('$userIsAuth', JSON.stringify(state.isAuth));
          state.showAlert = true;
        } else {
          state.isAuth = true;
          setToLocalStorage('$userIsAuth', JSON.stringify(state.isAuth));
          setToLocalStorage('$token', (action.payload as IToken).token);
          state.id = updateUserIdFromToken();
        }
        state.isLoading = false;
      });
    builder.addCase(editUser.pending, (state: UserState) => {
      state.isLoading = true;
    }),
      builder.addCase(editUser.fulfilled, (state, action) => {
        state.id = (action.payload as IUser).id;
        state.name = (action.payload as IUser).name;
        state.login = (action.payload as IUser).login;
        setToLocalStorage('$userId', state.id);
        setToLocalStorage('$name', state.name);
        setToLocalStorage('$login', state.login);
        state.successEdit = true;
        state.isLoading = false;
      });
    builder.addCase(deleteUser.pending, (state: UserState) => {
      state.isLoading = true;
    }),
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        if (action.payload === 204) {
          state.showConfirm = false;
          state.id = '';
          state.name = '';
          state.login = '';
          setToLocalStorage('$userId', '');
          //setToLocalStorage('$token', '');
          setToLocalStorage('$name', '');
          setToLocalStorage('$login', '');
          state.successDelete = true;
          state.isAuth = false;
          state.isLoading = false;
        } else {
          state.unsuccessDelete = true;
          state.isLoading = false;
        }
      });
    builder.addCase(getUserById.pending, (state: UserState) => {}),
      builder.addCase(getUserById.fulfilled, (state: UserState, action) => {
        state.name = (action.payload as IUser).name;
        state.login = (action.payload as IUser).login;
        setToLocalStorage('$name', state.name);
        setToLocalStorage('$login', state.login);
      });
  },
});

export const {
  resetReg,
  resetAuth,
  signIn,
  resetSuccessEdit,
  resetSuccessDelete,
  resetUnsuccessDelete,
  showConfirm,
  closeConfirm,
} = userSlice.actions;

export default userSlice.reducer;

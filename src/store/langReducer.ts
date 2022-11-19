import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import translate from '../service/translate';
import { ILang } from '../types/langInterface';

export const initialLangState: ILangState = {
  lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'EN',
  translate: translate.en,
};

export interface ILangState {
  lang: string | null;
  translate: ILang;
}

export const langSlice = createSlice({
  name: 'lang',
  initialState: initialLangState,
  reducers: {
    setLang: (state: ILangState, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setTranslate: (state: ILangState, action: PayloadAction<string>) => {
      state.translate = action.payload === 'EN' ? translate.en : translate.ru;
    },
  },
});

const { actions, reducer } = langSlice;

export const { setTranslate, setLang } = actions;

export default reducer;

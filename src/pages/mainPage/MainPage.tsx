import React, { FC, useEffect, useState } from 'react';
import { Box, Grid, Typography, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { BoardRender } from './BoardRender';
import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from '../../types/boardsTypes';
import { getAllBoard, getBoardsState } from 'store/mainReducer ';
import { AppDispatch, RootState } from 'store';
import './mainPage.scss';

export const MainPage: FC = () => {
  const { boards } = useSelector(getBoardsState);
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { openModal } = useSelector((state: RootState) => state.openModal);
  const dispatch = useDispatch<AppDispatch>();
  const [boardData, setBoardData] = useState<IBoard[]>(boards);

  useEffect(() => {
    dispatch(getAllBoard());
  }, [openModal]);

  useEffect(() => {
    setBoardData(boards);
  }, [boards]);

  const handleSearch = (text: string) => {
    const data = boards.filter((el: IBoard) => el.title.indexOf(text) > -1);
    setBoardData(data);
  };

export const MainPage = () => {
  return <Box>Main</Box>;
};

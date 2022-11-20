import React, { FC } from 'react';
import { Box, Grid, Typography, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import lang from '../../service/translate';
import { BoardRender } from './BoardRender';
import { useSelector } from 'react-redux';
import { IBoard } from '../../types/boardsTypes';
import { getBoardsState } from 'store/boardReduser';
import './mainPage.scss';
import { userTo, userIn } from './Fapi';

export const MainPage: FC = () => {
  const { boards } = useSelector(getBoardsState);

  userTo();
  userIn();

  // const handleSearch = (text: string) => {
  //   const data = FakeData.filter((el) => el.nameBoard.indexOf(text) > -1);
  //   setDoardData(data);
  // };

  return (
    <Box>
      <Typography gutterBottom variant="h4" component="div">
        {lang.en.boardTitle}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} md={3} key={'w1'}>
          <TextField
            label={lang.en.boardSearchInput}
            variant="standard"
            // onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {boards.map((el: IBoard, id: number) => {
          return <BoardRender key={id} {...el} />;
        })}
      </Grid>
    </Box>
  );
};

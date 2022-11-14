import React, { FC } from 'react';
import { Box, Button, Grid, Typography, InputAdornment, TextField, Paper } from '@material-ui/core';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SearchIcon from '@mui/icons-material/Search';
import lang from '../../service/translate';
import { BoardRender } from './BoardRender';
import './mainPage.scss';

export const MainPage: FC = () => {
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3} key={'w2'}>
          <Button
            className="board__add-btn"
            variant="outlined"
            startIcon={<AddCircleRoundedIcon color="success" />}
          >
            {lang.en.boardCreate}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <BoardRender />
      </Grid>
    </Box>
  );
};

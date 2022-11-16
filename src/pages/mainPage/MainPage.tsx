import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  InputAdornment,
  TextField,
  Modal,
  TextareaAutosize,
} from '@material-ui/core';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SearchIcon from '@mui/icons-material/Search';
import lang from '../../service/translate';
import { BoardRender } from './BoardRender';
import './mainPage.scss';

import FakeData from './FakeData';

interface DateData {
  nameBoard: string;
  descriptionBoard: string;
  nameUser: string;
  idUser: string;
}

export const MainPage: FC = () => {
  const [boardData, setDoardData] = useState<DateData[]>(FakeData);
  const [open, setOpen] = useState(false);
  const [descriptionBoard, setDescriptionBoard] = useState('');
  const [nameBoard, setNameBoard] = useState('');
  const handleClose = () => setOpen(false);

  const createNewBoard = () => {
    const data = {
      nameBoard: nameBoard,
      descriptionBoard: descriptionBoard,
      nameUser: `${nameBoard}+NN`,
      idUser: `${nameBoard}${descriptionBoard}`,
    };
    setDoardData([...boardData, data]);
    setOpen(false);
  };

  const handleSearch = (text: string) => {
    const data = FakeData.filter((el) => el.nameBoard.indexOf(text) > -1);
    setDoardData(data);
  };

  useEffect(() => {
    setDoardData(boardData);
  }, [boardData]);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal" component="form">
          <TextField
            id="standard-basic"
            label={lang.en.boardSearchInput}
            variant="standard"
            onChange={(e) => setNameBoard(e.target.value)}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={7}
            placeholder={lang.en.boardDescription}
            onChange={(e) => setDescriptionBoard(e.target.value)}
          />
          <Button className="board__add-btn" variant="outlined" onClick={() => createNewBoard()}>
            {lang.en.boardCreate}
          </Button>
        </Box>
      </Modal>
      <Typography gutterBottom variant="h4" component="div">
        {lang.en.boardTitle}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} md={3} key={'w1'}>
          <TextField
            label={lang.en.boardSearchInput}
            variant="standard"
            onChange={(e) => handleSearch(e.target.value)}
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
            onClick={() => setOpen(true)}
          >
            {lang.en.boardCreate}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {boardData.map((el: DateData, id: number) => {
          return <BoardRender key={id} {...el} />;
        })}
      </Grid>
    </Box>
  );
};

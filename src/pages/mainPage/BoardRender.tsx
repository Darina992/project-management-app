import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { pink } from '@mui/material/colors';
import i18Obj from '../../service/translate';

interface DateData {
  nameBoard: string;
  descriptionBoard: string;
  nameUser: string;
  idUser: string;
}

export const BoardRender: FC<DateData> = (date: DateData) => {
  const { nameBoard, descriptionBoard, idUser } = date;
  const [open, setOpen] = useState(false);
  const [idBoard, setIdBoard] = useState<string>('');
  // const [delete, setDelete] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clases = e.currentTarget.classList;
    const action = clases[2];
    const idBoard = clases[1];
    console.log(action, idBoard);
  };

  const handleClickOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clases = e.currentTarget.classList;
    setIdBoard(clases[1]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    console.log(idBoard);
    setOpen(false);
  };

  return (
    <Grid item xs={12} sm={4} md={3} key={'w'}>
      <Card>
        <CardActionArea>
          <Link className="board__link" to={'/board'}>
            <CardMedia
              component="img"
              height="100"
              image="https://images.unsplash.com/photo-1621618765466-a0e74bd22170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
              alt="green iguana"
            />
            <CardContent>
              <Typography noWrap gutterBottom variant="h5" component="div">
                {nameBoard}
              </Typography>
              <Typography noWrap variant="body2">
                {descriptionBoard}
              </Typography>
            </CardContent>
          </Link>
          <CardActions>
            <div className={`button-icon ${idUser} chahge`} onClick={(e) => handleSubmit(e)}>
              <ModeRoundedIcon id="44" color="success" />
            </div>
            <div className={`button-icon ${idUser} delete`} onClick={(e) => handleClickOpen(e)}>
              <DeleteRoundedIcon id="55" sx={{ color: pink[500] }} />
            </div>
            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {i18Obj.en.confirmationToDelete}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleDelete} color="primary">
                  {i18Obj.en.ok}
                </Button>
                <Button onClick={handleClose} color="primary">
                  {i18Obj.en.close}
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

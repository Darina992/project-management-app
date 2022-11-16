import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { pink } from '@mui/material/colors';

interface DateData {
  nameBoard: string;
  descriptionBoard: string;
  nameUser: string;
  idUser: string;
}

export const BoardRender: FC<DateData> = (date: DateData) => {
  const { nameBoard, descriptionBoard, idUser } = date;

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clases = e.currentTarget.classList;
    const action = clases[2];
    const idBoard = clases[1];
    console.log(action, idBoard);
  };

  return (
    <Grid item xs={12} sm={4} md={3} key={'w'}>
      <Card>
        <CardActionArea>
          <Link className="board__link" to={'/'}>
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
            <div className={`button-icon ${idUser} delete`} onClick={(e) => handleSubmit(e)}>
              <DeleteRoundedIcon id="55" sx={{ color: pink[500] }} />
            </div>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { pink } from '@mui/material/colors';
import { AppDispatch, RootState } from 'store';
import { getAllBoard } from 'store/mainReducer ';
import { IBoard } from '../../types/boardsTypes';
import { actionsOpenModal } from 'store/modalReducer';

export const BoardRender: FC<{ id: string; title: string; description: string }> = ({
  id,
  title,
  description,
}: IBoard) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openDilog } = useSelector((state: RootState) => state.openModal);

  useEffect(() => {
    dispatch(getAllBoard());
  }, [openDilog]);

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clases = e.currentTarget.classList;
    dispatch(actionsOpenModal.setIdBoard(clases[1]));
    dispatch(actionsOpenModal.setOpen(true));
  };

  const handleClickOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clases = e.currentTarget.classList;
    dispatch(actionsOpenModal.setDelteId(clases[1]));
    dispatch(actionsOpenModal.setOpenDilog(true));
  };

  return (
    <Grid item xs={12} sm={4} md={3} key={'w'}>
      <Card>
        <CardActionArea>
          <Link className="board__link" to={`/board/${id}`}>
            <CardContent>
              <Typography noWrap gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography noWrap variant="body2">
                {description}
              </Typography>
            </CardContent>
          </Link>
          <CardActions>
            <div className={`button-icon ${id} chahge`} onClick={(e) => handleSubmit(e)}>
              <ModeRoundedIcon color="success" />
            </div>
            <div className={`button-icon ${id} delete`} onClick={(e) => handleClickOpen(e)}>
              <DeleteRoundedIcon sx={{ color: pink[500] }} />
            </div>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

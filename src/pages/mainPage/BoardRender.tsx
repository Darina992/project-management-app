import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
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

  const handleSubmit = (e: React.MouseEvent) => {
    const clases = e.currentTarget.classList;
    dispatch(actionsOpenModal.setIdBoard(clases[1]));
    dispatch(actionsOpenModal.setOpen(true));
  };

  const handleClickOpen = (e: React.MouseEvent) => {
    const clases = e.currentTarget.classList;
    const data = {
      id: clases[1] as string,
      actionFor: 'board' as string,
    };

    dispatch(actionsOpenModal.setDelteId(data));
    dispatch(actionsOpenModal.setOpenDilog(true));
  };

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ backgroundColor: 'rgb(220, 228, 233)' }}>
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
          <IconButton className={`button-icon ${id} chahge`} onClick={(e) => handleSubmit(e)}>
            <ModeRoundedIcon />
          </IconButton>
          <IconButton className={`button-icon ${id} delete`} onClick={(e) => handleClickOpen(e)}>
            <DeleteRoundedIcon sx={{ color: 'rgb(205, 126, 120)' }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

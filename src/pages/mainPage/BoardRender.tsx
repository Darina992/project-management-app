import { Card, CardActions, CardContent, Grid, IconButton } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Typography from '@mui/material/Typography';
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

  const handleSubmit = () => {
    dispatch(actionsOpenModal.setIdBoard(id));
    dispatch(actionsOpenModal.setOpen(true));
  };

  const handleClickOpen = () => {
    const data = {
      id: id as string,
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
            <Typography noWrap gutterBottom variant="h5">
              {title}
            </Typography>
            <Typography noWrap variant="body2">
              {description}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <IconButton className={`button-icon ${id} chahge`} onClick={() => handleSubmit()}>
            <ModeRoundedIcon />
          </IconButton>
          <IconButton className={`button-icon ${id} delete`} onClick={() => handleClickOpen()}>
            <DeleteRoundedIcon sx={{ color: 'rgb(205, 126, 120)' }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

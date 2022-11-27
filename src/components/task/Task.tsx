import { Box, IconButton, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ITask } from 'api/typesApi';
import { getBoardData } from 'store/boardReducer';
import { AppDispatch } from 'store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionsOpenModal } from 'store/modalReducer';

export const Task: FC<{ taskData: ITask; columnId: string }> = ({ taskData, columnId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { idBoard } = useParams();

  useEffect(() => {
    dispatch(getBoardData(idBoard as string));
  }, [dispatch, idBoard, columnId]);

  const handleDelete = () => {
    const data = {
      id: taskData.id,
      actionFor: 'task',
    };
    dispatch(actionsOpenModal.setDelteId(data));
    dispatch(actionsOpenModal.setIdBoard(idBoard));
    dispatch(actionsOpenModal.setIdColumn(columnId));
    dispatch(actionsOpenModal.setOpenDilog(true));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
        backgroundColor: '#fff',
        borderRadius: 1,
      }}
    >
      <Typography sx={{ p: 1 }}>{taskData.title}</Typography>
      <IconButton aria-label="settings" onClick={() => handleDelete()}>
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

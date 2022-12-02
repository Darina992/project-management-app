import { Box, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ITask } from 'api/typesApi';
import { AppDispatch, RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionsOpenModal } from 'store/modalReducer';
import { getTask, setColumnCreateUser, setColumnTitle, setOpen } from 'store/boardReducer';
import { api } from 'api/api';
import { IDragProvided } from 'types/dropAndDragTypes';

export const Task: FC<{ taskData: ITask; columnId: string; provided: IDragProvided }> = ({
  taskData,
  columnId,
  provided,
}) => {
  const { task } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch<AppDispatch>();
  const { idBoard } = useParams();

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

  const handleClick = async () => {
    dispatch(
      getTask({
        boardId: idBoard as string,
        columnId: columnId as string,
        taskId: taskData.id,
      })
    );
    if (idBoard) {
      await api.getColumn(idBoard, columnId).then((el) => dispatch(setColumnTitle(el.title)));
      await api.getUser(task.userId).then((el) => dispatch(setColumnCreateUser(el.name)));
    }
    dispatch(setOpen(true));
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
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Typography
        sx={{ p: 1, overflowWrap: 'break-word', maxWidth: 190, fontSize: 16 }}
        onClick={() => handleClick()}
      >
        {taskData.title}
      </Typography>
      <IconButton aria-label="settings" onClick={() => handleDelete()}>
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

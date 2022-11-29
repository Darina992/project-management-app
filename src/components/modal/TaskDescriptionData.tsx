import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import actionsBoardSlice, { updateTask } from 'store/boardReducer';
import { actionsOpenModal } from 'store/modalReducer';

export const TaskDescriptionData: FC = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { task, openModalTask, columnCreateUser, columnTitle, boardTitle } = useSelector(
    (state: RootState) => state.board
  );
  const dispatch = useDispatch<AppDispatch>();
  const [changeTask, setChangeTask] = useState<boolean>(false);
  const [newDataTask, setNewDataTask] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  });

  const handleClose = () => dispatch(actionsBoardSlice.actionsBoardSlice.setOpen(false));

  const handleSave = () => {
    const data = {
      boardId: task.boardId,
      columnId: task.columnId,
      taskId: task.id,
      body: {
        title: newDataTask.title,
        order: task.order,
        description: newDataTask.description,
        userId: task.userId,
      },
    };
    dispatch(updateTask(data));
    setChangeTask(false);
  };

  const handleDelete = () => {
    const data = {
      id: task.id,
      actionFor: 'task',
    };
    dispatch(actionsOpenModal.setDelteId(data));
    dispatch(actionsOpenModal.setIdBoard(task.boardId));
    dispatch(actionsOpenModal.setIdColumn(task.columnId));
    dispatch(actionsOpenModal.setOpenDilog(true));
  };

  return (
    <Modal
      open={openModalTask}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal" sx={{ backgroundColor: 'rgb(233, 239, 243)' }}>
        <Typography id="modal-modal-title" variant="h6" component="h6">
          {boardTitle}/{columnTitle}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h6">
          {translate.createdTask} {columnCreateUser}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h6">
          {translate.titleTaskModal}
        </Typography>
        {changeTask ? (
          <TextField
            id="standard-basic"
            label={translate.inputTitleTask}
            variant="standard"
            onChange={(e) => setNewDataTask({ ...newDataTask, title: e.target.value })}
          />
        ) : (
          <Typography id="modal-modal-description" sx={{ pl: 7 }}>
            {newDataTask.title ? newDataTask.title : task.title}
          </Typography>
        )}
        <Typography id="modal-modal-title" variant="h6" component="h6">
          {translate.descriptionTask}
        </Typography>
        {changeTask ? (
          <TextField
            id="standard-basic"
            label={translate.inputDescriptionTask}
            variant="standard"
            onChange={(e) => setNewDataTask({ ...newDataTask, description: e.target.value })}
          />
        ) : (
          <Typography id="modal-modal-description" sx={{ pl: 7 }}>
            {newDataTask.description ? newDataTask.description : task.description}
          </Typography>
        )}
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="outlined" onClick={() => setChangeTask(true)}>
            {translate.change}
          </Button>
          <Button variant="outlined" color="success" onClick={() => handleSave()}>
            {translate.save}
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleDelete()}>
            {translate.delete}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

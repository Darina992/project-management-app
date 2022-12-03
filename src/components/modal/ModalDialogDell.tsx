import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { deleteBoardID } from 'store/mainReducer ';
import { actionsOpenModal } from 'store/modalReducer';
import { deleteColumn, deleteTask, setOpen } from 'store/boardReducer';

export const ModalDialogDell: FC = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { openDilog, deliteId, actionFor, idBoard, columnId } = useSelector(
    (state: RootState) => state.openModal
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseDialog = () => {
    dispatch(actionsOpenModal.setOpenDilog(false));
  };

  const handleDelete = () => {
    dispatch(actionsOpenModal.setOpenDilog(false));
    if (actionFor === 'board') {
      dispatch(deleteBoardID(deliteId));
      dispatch(actionsOpenModal.setDelteId(''));
    }
    if (actionFor === 'column') {
      dispatch(
        deleteColumn({
          boardId: idBoard,
          title: '',
          columnId: deliteId,
        })
      );
      dispatch(actionsOpenModal.setDelteId(''));
    }
    if (actionFor === 'task') {
      dispatch(
        deleteTask({
          boardId: idBoard,
          columnId: columnId,
          taskId: deliteId,
        })
      );
      dispatch(actionsOpenModal.setDelteId(''));
      dispatch(setOpen(false));
    }
  };

  return (
    <Dialog
      open={openDilog}
      keepMounted
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{translate.confirmationToDelete}</DialogTitle>
      <DialogActions>
        <Button onClick={handleDelete} color="primary">
          {translate.ok}
        </Button>
        <Button onClick={handleCloseDialog} color="primary">
          {translate.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

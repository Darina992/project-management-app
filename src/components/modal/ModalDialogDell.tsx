import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { deleteBoardID } from 'store/mainReducer ';
import { actionsOpenModal } from 'store/modalReducer';
import { deleteColumn, deleteTask, getBoardData, setOpen } from 'store/boardReducer';

export const ModalDialogDell: FC = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { openDilog, deliteId, actionFor, idBoard, columnId } = useSelector(
    (state: RootState) => state.openModal
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseDialog = () => {
    dispatch(actionsOpenModal.setOpenDilog(false));
  };

  const handleDelete = async () => {
    dispatch(actionsOpenModal.setOpenDilog(false));
    if (actionFor === 'board') {
      dispatch(deleteBoardID(deliteId));
      dispatch(actionsOpenModal.setDelteId(''));
    }
    if (actionFor === 'column') {
      await dispatch(
        deleteColumn({
          boardId: idBoard,
          title: '',
          columnId: deliteId,
        })
      );
      dispatch(actionsOpenModal.setDelteId(''));
    }
    if (actionFor === 'task') {
      await dispatch(
        deleteTask({
          boardId: idBoard,
          columnId: columnId,
          taskId: deliteId,
        })
      );
      dispatch(actionsOpenModal.setDelteId(''));
      dispatch(setOpen(false));
    }
    await dispatch(getBoardData(idBoard as string));
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

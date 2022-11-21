import { Box, Button, Modal, TextField, TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { createNewColumn } from 'store/columnReducer';

export const BoardPage = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const [nameBoard, setNameBoard] = useState('');
  const [disabledBtnModal, setDisabledBtnModal] = useState(true);

  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    nameBoard.length > 0 ? setDisabledBtnModal(false) : setDisabledBtnModal(true);
  }, [nameBoard]);

  const createNewBoard = () => {
    const pathCurentBoard = window.location.href.split('/');
    const data = {
      idBoard: pathCurentBoard[pathCurentBoard.length - 1],
      title: nameBoard,
    };
    dispatch(createNewColumn(data));
    setOpenModal(false);
  };

  const handleCreateColumn = () => {
    setOpenModal(true);
    console.log('handleCreateColumn');
  };

  return (
    <Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal" component="form">
          <TextField
            id="standard-basic"
            label={translate.boardSearchInput}
            variant="standard"
            onChange={(e) => setNameBoard(e.target.value)}
          />
          <Button
            type="submit"
            disabled={disabledBtnModal}
            className="board__add-btn"
            variant="outlined"
            onClick={() => {
              createNewBoard();
            }}
          >
            {translate.boardCreate}
          </Button>
        </Box>
      </Modal>
      <Button variant="contained" size="small" onClick={handleCreateColumn}>
        {translate.addColumn}
      </Button>
    </Box>
  );
};

import { Box, TextField, TextareaAutosize, Button, Modal } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBoards, getAllBoard } from 'store/boardReduser';
import { actionsOpenModal } from 'store/modalReducer';

export const ModalCreate: FC = () => {
  const navigate = useNavigate();
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [descriptionBoard, setDescriptionBoard] = useState('');
  const [nameBoard, setNameBoard] = useState('');
  const [disabledBtnModal, setDisabledBtnModal] = useState(true);
  const [openModal, setOpenModal] = useState(true);

  const handleClose = () => setOpenModal(false);

  console.log('ModalCreate');

  const createNewBoard = () => {
    const data = {
      title: nameBoard,
      description: descriptionBoard,
    };
    dispatch(actionsOpenModal.setOpen(false));
    dispatch(createNewBoards(data));
    setOpenModal(false);
    navigate('/main');
  };

  useEffect(() => {
    dispatch(getAllBoard());
  }, [openModal]);

  useEffect(() => {
    nameBoard.length > 0 ? setDisabledBtnModal(false) : setDisabledBtnModal(true);
  }, [nameBoard]);

  return (
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
        <TextareaAutosize
          aria-label="minimum height"
          minRows={7}
          placeholder={translate.boardDescription}
          onChange={(e) => setDescriptionBoard(e.target.value)}
        />
        <Button
          type="submit"
          disabled={disabledBtnModal}
          className="board__add-btn"
          variant="outlined"
          onClick={() => {
            createNewBoard();
            <Navigate to="/main" replace={false} />;
          }}
        >
          {translate.boardCreate}
        </Button>
      </Box>
    </Modal>
  );
};

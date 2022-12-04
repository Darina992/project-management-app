import { Box, TextField, Button, Modal } from '@mui/material';
import React, { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createNewBoards, updateBoard } from 'store/mainReducer ';
import { actionsOpenModal } from 'store/modalReducer';
import { IFormBoardCreate } from 'types/boardPageType';

export const BoardlCreate: FC = () => {
  const navigate = useNavigate();
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { openModal, idBoard } = useSelector((state: RootState) => state.openModal);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormBoardCreate>();

  const handleClose = () => dispatch(actionsOpenModal.setOpen(false));

  const onSubmit: SubmitHandler<IFormBoardCreate> = (data) => {
    if (idBoard) {
      const dataBoard = {
        title: data.name,
        description: data.description,
        id: idBoard,
      };
      dispatch(updateBoard(dataBoard));
      dispatch(actionsOpenModal.setOpen(false));
      dispatch(actionsOpenModal.setIdBoard(''));
    } else {
      const dataBoard = {
        title: data.name,
        description: data.description,
      };
      dispatch(actionsOpenModal.setOpen(false));
      dispatch(createNewBoards(dataBoard));
      navigate('/main');
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal" component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          autoFocus={true}
          id="standard-basic"
          label={translate.boardSearchInput}
          variant="standard"
          {...register('name', { required: true })}
          error={errors.name && true}
          helperText={errors.name && translate.titleBoardError}
        />
        <TextField
          id="standard-basic"
          label={translate.boardDescription}
          variant="standard"
          {...register('description', { required: true })}
          error={errors.name && true}
          helperText={errors.name && translate.descriptionBoardError}
          style={{ marginTop: 10 }}
        />
        <Button
          type="submit"
          className="board__add-btn"
          variant="outlined"
          style={{ marginTop: 20 }}
          onClick={() => {
            <Navigate to="/main" replace={false} />;
          }}
        >
          {translate.boardCreate}
        </Button>
      </Box>
    </Modal>
  );
};

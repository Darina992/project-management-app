import { Box, TextField, Button, Modal } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppDispatch, RootState } from 'store';
import { actionsColumnSlice, createNewColumn } from 'store/columnReducer';
import { IFormInput } from '../../types/boardPageType';
import { getBoardData } from 'store/boardReducer';

export const ColumnCreate: FC = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { openModal, idBoard } = useSelector((state: RootState) => state.columns);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const dataColumn = {
      title: data.name,
      idBoard,
    };

    dispatch(actionsColumnSlice.setOpen(false));
    dispatch(createNewColumn(dataColumn));
    dispatch(getBoardData(idBoard as string));
  };

  const handleClose = () => dispatch(actionsColumnSlice.setOpen(false));

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal" component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="standard-basic"
          label={translate.columnSearchInput}
          variant="standard"
          sx={{ mb: 3 }}
          {...register('name', { required: true })}
          error={errors.name && true}
          helperText={errors.name && translate.titleColumnError}
        />
        <Button type="submit" sx={{ mt: 3 }} className="board__add-btn" variant="outlined">
          {translate.columnCreate}
        </Button>
      </Box>
    </Modal>
  );
};

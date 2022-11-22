import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { store, RootState } from '../../store/index';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { AddTaskForm } from '../../types/userTypes';
import { style } from './styles';

export default function AddTask() {
  const { translate } = useSelector((state: RootState) => state.langReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskForm>();

  const onSubmit: SubmitHandler<AddTaskForm> = (data) => {
    //store.dispatch(signInUser(data));
    console.log('submit');
  };

  const onErrors: SubmitErrorHandler<AddTaskForm> = (errors) => console.error(errors);

  return (
    <Modal open={true}>
      <Box sx={style.modal}>
        <Typography id="modalAddTask-title" variant="h5" component="h2" sx={style.modalTitle}>
          <strong>{translate.addTask}</strong>
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit, onErrors)}
          noValidate
          sx={style.form}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="taskTitle"
            label={translate.addTaskTitle}
            autoComplete="taskTitle"
            autoFocus
            {...register('addTask', { required: true })}
            error={errors.addTask && true}
            helperText={errors.addTask && translate.addTaskTitleError}
          />
          <TextField
            margin="normal"
            fullWidth
            label={translate.addTaskDescription}
            id="taskDescription"
            autoComplete="current-password"
            {...register('addDescription')}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {translate.addTask}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

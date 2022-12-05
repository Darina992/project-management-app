import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { store, RootState, AppDispatch } from '../../store/index';
import { createNewTask } from '../../store/tasksReducer';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { AddTaskForm } from '../../types/userTypes';
import { style } from './styles';
import './addTaskStyle.scss';
import { getBoardData } from 'store/boardReducer';
import { useDispatch } from 'react-redux';

type MyProps = {
  boardId: string;
  columnId: string;
  onClose: () => void;
  isOpen: boolean;
};

export default function AddTask({ boardId, columnId, onClose, isOpen }: MyProps) {
  const user = useSelector((state: RootState) => state.user);
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskForm>();

  const onSubmit: SubmitHandler<AddTaskForm> = async (data) => {
    store.dispatch(
      createNewTask({
        boardId: boardId,
        columnId: columnId,
        title: data.addTask,
        description: data.addDescription,
        userId: user.id,
      })
    );
    onClose();
    await dispatch(getBoardData(boardId as string));
  };

  const onErrors: SubmitErrorHandler<AddTaskForm> = (errors) => console.error(errors);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="add-task" sx={style.modal}>
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
            required
            fullWidth
            label={translate.addTaskDescription}
            id="taskDescription"
            autoComplete="current-password"
            {...register('addDescription', { required: true })}
            error={errors.addDescription && true}
            helperText={errors.addDescription && translate.addTaskDescription}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {translate.addTask}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

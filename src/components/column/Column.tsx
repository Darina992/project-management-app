import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { deleteColumn, updateColumn } from 'store/boardReducer';
import { useSelector } from 'react-redux';
import AddTask from 'components/addTask/addTask';
import { Task } from 'components/task/Task';
import { IColumn } from 'api/typesApi';

export const Column: React.FC<{ data: IColumn }> = ({ data }) => {
  const [isEditTitleColumn, setIsEditTitleColumn] = useState(false);
  const [titleColumn, setTitleColumn] = useState(data.title);
  const { register, handleSubmit, getValues } = useForm();
  const { boardData } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch<AppDispatch>();
  const [isFormTask, setIsFormTask] = useState(false);
  const { translate } = useSelector((state: RootState) => state.langReducer);

  const onCloseModal = () => {
    setIsFormTask(false);
  };

  const onSaveTitleColumn = () => {
    setTitleColumn(getValues('title'));
    dispatch(
      updateColumn({
        boardId: boardData?.id as string,
        title: getValues('title'),
        columnId: data.id,
        order: data.order,
      })
    );
    setIsEditTitleColumn(false);
  };
  const formTitleColumn = () => {
    return (
      <Box
        component="form"
        onSubmit={handleSubmit(onSaveTitleColumn)}
        sx={{ mt: 1, display: 'flex' }}
      >
        <TextField defaultValue={titleColumn} size="small" {...register('title')} />
        <Box sx={{ display: 'flex' }}>
          <IconButton aria-label="settings" type="submit">
            <CheckIcon color="success" fontSize="small" />
          </IconButton>
          <IconButton aria-label="settings" onClick={() => setIsEditTitleColumn(false)}>
            <CloseIcon color="error" fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return isFormTask ? (
    <AddTask boardId={boardData?.id as string} columnId={data.id} onClose={onCloseModal} />
  ) : (
    <Card sx={{ width: 275, backgroundColor: 'rgb(233, 239, 243)' }}>
      {isEditTitleColumn ? (
        <CardHeader title={formTitleColumn()} />
      ) : (
        <CardHeader
          title={<Typography onClick={() => setIsEditTitleColumn(true)}>{titleColumn}</Typography>}
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                dispatch(
                  // add open modal
                  deleteColumn({
                    boardId: boardData?.id as string,
                    title: data.title,
                    columnId: data.id,
                  })
                );
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          }
          disableTypography
          sx={{ fontSize: 22, fontFamily: 'Montserrat' }}
        />
      )}
      <CardContent sx={{ maxHeight: 350, overflowY: 'auto' }}>
        {data.tasks && data.tasks?.map((task) => <Task key={task.id} taskData={task} />)}
      </CardContent>
      <CardActions>
        <Button variant="text" startIcon={<AddIcon />} onClick={() => setIsFormTask(true)}>
          {translate.addTask}
        </Button>
      </CardActions>
    </Card>
  );
};

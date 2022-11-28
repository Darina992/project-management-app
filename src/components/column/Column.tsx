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
import React, { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { getBoardData, updateColumn } from 'store/boardReducer';
import { useSelector } from 'react-redux';
import AddTask from 'components/addTask/addTask';
import { Task } from 'components/task/Task';
import { IColumn } from 'api/typesApi';
import { useParams } from 'react-router-dom';
import { actionsOpenModal } from 'store/modalReducer';

export const Column: React.FC<{ columnId: string; dataColumn: IColumn }> = ({
  columnId,
  dataColumn,
}) => {
  const { idBoard } = useParams();
  const [isEditTitleColumn, setIsEditTitleColumn] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [titleColumn, setTitleColumn] = useState(dataColumn.title);
  const dispatch = useDispatch<AppDispatch>();
  const [isFormTask, setIsFormTask] = useState(false);
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { openDilog } = useSelector((state: RootState) => state.openModal);

  useEffect(() => {
    dispatch(getBoardData(idBoard as string));
  }, [dispatch, idBoard, columnId, isFormTask, openDilog]);

  const handleDelete = () => {
    const data = {
      id: dataColumn.id,
      actionFor: 'column',
    };
    dispatch(actionsOpenModal.setDelteId(data));
    dispatch(actionsOpenModal.setIdBoard(idBoard));
    dispatch(actionsOpenModal.setOpenDilog(true));
  };

  const onCloseModal = () => {
    setIsFormTask(false);
  };

  const onSaveTitleColumn = () => {
    setTitleColumn(getValues('title'));
    dispatch(
      updateColumn({
        boardId: idBoard as string,
        title: getValues('title'),
        columnId: dataColumn.id,
        order: dataColumn.order,
      })
    );
    setIsEditTitleColumn(false);
  };
  const formTitleColumn = () => {
    return (
      <Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSaveTitleColumn)}
          sx={{ mt: 1, display: 'flex' }}
        >
          <TextField
            defaultValue={titleColumn}
            size="small"
            {...register('title', {
              maxLength: {
                value: 30,
                message: 'Title must be less than 30 characters',
              },
            })}
          />
          <Box sx={{ display: 'flex' }}>
            <IconButton aria-label="settings" type="submit">
              <CheckIcon color="success" fontSize="small" />
            </IconButton>
            <IconButton aria-label="settings" onClick={() => setIsEditTitleColumn(false)}>
              <CloseIcon color="error" fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Typography color="error" sx={{ fontSize: 12, mt: 0.5 }}>
          {errors?.title?.message as string}
        </Typography>
      </Box>
    );
  };

  return isFormTask ? (
    <AddTask boardId={idBoard as string} columnId={columnId} onClose={onCloseModal} />
  ) : (
    <Card sx={{ width: 265, backgroundColor: 'rgb(233, 239, 243)' }}>
      {isEditTitleColumn ? (
        <CardHeader title={formTitleColumn()} />
      ) : (
        <CardHeader
          title={
            <Typography
              onClick={() => setIsEditTitleColumn(true)}
              sx={{ overflowWrap: 'break-word', maxWidth: 200 }}
            >
              {titleColumn}
            </Typography>
          }
          action={
            <IconButton aria-label="settings" onClick={() => handleDelete()}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          }
          disableTypography
          sx={{ fontSize: 22, fontFamily: 'Montserrat' }}
        />
      )}
      <CardContent sx={{ maxHeight: 350, overflowY: 'auto' }}>
        {dataColumn.tasks &&
          dataColumn.tasks.map((task) => (
            <Task key={task.id} taskData={task} columnId={columnId} />
          ))}
      </CardContent>
      <CardActions>
        <Button variant="text" startIcon={<AddIcon />} onClick={() => setIsFormTask(true)}>
          {translate.addTask}
        </Button>
      </CardActions>
    </Card>
  );
};

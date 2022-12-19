import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  LinearProgress,
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
import { updateColumn } from 'store/boardReducer';
import { useSelector } from 'react-redux';
import { Task } from 'components/task/Task';
import { IColumn } from 'api/typesApi';
import { useParams } from 'react-router-dom';
import { actionsOpenModal } from 'store/modalReducer';
import {
  DraggableStateSnapshot,
  DraggingStyle,
  IDragProvided,
  IDropProvided,
  TYPES,
} from 'types/dropAndDragTypes';
import { setColumnId, setIsOpenAddTask } from 'store/tasksReducer';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getStyle } from 'utils/utils';

export const Column: React.FC<{
  columnId: string;
  dataColumn: IColumn;
  provided: IDragProvided;
  styleProp: DraggingStyle;
  isDisabled: boolean;
}> = ({ columnId, dataColumn, provided, styleProp, isDisabled }) => {
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
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { isLoadingTaks } = useSelector((state: RootState) => state.board);

  const handleDelete = () => {
    const data = {
      id: dataColumn.id,
      actionFor: 'column',
    };
    dispatch(actionsOpenModal.setDelteId(data));
    dispatch(actionsOpenModal.setIdBoard(idBoard));
    dispatch(actionsOpenModal.setOpenDilog(true));
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

  const onOpenAddTask = () => {
    dispatch(setIsOpenAddTask(true));
    dispatch(setColumnId(columnId));
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
                message: translate.errorEditTitle,
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

  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={styleProp}
      sx={{ width: 265, backgroundColor: 'rgb(233, 239, 243)', mr: 3 }}
    >
      {isEditTitleColumn ? (
        <CardHeader title={formTitleColumn()} />
      ) : (
        <CardHeader
          title={
            <Typography
              onClick={() => setIsEditTitleColumn(true)}
              sx={{ overflowWrap: 'break-word', maxWidth: 200, fontSize: 24 }}
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
      <Droppable droppableId={columnId} type={TYPES.tasks} direction="vertical">
        {(providedTask: IDropProvided) => (
          <CardContent
            sx={{ maxHeight: 300, overflowY: 'auto', minHeight: 30, minWidth: '100%' }}
            {...providedTask.droppableProps}
            ref={providedTask.innerRef}
          >
            {isLoadingTaks ? (
              <LinearProgress />
            ) : (
              dataColumn.tasks &&
              dataColumn.tasks.map((task, index) => {
                return (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                    type={TYPES.tasks}
                    isDragDisabled={isDisabled}
                  >
                    {(providedTask: IDragProvided, snapshot: DraggableStateSnapshot) => (
                      <Task
                        key={task.id}
                        taskData={task}
                        columnId={columnId}
                        provided={providedTask}
                        styleProp={getStyle(providedTask.draggableProps.style, snapshot)}
                      />
                    )}
                  </Draggable>
                );
              })
            )}
            {providedTask.placeholder}
          </CardContent>
        )}
      </Droppable>
      <CardActions>
        <Button variant="text" startIcon={<AddIcon />} onClick={onOpenAddTask}>
          {translate.addTask}
        </Button>
      </CardActions>
    </Card>
  );
};

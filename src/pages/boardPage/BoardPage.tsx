import { Box, Button, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { Column } from 'components/column/Column';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  deleteTask,
  getBoardData,
  setBoardTitle,
  setColumns,
  updateColumn,
  updateTask,
} from 'store/boardReducer';
import boardBg from '../../assets/board-bg.png';
import { ColumnCreate } from 'components/modal/ColumnCreate';
import { actionsColumnSlice } from 'store/columnReducer';
import { IBoard, IColumn, INewTask, ITask } from 'api/typesApi';
import { TaskDescriptionData } from '../../components/modal/TaskDescriptionData';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  DraggableStateSnapshot,
  DraggingStyle,
  DropResult,
  IDragProvided,
  IDropProvided,
  TYPES,
} from 'types/dropAndDragTypes';
import AddTask from 'components/addTask/addTask';
import { createNewTask, setColumnId, setIsOpenAddTask } from 'store/tasksReducer';
import './boardPage.scss';

export const BoardPage = () => {
  const { idBoard } = useParams();
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { boardData, columns, isLoading } = useSelector((state: RootState) => state.board);
  const { openModal } = useSelector((state: RootState) => state.columns);
  const { openModalTask } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch<AppDispatch>();
  const [boardState, setBoardState] = useState<IBoard>(boardData as IBoard);
  const { openDilog } = useSelector((state: RootState) => state.openModal);
  const [columnState, setColumnState] = useState<IColumn[]>(columns);
  const { isOpenAddTask, idColumn } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(getBoardData(idBoard as string));
    dispatch(actionsColumnSlice.setIdBoard(idBoard));
  }, [idBoard, dispatch, openModal, openDilog, isOpenAddTask, idColumn]);

  useEffect(() => {
    setBoardState(() => boardData as IBoard);
    dispatch(setBoardTitle(boardData?.title));
    setColumnState(() => columns);
  }, [boardData, columns, dispatch, openDilog, openModal, isOpenAddTask, idColumn]);

  const onDragEnd = (result: DropResult) => {
    if (result.type === TYPES.columns) {
      handleOnDragEndColumn(result);
    }
    if (result.type === TYPES.tasks) {
      handleOnDragEndTasks(result);
    }
  };

  const handleOnDragEndColumn = async ({ source, destination, draggableId }: DropResult) => {
    if (!destination) return;

    if (destination.index === source.index) {
      return;
    }

    const column = columnState.find((column) => column.id === draggableId);
    const items = Array.from(columnState);
    const [reorderedItem] = items.splice(source.index - 1, 1);
    items.splice(destination.index - 1, 0, reorderedItem);

    setColumnState(() => items);

    await dispatch(
      updateColumn({
        boardId: idBoard as string,
        columnId: draggableId,
        title: column?.title as string,
        order: destination.index,
      })
    );
  };

  const handleOnDragEndTasks = async ({ source, destination, draggableId }: DropResult) => {
    if (!destination) return;
    const columnIdFrom = source.droppableId;
    const columnIdTo = destination.droppableId;

    if (destination.index === source.index && columnIdFrom === columnIdTo) {
      return;
    }
    const columnsCopy: IColumn[] = JSON.parse(JSON.stringify(columnState));
    const columnFrom = columnsCopy.find((column) => column.id === columnIdFrom);
    const columnTo = columnsCopy.find((column) => column.id === columnIdTo);

    const [reorderedItemFrom] = columnFrom?.tasks?.splice(source.index, 1) as ITask[];
    columnTo?.tasks?.splice(destination.index, 0, reorderedItemFrom) as ITask[];

    await dispatch(setColumns(columnsCopy));
    await dispatch(
      deleteTask({
        boardId: idBoard as string,
        columnId: columnIdFrom,
        taskId: draggableId,
      })
    );
    await dispatch(
      createNewTask({
        boardId: idBoard as string,
        columnId: columnIdTo,
        title: reorderedItemFrom.title,
        description: reorderedItemFrom.description,
        userId: reorderedItemFrom.userId,
      })
    ).then((data) => {
      dispatch(
        updateTask({
          boardId: idBoard as string,
          columnId: columnIdTo,
          taskId: (data.payload as INewTask).id as string,
          body: {
            title: reorderedItemFrom.title,
            order: destination.index + 1,
            description: reorderedItemFrom.description,
            userId: reorderedItemFrom.userId,
          },
        })
      );
    });
  };

  const getStyle = (style: DraggingStyle, snapshot: DraggableStateSnapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `0.8s`,
    };
  };

  const onCloseAddTask = () => {
    dispatch(setIsOpenAddTask(false));
    dispatch(setColumnId(''));
  };

  return isLoading ? (
    <LinearProgress variant="determinate" />
  ) : (
    <Box
      component="main"
      sx={{
        width: 1,
        height: 1,
        background: `url(${boardBg})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
      }}
    >
      {openModalTask && <TaskDescriptionData />}
      <Box className="board-page" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h3">{boardState?.title}</Typography>
          <Typography>{boardState?.description}</Typography>
        </Box>
        <Button
          component={NavLink}
          to="/main"
          variant="contained"
          size="small"
          sx={{ height: 35 }}
          startIcon={<ArrowBackIcon />}
        >
          {translate.backButton}
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', gap: 5, mt: 5, p: 2, overflowX: 'auto' }}>
          <Droppable droppableId="columns" direction="horizontal" type={TYPES.columns}>
            {(provided: IDropProvided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  display: 'flex',
                  gap: 3,
                }}
              >
                {columnState &&
                  columnState.map((column) => {
                    return (
                      <Draggable
                        key={column.id}
                        draggableId={column.id}
                        index={column.order}
                        type={TYPES.columns}
                      >
                        {(provided: IDragProvided, snapshot: DraggableStateSnapshot) => (
                          <Box>
                            <Column
                              columnId={column.id}
                              dataColumn={column}
                              provided={provided}
                              styleProp={getStyle(provided.draggableProps.style, snapshot)}
                            />

                            <AddTask
                              boardId={idBoard as string}
                              columnId={idColumn}
                              onClose={onCloseAddTask}
                              isOpen={isOpenAddTask}
                            />
                          </Box>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            sx={{ height: '100%', minWidth: 170, backgroundColor: '#fff' }}
            onClick={() => dispatch(actionsColumnSlice.setOpen(true))}
          >
            {translate.addColumn}
          </Button>
        </Box>
      </DragDropContext>
      <ColumnCreate />
    </Box>
  );
};

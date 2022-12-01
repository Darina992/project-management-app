import { Box, Button, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { Column } from 'components/column/Column';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBoardData, setBoardTitle, updateColumn } from 'store/boardReducer';
import boardBg from '../../assets/board-bg.png';
import { ColumnCreate } from 'components/modal/ColumnCreate';
import { actionsColumnSlice } from 'store/columnReducer';
import { IBoard, IColumn } from 'api/typesApi';
import { TaskDescriptionData } from '../../components/modal/TaskDescriptionData';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  DraggableStateSnapshot,
  DraggingStyle,
  DropResult,
  IDragProvided,
  IDropProvided,
} from 'types/dropAndDragTypes';
import AddTask from 'components/addTask/addTask';
import { setColumnId, setIsOpenAddTask } from 'store/tasksReducer';

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
    // dispatch(getAllColumns(idBoard as string));
  }, [idBoard, dispatch, openModal, openDilog, isOpenAddTask, idColumn]);

  useEffect(() => {
    setBoardState(() => boardData as IBoard);
    dispatch(setBoardTitle(boardData?.title));
    setColumnState(() => columns);
  }, [boardData, columns, dispatch, openDilog, openModal, isOpenAddTask, idColumn]);

  const handleOnDragEnd = async ({ source, destination, draggableId }: DropResult) => {
    if (destination === undefined) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }
    // const currentIndex = source.index;
    const targetIndex = destination.index;
    const id = draggableId;
    let title = '';
    columnState.map((column) => {
      if (column.id === id) {
        title = column.title;
      }
    });
    const items = Array.from(columnState);
    const [reorderedItem] = items.splice(source.index - 1, 1);
    items.splice(destination.index - 1, 0, reorderedItem);

    setColumnState(() => items);

    await dispatch(
      updateColumn({ boardId: idBoard as string, columnId: id, title: title, order: targetIndex })
    );
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Box sx={{ display: 'flex', gap: 5, mt: 5, p: 2, overflowX: 'auto' }}>
          <Droppable droppableId="columns" direction="horizontal">
            {(provided: IDropProvided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  display: 'flex',
                  gap: 3,
                  // backgroundColor: snapshot.isDraggingOver ? 'blue' : '',
                }}
              >
                {columnState &&
                  columnState.map((column) => {
                    return (
                      <Draggable key={column.id} draggableId={column.id} index={column.order}>
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
            sx={{ height: '100%', minWidth: 170 }}
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

import { Box, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ITask } from 'api/typesApi';
import { deleteTask } from 'store/boardReducer';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { useDispatch } from 'react-redux';

export const Task: FC<{ taskData: ITask; columnId: string }> = ({ taskData, columnId }) => {
  const { boardData } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
        backgroundColor: '#fff',
        borderRadius: 1,
      }}
    >
      <Typography sx={{ p: 1 }}>{taskData.title}</Typography>
      <IconButton
        aria-label="settings"
        onClick={() =>
          dispatch(
            deleteTask({
              boardId: boardData?.id as string,
              columnId: columnId,
              taskId: taskData.id,
            })
          )
        }
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

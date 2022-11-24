import { Box, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ITask } from 'api/typesApi';

export const Task: FC<{ taskData: ITask }> = ({ taskData }) => {
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
      <IconButton aria-label="settings">
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

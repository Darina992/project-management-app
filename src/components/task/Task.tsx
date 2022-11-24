import { Box, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Task: FC<{ taskTitle: string }> = ({ taskTitle }) => {
  return (
    <Box>
      <Typography>{taskTitle}</Typography>
      <IconButton aria-label="settings">
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

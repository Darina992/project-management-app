import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Column } from 'components/column/Column';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';

export const BoardPage = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  return (
    <Box component="main">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h3">Title</Typography>
          <Typography>description</Typography>
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
      <Box sx={{ display: 'flex', gap: 5, mt: 5, p: 2, overflowX: 'auto' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Column />
          <Column />
          <Column />
          <Column />
          <Column />
          <Column />
          <Column />
        </Box>
        <Button variant="outlined" startIcon={<AddIcon />} sx={{ height: 35 }}>
          add col
        </Button>
      </Box>
    </Box>
  );
};

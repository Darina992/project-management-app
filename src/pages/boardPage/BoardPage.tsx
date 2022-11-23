import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Column } from 'components/column/Column';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, useParams } from 'react-router-dom';
import { api } from 'api/api';
import { IBoard } from 'types/boardType';

export const BoardPage = () => {
  const { idBoard } = useParams();
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const [boardData, setBoardData] = useState<IBoard>();

  useEffect(() => {
    api.getBoard(idBoard as string).then((data: IBoard) => {
      setBoardData(data);
    });
  }, [idBoard]);

  return (
    <Box component="main">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h3">{boardData?.title}</Typography>
          <Typography>{boardData?.description}</Typography>
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
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          sx={{ height: '100%', minWidth: 170 }}
        >
          {translate.addColumn}
        </Button>
      </Box>
    </Box>
  );
};

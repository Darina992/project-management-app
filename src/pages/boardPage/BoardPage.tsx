import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { Column } from 'components/column/Column';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createColumn, getBoardData } from 'store/boardReducer';
import boardBg from '../../assets/board-bg.png';

export const BoardPage = () => {
  const { idBoard } = useParams();
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { boardData } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBoardData(idBoard as string));
  }, [idBoard, dispatch]);

  return (
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
          {boardData &&
            boardData?.columns.map((column) => {
              return <Column key={column.id} data={column} />;
            })}
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          sx={{ height: '100%', minWidth: 170 }}
          onClick={() =>
            //open form
            dispatch(createColumn({ idBoard: idBoard as string, title: 'In Progress2' }))
          }
        >
          {translate.addColumn}
        </Button>
      </Box>
    </Box>
  );
};

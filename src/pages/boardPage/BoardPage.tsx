import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { Column } from 'components/column/Column';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllColumns, getBoardData } from 'store/boardReducer';
import boardBg from '../../assets/board-bg.png';
import { ColumnCreate } from 'components/modal/ColumnCreate';
import { actionsColumnSlice } from 'store/columnReducer';
import { IBoard } from 'api/typesApi';

export const BoardPage = () => {
  const { idBoard } = useParams();
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const { boardData, columns } = useSelector((state: RootState) => state.board);
  const { openModal } = useSelector((state: RootState) => state.columns);
  const dispatch = useDispatch<AppDispatch>();
  const [boardState, setBoardState] = useState<IBoard>(boardData as IBoard);

  useEffect(() => {
    dispatch(getBoardData(idBoard as string));
    dispatch(actionsColumnSlice.setIdBoard(idBoard));
  }, [idBoard, dispatch, openModal]);
  // useEffect(() => {
  //   dispatch(getAllColumns(idBoard as string));
  // }, [idBoard, dispatch]);
  useEffect(() => {
    setBoardState(() => boardData as IBoard);
  }, [boardData]);

  return openModal ? (
    <ColumnCreate />
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
          {boardState &&
            boardState?.columns.map((column) => {
              return <Column key={column.id} columnId={column.id} dataColumn={column} />;
            })}
        </Box>
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
    </Box>
  );
};

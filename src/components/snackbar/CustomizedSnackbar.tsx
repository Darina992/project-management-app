import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { setOpenSnackbar } from 'store/boardReducer';

export const CustomizedSnackbar = () => {
  const { errorMessage, openSnackbar } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch<AppDispatch>();

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setOpenSnackbar(false));
  };
  return (
    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: '100%', backgroundColor: 'rgb(210, 80, 89)' }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

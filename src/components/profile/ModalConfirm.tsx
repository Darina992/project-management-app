import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { style } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { store, RootState } from '../../store/index';
import { deleteUser, closeConfirm } from '../../store/userReducer';

export default function ModalConfirm() {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const dispatch = useDispatch();
  return (
    <Modal open={true}>
      <Box sx={style.modal}>
        <Typography variant="h6" component="h2">
          {translate.profileDeleteTextConfirm}
        </Typography>
        <Box>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            onClick={() => store.dispatch(deleteUser())}
          >
            {translate.profileDelete}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            onClick={() => dispatch(closeConfirm())}
          >
            {translate.close}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

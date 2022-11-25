import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { style } from './styles';

type MyProps = {
  text: string;
};

export default function ModalWarning({ text }: MyProps) {
  return (
    <Modal open={true}>
      <Box sx={style.modal}>
        <Typography variant="h6" component="h2">
          {text}
        </Typography>
      </Box>
    </Modal>
  );
}

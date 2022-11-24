import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Zoom from '@mui/material/Zoom';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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

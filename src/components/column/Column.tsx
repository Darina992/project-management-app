import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

export const Column = () => {
  const [isChangeTitle, setIsChangeTitle] = useState(false);
  return (
    <Card sx={{ width: 300 }}>
      <CardHeader
        title={isChangeTitle ? <TextField value="text" sx={{ outline: 'none' }} /> : 'title'}
        action={
          <IconButton aria-label="settings">
            <DeleteOutlineIcon color="error" fontSize="small" />
          </IconButton>
        }
        disableTypography
        sx={{ fontSize: 22, fontFamily: 'Montserrat' }}
      />
      <CardContent></CardContent>
      <CardActions>
        <Button variant="text" startIcon={<AddIcon />}>
          add task
        </Button>
      </CardActions>
    </Card>
  );
};

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { IColumn } from 'types/boardType';

export const Column: React.FC<{ data: IColumn }> = ({ data }) => {
  const [isEditTitleColumn, setIsEditTitleColumn] = useState(false);
  const [titleColumn, setTitleColumn] = useState(data.title);
  const { register, handleSubmit, getValues } = useForm();

  const onSaveTitleColumn = () => {
    setTitleColumn(getValues('title'));
    setIsEditTitleColumn(false);
  };
  const formTitleColumn = () => {
    return (
      <Box
        component="form"
        onSubmit={handleSubmit(onSaveTitleColumn)}
        sx={{ mt: 1, display: 'flex' }}
      >
        <TextField defaultValue={titleColumn} size="small" {...register('title')} />
        <Box sx={{ display: 'flex' }}>
          <IconButton aria-label="settings" type="submit">
            <CheckIcon color="success" fontSize="small" />
          </IconButton>
          <IconButton aria-label="settings" onClick={() => setIsEditTitleColumn(false)}>
            <CloseIcon color="error" fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <Card sx={{ width: 300 }}>
      {isEditTitleColumn ? (
        <CardHeader title={formTitleColumn()} />
      ) : (
        <CardHeader
          title={<Typography onClick={() => setIsEditTitleColumn(true)}>{titleColumn}</Typography>}
          action={
            <IconButton aria-label="settings" onClick={() => console.log('delate')}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          }
          disableTypography
          sx={{ fontSize: 22, fontFamily: 'Montserrat' }}
        />
      )}
      <CardContent></CardContent>
      <CardActions>
        <Button variant="text" startIcon={<AddIcon />}>
          add task
        </Button>
      </CardActions>
    </Card>
  );
};

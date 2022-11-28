import { Button, Box } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppDispatch, RootState } from 'store';
import { resetAuth } from 'store/userReducer';
import { actionsOpenModal } from 'store/modalReducer';
import './style.sass';

export const MenuAuth = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box sx={{ display: 'flex', gap: 3 }} className="menu">
      <Button component={NavLink} to="/main" variant="contained" size="small" className="main-page">
        {translate.buttonMainPage}
      </Button>
      <Button
        variant="text"
        component={NavLink}
        to="/profile"
        size="small"
        startIcon={<EditIcon />}
      >
        {translate.buttonEditProfile}
      </Button>
      <Button
        onClick={() => {
          dispatch(actionsOpenModal.setOpen(true));
        }}
        variant="text"
        size="small"
        startIcon={<AddIcon />}
      >
        {translate.buttonNewBoard}
      </Button>
      <Button
        variant="text"
        size="small"
        component={NavLink}
        to="/"
        startIcon={<LogoutIcon />}
        onClick={() => dispatch(resetAuth())}
      >
        {translate.signOut}
      </Button>
    </Box>
  );
};

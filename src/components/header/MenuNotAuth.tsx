import { Box, Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const MenuNotAuth = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);

  return (
    <Box>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        size="small"
        className="sign-buttons"
      >
        <Button component={NavLink} to="/signIn">
          {translate.signIn}
        </Button>
        <Button component={NavLink} to="/signUp">
          {translate.signUp}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

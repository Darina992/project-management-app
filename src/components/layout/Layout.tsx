import { AppBar, Container, Button, ButtonGroup, Toolbar, IconButton } from '@mui/material';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import lang from '../../service/translate';

export const Layout = () => {
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'transparent' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton component={NavLink} to="/">
              <DashboardIcon color="primary" />
            </IconButton>
            <ButtonGroup variant="text" aria-label="text button group">
              <Button component={NavLink} to="/signIn">
                {lang.en.signIn}
              </Button>
              <Button component={NavLink} to="/signUp">
                {lang.en.signUp}
              </Button>
            </ButtonGroup>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ marginTop: '65px' }}>
        <Outlet />
      </Container>
    </>
  );
};

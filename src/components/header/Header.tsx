import { AppBar, Container, Button, ButtonGroup, Toolbar, IconButton, Box } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import lang from '../../service/translate';
import LanguageIcon from '@mui/icons-material/Language';

export const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#ffffff' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton component={NavLink} to="/">
            <DashboardIcon color="primary" />
          </IconButton>
          <Box>
            <ButtonGroup variant="text" aria-label="text button group" sx={{ mr: 2 }}>
              <Button component={NavLink} to="/signIn">
                {lang.en.signIn}
              </Button>
              <Button component={NavLink} to="/signUp">
                {lang.en.signUp}
              </Button>
            </ButtonGroup>
            <Button variant="outlined" startIcon={<LanguageIcon />}>
              en
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

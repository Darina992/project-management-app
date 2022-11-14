import { AppBar, Container, Button, ButtonGroup, Toolbar, IconButton, Box } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import lang from '../../service/translate';
import LanguageIcon from '@mui/icons-material/Language';

export const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#ffffff', boxShadow: 'none' }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton component={NavLink} to="/" sx={{ color: '#333' }}>
            <DashboardIcon fontSize="large" />
          </IconButton>
          <Box>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              sx={{ mr: 2 }}
              size="small"
            >
              <Button component={NavLink} to="/signIn">
                {lang.en.signIn}
              </Button>
              <Button component={NavLink} to="/signUp">
                {lang.en.signUp}
              </Button>
            </ButtonGroup>
            <Button variant="outlined" startIcon={<LanguageIcon />} size="small">
              en
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

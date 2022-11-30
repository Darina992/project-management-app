import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);

  return (
    <Container maxWidth="md">
      <Box className="page-404">
        <Typography variant="h4" component="h5">
          {translate.text404}
        </Typography>
        <Button component={NavLink} to="/main" variant="contained" size="small">
          {translate.buttonMainPage}
        </Button>
      </Box>
    </Container>
  );
};

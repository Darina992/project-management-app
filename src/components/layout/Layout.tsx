import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: '65px', p: 5, height: 1 }}>
        <Outlet />
      </Container>
    </>
  );
};

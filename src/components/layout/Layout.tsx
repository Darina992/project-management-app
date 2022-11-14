import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ marginTop: '65px' }}>
        <Outlet />
      </Container>
    </>
  );
};

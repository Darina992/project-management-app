import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';

export const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: '65px', p: 5, height: 1 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

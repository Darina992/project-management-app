import { Container, styled, Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';

const OuterContainer = styled(Box)`
  display: flex;
  overflow: hidden;
  height: inherit;
  flex-direction: column;
  min-height: 100vh;
`;

const InnerContainer = styled(Box)`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: inherit;
`;

export const Layout = () => {
  return (
    <OuterContainer>
      <Header />
      <InnerContainer>
        <Container maxWidth="lg" sx={{ marginTop: '65px', p: 5, minHeight: 1 }}>
          <Outlet />
        </Container>
      </InnerContainer>
      <Footer />
    </OuterContainer>
  );
};

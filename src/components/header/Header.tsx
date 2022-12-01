import { AppBar, Container, Toolbar, IconButton } from '@mui/material';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { setTranslate } from 'store/langReducer';
import { BoardlCreate } from '../modal/BoardlCreate';
import { ModalDialogDell } from 'components/modal/ModalDialogDell';
import { HeaderMenu } from './HeaderMenu';
import { HamburgerMenu } from './Hamburger';

export const Header: FC = () => {
  const { lang } = useSelector((state: RootState) => state.langReducer);
  const { openModal, openDilog } = useSelector((state: RootState) => state.openModal);
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [animation, setAnimation] = useState(false);
  const onScroll = useCallback(() => {
    if (window.scrollY > 100) {
      setAnimation(true);
    }
    if (window.scrollY < 100) {
      setAnimation(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
  }, [onScroll]);
  useEffect(() => {
    localStorage.setItem('lang', lang as string);
    dispatch(setTranslate(lang as string));
  }, [lang, dispatch]);
  useEffect(() => {
    if (
      !userState.isAuth &&
      window.location.pathname !== '/signIn' &&
      window.location.pathname !== '/signUp'
    ) {
      navigate('/');
    }
  }, [userState.isAuth]);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: animation ? 'rgb(245, 228, 222)' : '#ffffff',
        boxShadow: 'none',
        transition: 'background-color 3s',
      }}
    >
      <Container>
        {openModal && <BoardlCreate />}
        {openDilog && <ModalDialogDell />}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton component={NavLink} to="/" sx={{ color: '#333' }}>
            <DashboardIcon fontSize="large" />
          </IconButton>
          {windowWidth < 700 ? <HamburgerMenu /> : <HeaderMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

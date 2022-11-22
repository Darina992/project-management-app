import {
  AppBar,
  Container,
  Button,
  ButtonGroup,
  Toolbar,
  IconButton,
  Box,
  MenuItem,
  Menu,
} from '@mui/material';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import LanguageIcon from '@mui/icons-material/Language';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppDispatch, RootState } from 'store';
import { setLang, setTranslate } from 'store/langReducer';
import { getAllBoard } from 'store/boardReduser';
import { resetAuth } from 'store/userReducer';
import { ModalCreate } from '../modal/ModalCreate';
import { actionsOpenModal } from 'store/modalReducer';
import { ModalDialogDell } from 'components/modal/ModalDialogDell';

export const Header: FC = () => {
  const { lang, translate } = useSelector((state: RootState) => state.langReducer);
  const { isAuth } = useSelector((state: RootState) => state.user);
  const { openModal, openDilog } = useSelector((state: RootState) => state.openModal);
  const dispatch = useDispatch<AppDispatch>();
  const [anchorLang, setAnchorLang] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorLang);

  const handleMainPage = () => {
    dispatch(getAllBoard());
  };

  const openMenuLang = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLang(event.currentTarget);
  };
  const closeMenuLang = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(setTranslate((event.target as HTMLElement).textContent as string));
    dispatch(setLang((event.target as HTMLElement).textContent as string));
    setAnchorLang(null);
  };

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
        {openModal && <ModalCreate />}
        {openDilog && <ModalDialogDell />}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton component={NavLink} to="/" sx={{ color: '#333' }}>
            <DashboardIcon fontSize="large" />
          </IconButton>
          <Box sx={{ display: 'flex' }}>
            {!isAuth ? (
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                size="small"
              >
                <Button component={NavLink} to="/signIn">
                  {translate.signIn}
                </Button>
                <Button component={NavLink} to="/signUp">
                  {translate.signUp}
                </Button>
              </ButtonGroup>
            ) : (
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Button
                  component={NavLink}
                  to="/main"
                  variant="contained"
                  size="small"
                  onClick={handleMainPage}
                >
                  {translate.buttonMainPage}
                </Button>
                <Button
                  variant="text"
                  component={NavLink}
                  to="/profile"
                  size="small"
                  startIcon={<EditIcon />}
                >
                  {translate.buttonEditProfile}
                </Button>
                <Button
                  onClick={() => {
                    dispatch(actionsOpenModal.setOpen(true));
                  }}
                  variant="text"
                  size="small"
                  startIcon={<AddIcon />}
                >
                  {translate.buttonNewBoard}
                </Button>
                <Button
                  variant="text"
                  size="small"
                  component={NavLink}
                  to="/"
                  startIcon={<LogoutIcon />}
                  onClick={() => dispatch(resetAuth())}
                >
                  {translate.signOut}
                </Button>
              </Box>
            )}
            <Button
              variant="outlined"
              startIcon={<LanguageIcon />}
              size="small"
              sx={{ ml: 2 }}
              onClick={openMenuLang}
            >
              {lang}
            </Button>
            <Menu open={open} anchorEl={anchorLang}>
              <MenuItem onClick={(e) => closeMenuLang(e)} sx={{ fontSize: '16px' }}>
                EN
              </MenuItem>
              <MenuItem onClick={(e) => closeMenuLang(e)} sx={{ fontSize: '16px' }}>
                RU
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

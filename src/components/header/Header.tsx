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
  Modal,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import translate from '../../service/translate';
import LanguageIcon from '@mui/icons-material/Language';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = () => {
  const isAuth = true;
  const [langState, setLangState] = useState('EN');
  const lang = langState === 'EN' ? translate.en : translate.ru;
  const [anchorLang, setAnchorLang] = useState<null | HTMLElement>(null);
  const [descriptionBoard, setDescriptionBoard] = useState('');
  const [nameBoard, setNameBoard] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);
  const open = Boolean(anchorLang);

  const createNewBoard = () => {
    const data = {
      nameBoard: nameBoard,
      descriptionBoard: descriptionBoard,
      nameUser: `${nameBoard}+NN`,
      idUser: `${nameBoard}${descriptionBoard}`,
    };
    // setDoardData([...boardData, data]);
    setOpenModal(false);
  };

  const openMenuLang = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLang(event.currentTarget);
  };
  const closeMenuLang = (event: React.MouseEvent<HTMLElement>) => {
    setLangState((event.target as HTMLElement).textContent as string);
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
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal" component="form">
            <TextField
              id="standard-basic"
              label={lang.boardSearchInput}
              variant="standard"
              onChange={(e) => setNameBoard(e.target.value)}
            />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={7}
              placeholder={lang.boardDescription}
              onChange={(e) => setDescriptionBoard(e.target.value)}
            />
            <Button className="board__add-btn" variant="outlined" onClick={() => createNewBoard()}>
              {lang.boardCreate}
            </Button>
          </Box>
        </Modal>
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
                  {lang.signIn}
                </Button>
                <Button component={NavLink} to="/signUp">
                  {lang.signUp}
                </Button>
              </ButtonGroup>
            ) : (
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Button variant="contained" href="/main" size="small">
                  {lang.buttonMainPage}
                </Button>
                <Button variant="text" href="/profile" size="small" startIcon={<EditIcon />}>
                  {lang.buttonEditProfile}
                </Button>
                <Button
                  onClick={() => setOpenModal(true)}
                  variant="text"
                  size="small"
                  startIcon={<AddIcon />}
                >
                  {lang.buttonNewBoard}
                </Button>
                <Button variant="text" href="/" size="small" startIcon={<LogoutIcon />}>
                  {lang.signOut}
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
              {langState}
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

import { Button, Box, MenuItem, Menu } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LanguageIcon from '@mui/icons-material/Language';
import { AppDispatch, RootState } from 'store';
import { setLang, setTranslate } from 'store/langReducer';
import { MenuAuth } from './MenuAuth';
import { MenuNotAuth } from './MenuNotAuth';

export const HeaderMenu = () => {
  const { lang } = useSelector((state: RootState) => state.langReducer);
  const { isAuth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [anchorLang, setAnchorLang] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorLang);

  const openMenuLang = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLang(event.currentTarget);
  };
  const closeMenuLang = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(setTranslate((event.target as HTMLElement).textContent as string));
    dispatch(setLang((event.target as HTMLElement).textContent as string));
    setAnchorLang(null);
  };

  return (
    <Box sx={{ display: 'flex' }} className="header-menu">
      {!isAuth ? <MenuNotAuth /> : <MenuAuth />}
      <Button
        variant="outlined"
        startIcon={<LanguageIcon />}
        size="small"
        sx={{ ml: 2 }}
        onClick={openMenuLang}
        className="lng-button"
      >
        {lang}
      </Button>
      <Menu open={open} anchorEl={anchorLang} className="lng-menu">
        <MenuItem onClick={(e) => closeMenuLang(e)} sx={{ fontSize: '16px' }}>
          EN
        </MenuItem>
        <MenuItem onClick={(e) => closeMenuLang(e)} sx={{ fontSize: '16px' }}>
          RU
        </MenuItem>
      </Menu>
    </Box>
  );
};

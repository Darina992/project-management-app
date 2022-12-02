import { Box, Drawer, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { HeaderMenu } from './HeaderMenu';
import './style.sass';

export const HamburgerMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawer = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('a') ||
      ((e.target as HTMLElement).closest('button') &&
        !(e.target as HTMLElement).closest('.lng-button'))
    ) {
      setOpenDrawer(false);
    }
  };

  return (
    <Box>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} sx={{ color: '#bb6b84' }}>
        <MenuRoundedIcon />
      </IconButton>
      <Drawer
        open={openDrawer}
        anchor="right"
        transitionDuration={500}
        onClose={() => setOpenDrawer(false)}
        onClick={(e) => handleDrawer(e)}
      >
        <Box sx={{ mb: 2 }} className="hamburger-menu">
          <IconButton onClick={() => setOpenDrawer(!openDrawer)} sx={{ color: '#bb6b84' }}>
            <CloseIcon />
          </IconButton>
          <HeaderMenu />
        </Box>
      </Drawer>{' '}
    </Box>
  );
};

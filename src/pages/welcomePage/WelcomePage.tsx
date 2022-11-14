import { Box, Typography } from '@mui/material';
import React from 'react';
import welcomeBg from '../../assets/welcome-bg.jpg';

export const WelcomePage = () => {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        height: 600,
      }}
    >
      <Box sx={{ width: 0.4, mt: 10 }}>
        <Typography variant="h1" sx={{ fontSize: 54, fontWeight: 400 }}>
          TaskManager
        </Typography>
        <Typography sx={{ fontSize: 21, mt: 5 }}>
          Это программа, которая помогает управлять задачами. Планируйте, управляйте и отслеживайте
          все задачи вашей команды в одном программном обеспечении.
        </Typography>
      </Box>
      <Box
        sx={{
          width: 1,
          background: `url(${welcomeBg})`,
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right bottom',
        }}
      ></Box>
    </Box>
  );
};

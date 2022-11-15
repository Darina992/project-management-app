import { Box, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { CardTeam } from 'components/cardTeam/CardTeam';
import React from 'react';
import welcomeBg from '../../assets/welcome-bg.jpg';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import avatarV from '../../assets/avatar-v.png';
import avatarD from '../../assets/avatar-d.png';
import avatarA from '../../assets/avatar-a.png';
import lang from '../../service/translate';

export const WelcomePage = () => {
  const listItem = (content: string) => {
    return (
      <ListItem>
        <ListItemIcon>
          <ExpandCircleDownOutlinedIcon sx={{ color: '#fff' }} fontSize="small" />
        </ListItemIcon>
        <ListItemText>{content}</ListItemText>
      </ListItem>
    );
  };
  return (
    <>
      <Box
        component="section"
        sx={{
          display: 'flex',
          height: 600,
        }}
      >
        <Box sx={{ width: 0.4, mt: 10 }}>
          <Typography variant="h1" sx={{ fontSize: 54, fontWeight: 400 }}>
            {lang.en.titleWelcome}
          </Typography>
          <Typography sx={{ fontSize: 21, mt: 5 }}>{lang.en.descrWelcome}</Typography>
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
      <Box component="section" pt={10} pb={10}>
        <Typography align="center" variant="h2" sx={{ fontSize: 46, mb: 10 }}>
          {lang.en.titleTeam}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          <CardTeam
            avatar={avatarD}
            title={lang.en.nameD}
            hrefGitHub={'https://github.com/Darina992'}
          >
            {listItem('Forms')}
          </CardTeam>
          <CardTeam
            avatar={avatarV}
            title={lang.en.nameV}
            hrefGitHub={'https://github.com/vpuzyrevich'}
          >
            {listItem('Welcome Page')}
            {listItem('Welcome Page')}
          </CardTeam>
          <CardTeam
            avatar={avatarA}
            title={lang.en.nameA}
            hrefGitHub={'https://github.com/alimbaeva'}
          >
            {listItem('Main Page')}
          </CardTeam>
        </Box>
      </Box>
    </>
  );
};

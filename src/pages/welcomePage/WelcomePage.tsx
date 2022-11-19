import { Box, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { CardTeam } from 'components/cardTeam/CardTeam';
import React from 'react';
import welcomeBg from '../../assets/welcome-bg.jpg';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import avatarV from '../../assets/avatar-v.png';
import avatarD from '../../assets/avatar-d.png';
import avatarA from '../../assets/avatar-a.png';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import './WelcomePage.scss';

export const WelcomePage = () => {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const listItem = (content: string, key: number) => {
    return (
      <ListItem key={key} sx={{ p: 0 }}>
        <ListItemIcon sx={{ pl: '7px', minWidth: '30px', pr: '10px' }}>
          <ExpandCircleDownOutlinedIcon sx={{ color: '#fff' }} fontSize="small" />
        </ListItemIcon>
        <ListItemText disableTypography className="list-item-text">
          {content}
        </ListItemText>
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
            {translate.titleWelcome}
          </Typography>
          <Typography sx={{ fontSize: 21, mt: 5 }}>{translate.descrWelcome}</Typography>
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
          {translate.titleTeam}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
          <CardTeam
            avatar={avatarD}
            title={translate.nameD}
            hrefGitHub={'https://github.com/Darina992'}
          >
            {translate.teamContentD.map((item: string, id: number) => listItem(item, id))}
          </CardTeam>
          <CardTeam
            avatar={avatarV}
            title={translate.nameV}
            hrefGitHub={'https://github.com/vpuzyrevich'}
          >
            {translate.teamContentV.map((item: string, id: number) => listItem(item, id))}
          </CardTeam>
          <CardTeam
            avatar={avatarA}
            title={translate.nameA}
            hrefGitHub={'https://github.com/alimbaeva'}
          >
            {translate.teamContentA.map((item: string, id: number) => listItem(item, id))}
          </CardTeam>
        </Box>
      </Box>
    </>
  );
};

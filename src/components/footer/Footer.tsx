import { Box, Container, Icon, Link, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import lang from '../../service/translate';
import { ReactComponent as RssIcon } from '../../assets/rss.svg';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  const githubLink = (content: string, link: string) => {
    return (
      <Link color="inherit" underline="none" href={link} sx={{ display: 'flex', gap: 1 }}>
        <Typography>{content}</Typography>
        <Icon>
          <GitHubIcon />
        </Icon>
      </Link>
    );
  };
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgb(172, 85, 112)',
        color: '#fff',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 0',
          }}
        >
          <Link href="https://rs.school/react/">
            <SvgIcon component={RssIcon} sx={{ width: 100 }} inheritViewBox color="secondary" />
          </Link>
          <Box sx={{ display: 'flex', gap: 5 }}>
            {githubLink(lang.en.nameD, 'https://github.com/Darina992')}
            {githubLink(lang.en.nameA, 'https://github.com/alimbaeva')}
            {githubLink(lang.en.nameV, 'https://github.com/vpuzyrevich')}
          </Box>
          <Box>
            <Typography>&copy; 2022</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

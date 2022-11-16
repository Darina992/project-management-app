import React, { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link, List } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box } from '@mui/system';

export const CardTeam: React.FC<{
  children: ReactNode;
  avatar: string;
  title: string;
  hrefGitHub: string;
}> = ({ children, avatar, title, hrefGitHub }) => {
  return (
    <Card
      sx={{ maxWidth: 300, backgroundColor: 'rgb(172, 85, 112)', color: '#fff', p: 1 }}
      color="text.primary"
    >
      <CardMedia
        component="img"
        image={avatar}
        alt={title}
        sx={{ borderRadius: '100%', border: '2px solid #fff' }}
      />
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Link
            href={hrefGitHub}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <GitHubIcon sx={{ color: '#fff', ml: 2 }} />
          </Link>
        </Box>
        <List>{children}</List>
      </CardContent>
    </Card>
  );
};

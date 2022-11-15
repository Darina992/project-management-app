import { createTheme } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    fontSize: 16,
  },
  palette: {
    primary: {
      main: 'rgb(172, 85, 112)',
    },
    secondary: {
      main: '#ffffff',
    },
  },
} as ThemeOptions);

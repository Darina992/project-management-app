import { createTheme } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    fontSize: 16,
  },
  palette: {
    primary: {
      main: '#8e506e',
    },
  },
} as ThemeOptions);

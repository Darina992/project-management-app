/// <reference types="react-scripts" />

declare module '@mui/material/styles' {
  interface ThemeOptions {
    typography?: { fontFamily: string; fontSize: number };
  }
}

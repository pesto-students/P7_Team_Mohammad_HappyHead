import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ececec', // Platinum
    },
    secondary: {
      main: '#f3d250', // Gold Crayola
    },
    tertiary: {
      main: '#f78888', // Light Coral 
    },
    quaternary: {
      main: '#90ccf4', // Maya Blue
    },
    quinary: {
      main: '#5da2d5', // Air Force Blue (RAF)
    },
    text: {
      primary: '#000000', // Black font color
    },
    mode: 'light', // Initial mode set to light
  },
  // Add more options to your theme if needed
});

export default theme;
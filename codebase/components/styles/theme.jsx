import { createTheme } from '@mui/material/styles'

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
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontWeightBold: 700,
    },
    breakpoints: {
      values: {
        xs: 0,      // Extra small devices (portrait phones)
        sm: 600,    // Small devices (landscape phones)
        md: 960,    // Medium devices (tablets)
        lg: 1280,   // Large devices (laptops/desktops)
        xl: 1920,   // Extra large devices (large desktops)
      },
    },
    mode: 'light', // Initial mode set to light
  },
  // Add more options to your theme if needed
})

export default theme

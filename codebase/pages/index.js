import { Container, Typography, Paper, Switch, Button, useMediaQuery } from '@mui/material';
import MuiLink, { NextLinkComposed } from '../components/MuiLink'
import { ThemeProvider, styled } from "@mui/system"
// import { useTheme } from '@emotion/react';
import { useTheme, createTheme, responsiveFontSizes } from '@mui/material/styles';

const MyContainer = styled('div')({
  height: '400px',
  backgroundColor: 'yellow',
});

const Home = () => {
  const theme = useTheme();
  // console.log(theme); // Check the theme object in the console

  // Ensure that the breakpoints property exists on the theme object
  const breakpoints = theme?.breakpoints;

  // Verify the up property within the breakpoints object
  const matches = useMediaQuery(breakpoints?.up('sm'));

  const customTheme = responsiveFontSizes(
    createTheme({
      breakpoints: {
        values: {
          //if we only want  to change specific breakpoint values from theme to customTheme
          //if we dont use spread operator, all breakpoints in theme will get overriden by customTheme
          ...theme.breakpoints.values,
          sm: 700,
        },
      },
    }))


  return (
    <ThemeProvider theme={customTheme}>
      <MyContainer>
        <Container
          sx={{
            '&:.myBtn': {
              width: '300px',
              bgcolor: theme => theme.palette.error.main
            },
            [customTheme.breakpoints?.up('sm')]: {
              bgcolor: 'orange'
            }
          }}
        >
        {/* responsive font size */}
        <Typography variant='h2'>Hello world</Typography>
          <MuiLink href='/about'>Go to about page</MuiLink>
          <Button
            className='myBtn'
            variant='contained' component={NextLinkComposed} to='/about'
            sx={{
              background: 'secondary.main',
              padding: {
                xs: '20px',
                sm: '50px',
                md: '80px'
              },
              '&:hover': {
                width: '100px'
              }
            }}
          >Go to about page</Button>
        </Container>
      </MyContainer>
    </ThemeProvider>

  )
}

export default Home
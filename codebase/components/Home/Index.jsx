import React from 'react'
import { Container, ThemeProvider } from '@mui/material'
import Header from '../Layout/Header/Index'
import Footer from '../Layout/Footer/Index'
import HeroComponent from './HeroComponent'
import Tile1 from './Tile1'
import theme from '../styles/theme'

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed" />
      <Container maxWidth="vw" sx={{ p: '30px', p: '30px', bgcolor: theme.palette.secondary.main }}>
        <HeroComponent />
      </Container>
      <Tile1 />
      <Footer />
    </ThemeProvider>
  );
};

export default HomePage

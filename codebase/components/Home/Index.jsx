import React from 'react';
import { AppBar, Toolbar, Container, ThemeProvider } from '@mui/material';
import Header from '../Layout/Header/Index';
import Footer from '../Layout/Footer/Index';
import HeroComponent from './Hero';
import theme from '../styles/theme';

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed" />
      <Container maxWidth="vw" sx={{ p: '30px', p: '30px', bgcolor: theme.palette.secondary.main }}>
        <HeroComponent />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default HomePage;

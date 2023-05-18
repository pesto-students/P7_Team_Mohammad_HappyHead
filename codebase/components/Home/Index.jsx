import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Header from '../Layout/Header/Index';
import Footer from '../Layout/Footer/Index';
import HeroComponent from './Hero';

const HomePage = () => {
  return (
    <>
      <AppBar position="fixed">
          <Header />
      </AppBar>
      <Toolbar /> {/* Empty Toolbar to push the content below the AppBar */}
      <Container maxWidth="lg" sx={{ marginTop: '80px', marginBottom: '80px' }}>
        {/* Other components */}
        <HeroComponent />
        {/* Other components */}
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;

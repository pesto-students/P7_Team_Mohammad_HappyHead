import React from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { Element } from 'react-scroll';
import Header from '../Layout/Header/Index';
import Footer from '../Layout/Footer/Index';
import AboutTop from './AboutHero';
import AboutTeam from './AboutTeam';
import Aim from './Aim';
import AboutEnd from './AboutEnd';
import theme from '../styles/theme';

const AboutPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header position="fixed" />
        <Element name="about-happyhead">
          <AboutTop />
        </Element>
        <AboutEnd />
        <Element name="about-aim">
          <Aim />
        </Element>
        <Element name="about-team">
          <AboutTeam />
        </Element>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default AboutPage;

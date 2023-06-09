import React from 'react';
import { Element, scroller } from 'react-scroll';
import Header from '../Layout/Header/Index';
import Footer from '../Layout/Footer/Index';
import AboutTop from './AboutHero';
import AboutTeam from './AboutTeam';
import Aim from './Aim';
import AboutEnd from './AboutEnd';

const AboutPage = () => {
  const scrollToElement = (name) => {
    scroller.scrollTo(name, {
      duration: 800,
      smooth: true,
      offset: -50, // Optional offset for scrolled position
    });
  };

  return (
    <>
      <div>
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
        <Footer scrollToElement={scrollToElement} />
      </div>
    </>
  );
};

export default AboutPage;


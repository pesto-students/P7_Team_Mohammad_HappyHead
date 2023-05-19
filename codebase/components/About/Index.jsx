import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../Layout/Header/Index'
import Footer from '../Layout/Footer/Index'
import AboutTop from './AboutHero'
import AboutTeam from './AboutTeam'
import WhoWhatWe from './WhoWhatWe'
import AboutEnd from './AboutEnd'
import theme from '../styles/theme'

const AboutPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <AboutTop />
      <AboutTeam/>
      <WhoWhatWe/>
      <AboutEnd />
      <Footer />
    </ThemeProvider>
  )
}

export default AboutPage

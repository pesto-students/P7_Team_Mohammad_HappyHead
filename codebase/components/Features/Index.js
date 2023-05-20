import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../Layout/Header/Index'
import Footer from '../Layout/Footer/Index'
import Features from '../Features/Features'
import theme from '../styles/theme'
{/* <Features isLoggedIn={isLoggedIn} /> */}

const FeaturesPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <Features/>
      <Footer />
    </ThemeProvider>
  )
}

export default FeaturesPage
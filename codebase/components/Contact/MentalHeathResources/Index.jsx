import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import theme from '../../styles/theme'
import ResourceComp from '../../Contact/MentalHeathResources/ResourcePage'

const Resources = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed" />
      <ResourceComp />
      <Footer />
    </ThemeProvider>
  )
}

export default Resources
import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../../Layout/Header/Index'
import Footer from '../../../Layout/Footer/Index'
import Report from './Report'
import theme from '../../../styles/theme'

const Recommendations = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <Report/>
      <Footer />
    </ThemeProvider>
  )
}

export default Recommendations
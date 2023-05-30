import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import theme from '../../styles/theme'
import AboutTool from './AboutTool'

const QnA = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <AboutTool/>
      <Footer />
    </ThemeProvider>
  )
}

export default QnA


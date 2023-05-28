import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import theme from '../../styles/theme'

const Connect = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <div>Connect w/ experts</div>
      <Footer />
    </ThemeProvider>
  )
}

export default Connect
import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../../components/Layout/Header/Index'
import Footer from '../../../components/Layout/Footer/Index'
import Tools from './toolslist'
import theme from '../../../components/styles/theme'

const ToolsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <Tools/>
      <Footer />
    </ThemeProvider>
  )
}

export default ToolsPage
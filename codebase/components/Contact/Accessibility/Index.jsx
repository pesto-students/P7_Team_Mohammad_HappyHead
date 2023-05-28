import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import theme from '../../styles/theme'
import AccessibilityPage from '../../Contact/Accessibility/Accessibility'

const Accessibility = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed" />
      <AccessibilityPage />
      <Footer />
    </ThemeProvider>
  )
}

export default Accessibility
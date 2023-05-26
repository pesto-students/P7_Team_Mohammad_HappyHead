import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import Contact from './ContactForm'
import theme from '../../styles/theme'

const ContactPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <Contact />
      <Footer />
    </ThemeProvider>
  )
}

export default ContactPage
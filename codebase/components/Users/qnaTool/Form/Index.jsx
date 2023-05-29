import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../../Layout/Header/Index'
import Footer from '../../../Layout/Footer/Index'
import Form from './Form'
import theme from '../../../styles/theme'

const UserQnAPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <Form/>
      <Footer />
    </ThemeProvider>
  )
}

export default UserQnAPage
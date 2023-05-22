import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import UserTools from './MeditationToolsPage'
import theme from '../../styles/theme'

const UserToolsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <UserTools/>
      <Footer />
    </ThemeProvider>
  )
}

export default UserToolsPage
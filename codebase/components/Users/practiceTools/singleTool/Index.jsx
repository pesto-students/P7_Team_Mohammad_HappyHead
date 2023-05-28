import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../../Layout/Header/Index'
import Footer from '../../../Layout/Footer/Index'
import UserTool from './SingleTool'
import theme from '../../../styles/theme'

const UserToolPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <UserTool/>
      <Footer />
    </ThemeProvider>
  )
}

export default UserToolPage
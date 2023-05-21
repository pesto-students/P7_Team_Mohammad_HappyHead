import React from 'react'
import { ThemeProvider } from '@mui/material'
import theme from '../styles/theme'
import ExpertsList from './ExpertsList'
import Header from '../Layout/Header/Index'
import Footer from '../Layout/Footer/Index'


const ExpertsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed"/>
      <ExpertsList/>
      <Footer />
    </ThemeProvider>
  )
}

export default ExpertsPage

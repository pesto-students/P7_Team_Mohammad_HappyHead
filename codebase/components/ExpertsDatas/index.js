import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../Layout/Header/Index'
import Footer from '../Layout/Footer/Index'
import ExpertsDashboard from '../ExpertsDatas/ExpertsDashboard'
import theme from '../styles/theme'
import AvailibilityForm from './AvailabilityForm'

const ExpertsDataPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed" />
      <ExpertsDashboard/>
      <Footer />
    </ThemeProvider>
  );
};

export default ExpertsDataPage
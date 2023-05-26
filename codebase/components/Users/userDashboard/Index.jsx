import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import UserDashboard from './UserDashboard'
// import NewDashboard from './NewDashboard'
import theme from '../../styles/theme'

const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header position="fixed" />
      <UserDashboard/>
      {/* <NewDashboard/> */}
      <Footer />
    </ThemeProvider>
  );
};

export default Dashboard
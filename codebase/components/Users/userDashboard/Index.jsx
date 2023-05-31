import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import UserDashboard from './UserDashboard'

const Dashboard = () => {
  return (
    <>
      <Header position="fixed" />
      <UserDashboard />
      <Footer />
    </>
  );
};

export default Dashboard
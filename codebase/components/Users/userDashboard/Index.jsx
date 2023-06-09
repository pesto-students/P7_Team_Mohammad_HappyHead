import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import UserDashboard from './UserDashboard'
import UserTools from './ToolCard'
import UpcomingAppointments from './Upcoming Appointments'


const Dashboard = () => {
  return (
    <>
      <Header position="fixed" />
      <UserDashboard />
      <UserTools />
      <UpcomingAppointments />
      <Footer />
    </>
  );
};

export default Dashboard
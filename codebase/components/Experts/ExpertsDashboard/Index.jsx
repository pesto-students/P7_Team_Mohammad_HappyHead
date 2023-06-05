import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import ExpertsDashboard from '../../Experts/ExpertsDashboard/ExpertDashboard'
import UpcomingAppointments from '../../Experts/ExpertsDashboard/UpcomingAppointments'

const ExpertsDataPage = () => {
  return (
    <>
      <Header position="fixed" />
      <ExpertsDashboard/>
       <UpcomingAppointments />
      <Footer />
    </>
  );
};

export default ExpertsDataPage
import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import ExpertsDashboard from '../../Experts/ExpertsDashboard/ExpertDashboard'
import CurrentAvail from '../../Experts/ExpertsDashboard/CurrentAvailability'
import UpcomingAppointments from '../../Experts/ExpertsDashboard/UpcomingAppointments'

const ExpertsDataPage = () => {
  return (
    <>
      <Header position="fixed" />
      <ExpertsDashboard/>
      <CurrentAvail />
      <UpcomingAppointments />
      <Footer />
    </>
  );
};

export default ExpertsDataPage
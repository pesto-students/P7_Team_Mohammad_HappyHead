import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import ExpertsDashboard from './ExpertDasboard'
import AvailabilityForm from './AvailabilityForm'
import UpcomingAppointments from './UpcomingAppointments'

const ExpertsDataPage = () => {
  return (
    <>
      <Header position="fixed" />
      <ExpertsDashboard />
      <AvailabilityForm />
      <UpcomingAppointments />
      <Footer />
    </>
  );
};

export default ExpertsDataPage
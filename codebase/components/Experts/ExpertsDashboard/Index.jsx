import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import ExpertsDashboard from '../../Experts/ExpertsDashboard/ExpertDashboard'
import CurrentAvail from '../../Experts/ExpertsDashboard/CurrentAvailability'

const ExpertsDataPage = () => {
  return (
    <>
      <Header position="fixed" />
      <ExpertsDashboard/>
      <CurrentAvail />
      <Footer />
    </>
  );
};

export default ExpertsDataPage
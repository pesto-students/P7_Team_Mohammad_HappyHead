import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import ExpertsDashboard from '../../Experts/ExpertsDashboard/ExpertDashboard'

const ExpertsDataPage = () => {
  return (
    <>
      <Header position="fixed" />
      <ExpertsDashboard />
      <Footer />
    </>
  );
};

export default ExpertsDataPage
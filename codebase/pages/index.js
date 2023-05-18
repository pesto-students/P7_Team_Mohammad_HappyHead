import React from 'react';
import ResponsiveAppBar from '../components/Layout/Header/Index';
import Footer from '../components/Layout/Footer/Index';

function IndexPage() {
  return (
    <div>
      <ResponsiveAppBar />
      <h1>Welcome to the homepage</h1>
      {/* Other content */}
      <Footer/>
    </div>
  );
}

export default IndexPage;

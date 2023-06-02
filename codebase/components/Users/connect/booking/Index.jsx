import React from 'react'
import Header from '../../../Layout/Header/Index'
import Footer from '../../../Layout/Footer/Index'
import Booking from './Booking'

const BookSlot = () => {
  return (
    <>
      <Header position="fixed" />
      <Booking />
      <Footer />
    </>
  );
};

export default BookSlot
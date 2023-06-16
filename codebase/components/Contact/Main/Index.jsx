import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import Contact from './ContactForm'

const ContactPage = () => {
  return (
    <>
      <Header position="fixed"/>
      <Contact />
      <Footer />
    </>
  )
}

export default ContactPage
import React from 'react'
import Header from '../Layout/Header/Index'
import Footer from '../Layout/Footer/Index'
import Logout from './LogoutPage'

const LoggedOutPage = () => {
  return (
    <>
      <Header position="fixed"/>
      <Logout />
      <Footer />
    </>
  )
}

export default LoggedOutPage
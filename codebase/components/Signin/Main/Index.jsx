import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import SignIn from './SignInForm.jsx'

const SingInPage = () => {
  return (
    <>
      <Header position="fixed"/>
      <SignIn />
      <Footer />
    </>
  )
}

export default SingInPage
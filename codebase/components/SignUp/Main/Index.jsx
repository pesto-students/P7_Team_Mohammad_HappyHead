import React from 'react'
import Header from '../../Layout/Header/Index'
import Footer from '../../Layout/Footer/Index'
import SignUp from './SignUpForm.jsx'

const SingUpPage = () => {
  return (
    <>
      <Header position="fixed"/>
      <SignUp />
      <Footer />
    </>
  )
}

export default SingUpPage
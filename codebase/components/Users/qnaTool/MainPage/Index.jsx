import React from 'react'
import Header from '../../../Layout/Header/Index'
import Footer from '../../../Layout/Footer/Index'
import QnAMain from './Main'

const UserQnAPage = () => {
  return (
    <>
      <Header position="fixed"/>
      <QnAMain/>
      <Footer />
    </>
  )
}

export default UserQnAPage
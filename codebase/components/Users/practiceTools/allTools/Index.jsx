import React from 'react'
import Header from '../../../Layout/Header/Index'
import Footer from '../../../Layout/Footer/Index'
import UserTools from './MeditationToolsPage'


const UserToolsPage = () => {
  return (
    <>
      <Header position="fixed"/>
      <UserTools/>
      <Footer />
    </>
  )
}

export default UserToolsPage
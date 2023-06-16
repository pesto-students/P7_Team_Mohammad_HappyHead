import React from 'react'
import Header from '../../../Layout/Header/Index'
import Footer from '../../../Layout/Footer/Index'
import UserTool from './SingleTool'

const UserToolPage = () => {
  return (
    <>
      <Header position="fixed"/>
      <UserTool/>
      <Footer />
    </>
  )
}

export default UserToolPage
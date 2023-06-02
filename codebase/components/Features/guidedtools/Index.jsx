import React from 'react'
import Header from '../../../components/Layout/Header/Index'
import Footer from '../../../components/Layout/Footer/Index'
import Tools from './toolslist'


const ToolsPage = () => {
  return (
    <>
      <Header position="fixed"/>
      <Tools/>
      <Footer />
    </>
  )
}

export default ToolsPage
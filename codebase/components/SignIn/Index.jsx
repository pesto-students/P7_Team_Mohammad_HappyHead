import React from 'react'
import { ThemeProvider } from '@mui/material'
import Header from '../Layout/Header/Index'
import Footer from '../Layout/Footer/Index'
import theme from '../styles/theme'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
      <ThemeProvider theme={theme}>
        <Header position="fixed"/>
        <SignInForm /> 
        <Footer />
      </ThemeProvider>
    )
}


export default SignIn;
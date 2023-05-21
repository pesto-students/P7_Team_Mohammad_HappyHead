import React from 'react'
import { CardContent, Typography, Grid } from '@mui/material'
import { ThemeProvider, styled } from '@mui/system'
import {redirectToPage} from '../../utils/redirect'
import RootContainer from '../styles/RootContainerStyles'
import ContentContainer from '../styles/ContentContainerStyles'
import CardStyle from '../styles/CardStyles'
import theme from '../styles/theme'
import MuiLink from '../MuiLink'
import { toolsData } from './toolsData';

// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}))

// Styled component for the content container
const CustomContentContainer = styled(ContentContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: '2rem',
  [theme.breakpoints.up('lg')]: {
    padding: '4rem',
  },
}))


const Features = ({ isLoggedIn }) => {
  // Function to handle card click
  const handleCardClick = (tool) => {
    if (isLoggedIn) {
      console.log(`Redirecting to ${tool.path}`)
      redirectToPage(tool.path); // Call the redirect function with the tool's path
    } else {
      console.log('User not logged in. Redirecting to login page...')
      redirectToPage('/loginUser'); // Redirect to the login page if user is not logged in
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <Grid container spacing={2}>
            {toolsData.map((tool, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CardStyle onClick={() => handleCardClick(tool)}>
                  <CardContent>
                    <MuiLink
                      href={isLoggedIn ? tool.path : '/loginUser'}
                      underline="none"
                      color="inherit"
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {tool.name}
                    </MuiLink>
                    <MuiLink
                      href={isLoggedIn ? tool.path : '/loginUser'}
                      underline="none"
                      color="inherit"
                      variant="body1"
                      component="p"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {tool.subtext}
                    </MuiLink>
                  </CardContent>
                </CardStyle>
              </Grid>
            ))}
          </Grid>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  )
}

export default Features

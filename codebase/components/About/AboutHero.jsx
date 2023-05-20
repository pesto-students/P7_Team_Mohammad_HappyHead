import React from 'react'
import { styled } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import theme from '../styles/theme'
import Title from '../styles/TitleStyles'
import SubText from '../styles/SubTextStyles'
import ImageList from './ImagesSection'
import RootContainer from '../styles/RootContainerStyles'
import ContentContainer from '../styles/ContentContainerStyles'

// Styled component for the root container
const CustomeRoot = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}))

// Styled component for the main content container
const CustomAboutContainer = styled(ContentContainer)(({ theme }) => ({
  maxWidth: 'none', // Exclude the maxWidth property
  flexDirection: 'row',
  backgroundColor: theme.palette.secondary.main,
  margin: theme.spacing(2),
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}))

// Styled component for each section in the AboutHero component
const AboutSection = styled('div')(({ theme }) => ({
  flex: '1',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '300px', // Set a minimum width for each section
}))

// Styled component for centered subtext
const CenteredSubText = styled(SubText)({
  textAlign: 'center',
})

const AboutHero = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Root container */}
      <CustomeRoot>
        {/* Main content container */}
        <CustomAboutContainer>
          {/* First section */}
          <AboutSection>
            <Title variant="h2">About HappyHead</Title>
            <CenteredSubText variant="h5">
              HappyHead was started with one mission: to helping individuals rediscover their joy, regain their authentic selves, and enhance their overall well-being.
            </CenteredSubText>
          </AboutSection>
          {/* Second section */}
          <AboutSection>
            <ImageList />
          </AboutSection>
        </CustomAboutContainer>
      </CustomeRoot>
    </ThemeProvider>
  )
}

export default AboutHero

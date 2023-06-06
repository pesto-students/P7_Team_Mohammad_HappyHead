import React from 'react'
import { styled } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import theme from '../styles/theme'
import Title from '../styles/TitleStyles'
import SubText from '../styles/SubTextStyles'
import ImageList from './ImagesSection'
import RootContainer from '../styles/RootContainerStyles'
import SectionContainer from '../styles/SectionsContainer'

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem',
}));

// Styled component for each section in the AboutHero component
const AboutSection = styled('div')(({ theme }) => ({
  flex: '1',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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
      <CustomRootContainer>
        {/* Main content container */}
        <SectionContainer>
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
        </SectionContainer>
      </CustomRootContainer>
    </ThemeProvider>
  )
}

export default AboutHero

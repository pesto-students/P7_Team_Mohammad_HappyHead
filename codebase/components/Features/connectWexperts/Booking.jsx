import React from 'react'
import { styled } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import theme from '../../styles/theme'
import Title from '../../styles/TitleStyles'
import SubText from '../../styles/SubTextStyles'
// import ImageList from './ImagesSection'
import RootContainer from '../../styles/RootContainerStyles'
import ContentContainer from '../../styles/ContentContainerStyles'

// Styled component for the root container
const CustomeRoot = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.tertiary.main,
}))

// Styled component for the main content container
const CustomAboutContainer = styled(ContentContainer)(({ theme }) => ({
  maxWidth: 'none', // Exclude the maxWidth property
  flexDirection: 'row',
  backgroundColor: theme.palette.tertiary.main,
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

// Styled component for the image
const CustomImage = styled('img')({
    border: `0.3rem solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    width: '50%',
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
});

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
          <CustomImage src="/images/connectwexperts/bookingMob.png" alt="Image 2" />
          </AboutSection>
         
          {/* Second section */}
          <AboutSection>
            <Title variant="h4">Quick And Easy Booking</Title>
            <CenteredSubText variant="h5">
            Once you find an expert that suits your needs, you can view detailed profiles that include information about the expert's qualifications, years of experience, specializations, and consultation fees. You can also explore the availability of the experts, including available dates and time slots for appointments.
            </CenteredSubText>
          </AboutSection>
        </CustomAboutContainer>
      </CustomeRoot>
    </ThemeProvider>
  )
}

export default AboutHero

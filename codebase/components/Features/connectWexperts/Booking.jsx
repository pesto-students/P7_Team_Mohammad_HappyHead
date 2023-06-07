import React from 'react'
import { styled } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { Typography } from '@mui/material';
import theme from '../../styles/theme'
import SubText from '../../styles/SubTextStyles'
import RootContainer from '../../styles/RootContainerStyles'
import ContentContainer from '../../styles/ContentContainerStyles'

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '2rem',
}));

// Styled component for the main content container
const CustomAboutContainer = styled(ContentContainer)(({ theme }) => ({
  flexDirection: 'row',
  backgroundColor: theme.palette.tertiary.main,
  margin: '0',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  borderRadius: '8px',
  width: '100%',
  padding: '2rem',
  [theme.breakpoints.down('sm')]: {
    padding: '0.5rem',
  },
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
})

const CustomTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

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
        <CustomAboutContainer>
          {/* First section */}
          <AboutSection>
            <CustomImage src="/images/connectwexperts/bookingMob.png" alt="Image 2" />
          </AboutSection>
         
          {/* Second section */}
          <AboutSection>
          <CustomTitle component="h2"> Quick And Easy Booking</CustomTitle>
            <CenteredSubText variant="h5">
              Once you find an expert that suits your needs, you can view detailed profiles that include information about the expert&apos;s qualifications, years of experience, specializations, and consultation fees. You can also explore the availability of the experts, including available dates and time slots for appointments.
            </CenteredSubText>
          </AboutSection>
        </CustomAboutContainer>
      </CustomRootContainer>
    </ThemeProvider>
  )
}

export default AboutHero

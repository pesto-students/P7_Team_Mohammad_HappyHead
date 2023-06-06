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
  padding: '0rem 2rem',
}));

// Styled component for the main content container
const CustomAboutContainer = styled(ContentContainer)(({ theme }) => ({
  flexDirection: 'row',
  backgroundColor: theme.palette.quinary.main,
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

const CustomTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

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
      <CustomRootContainer>
        {/* Main content container */}
        <CustomAboutContainer>
          {/* First section */}
          <AboutSection>
            <CustomTitle component="h2"> Find The Right Expert</CustomTitle>
            <CenteredSubText variant="h5">
              You can browse through a diverse selection of experienced and licensed mental health experts. Each expert is carefully vetted to ensure their expertise and credentials, giving you the peace of mind when choosing a professional to connect with.
            </CenteredSubText>
          </AboutSection>
          {/* Second section */}
          <AboutSection>
            <CustomImage src="/images/connectwexperts/expertsMob.png" alt="Image 1" />
          </AboutSection>
        </CustomAboutContainer>
      </CustomRootContainer>
    </ThemeProvider>
  )
}

export default AboutHero

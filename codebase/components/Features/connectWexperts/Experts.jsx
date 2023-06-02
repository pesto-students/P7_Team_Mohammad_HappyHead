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
  backgroundColor: theme.palette.quinary.main,
}))

// Styled component for the main content container
const CustomAboutContainer = styled(ContentContainer)(({ theme }) => ({
  maxWidth: 'none', // Exclude the maxWidth property
  flexDirection: 'row',
  backgroundColor: theme.palette.quinary.main,
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
            <Title variant="h4">Find The Right Expert</Title>
            <CenteredSubText variant="h5">
            You can browse through a diverse selection of experienced and licensed mental health experts. Each expert is carefully vetted to ensure their expertise and credentials, giving you the peace of mind when choosing a professional to connect with.
            </CenteredSubText>
          </AboutSection>
          {/* Second section */}
          <AboutSection>
          <CustomImage src="/images/connectwexperts/expertsMob.png" alt="Image 1" />
          </AboutSection>
        </CustomAboutContainer>
      </CustomeRoot>
    </ThemeProvider>
  )
}

export default AboutHero

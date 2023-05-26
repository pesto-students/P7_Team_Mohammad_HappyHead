import React from 'react'
import { Button, Typography } from '@mui/material'
import { styled, ThemeProvider } from '@mui/system'
import Face2OutlinedIcon from '@mui/icons-material/Face2Outlined'
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined'
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined'
import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined'

import theme from '../styles/theme'
import RootContainer from '../styles/RootContainerStyles'
import ContentContainer from '../styles/ContentContainerStyles'
import IconContainer from '../styles/IconContainerStyles'
import Title from '../styles/TitleStyles'
import SubText from '../styles/SubTextStyles'
import ButtonWrapper from '../styles/ButtonWrapperStyles'

// Styled component for the custom root container
const CustomRootContainer = styled(RootContainer)({
  backgroundColor: theme.palette.quinary.main, 
})

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
  backgroundColor: theme.palette.quinary.main, 
  padding: '2.5rem',
})

const LoginLinkTypography = styled(Typography)`
  padding-top: 16px;
  color: ${({ theme }) => theme.palette.text.primary};

  a {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
const AboutHero = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Custom Root container */}
      <CustomRootContainer>
        {/* Custom Content container */}
        <CustomContentContainer>
          {/* Title */}
          <Title variant="h2">Try HappyHead for free today</Title>

          {/* Sub text */}
          <SubText variant="h5">Find more joy, less stress, and the best sleep ever with HappyHead. Try it for free today.</SubText>

          {/* Icons */}
          <IconContainer>
            <Face2OutlinedIcon fontSize="large" />
            <FaceOutlinedIcon fontSize="large" />
            <Face4OutlinedIcon fontSize="large" />
            <Face5OutlinedIcon fontSize="large" />
          </IconContainer>

          {/* Button to explore tools */}
          <ButtonWrapper color="primary">
            <Button variant="contained" color="quaternary">
              Try for free
            </Button>
          </ButtonWrapper>

          {/* Button to register as an expert */}
          <ButtonWrapper color="tertiary">
            <Button variant="contained" color="tertiary">
              Register as an Expert
            </Button>
          </ButtonWrapper>

          {/* Link for "Already a user? Login" */}
          <LoginLinkTypography
            variant="body2"
            color="primary"
            align="center"
          >
            Already a user? <a href="/login">Login</a>
          </LoginLinkTypography>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  )
}

export default AboutHero

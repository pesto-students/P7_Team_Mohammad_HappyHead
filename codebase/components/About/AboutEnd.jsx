import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import Face2OutlinedIcon from '@mui/icons-material/Face2Outlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined';

import theme from '../styles/theme';
import RootContainer from '../styles/RootContainerStyles';
import IconContainer from '../styles/IconContainerStyles';
import Title from '../styles/TitleStyles';
import SubText from '../styles/SubTextStyles';
import ButtonWrapper from '../styles/ButtonWrapperStyles';
import SectionContainer from '../styles/SectionsContainer'

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '2rem 2rem 1rem  2rem',
}));

// Styled component for the main content container
const CustomSectionContainer = styled(SectionContainer)(({ theme }) => ({
  backgroundColor: theme.palette.quinary.main,
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '100%', 
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '3rem',
},
}));

const CustomTitle = styled(Title)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
    padding: '1rem',
},
}));

const LoginLinkTypography = styled(Typography)(({ theme }) => ({
  paddingTop: 16,
  color: theme.palette.text.primary,

  '& a': {
    color: theme.palette.text.primary,
  },
}));

const AboutHero = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Custom Root container */}
      <CustomRootContainer>
        {/* Custom Content container */}
        <CustomSectionContainer>
          {/* Title */}
          <CustomTitle variant="h2">Try HappyHead for free today</CustomTitle>

          {/* Sub text */}
          <SubText variant="h5">
            Find more joy, less stress, and the best sleep ever with HappyHead. Try it for free today.
          </SubText>

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
          <LoginLinkTypography variant="body2" color="primary" align="center">
            Already a user? <a href="/login">Login</a>
          </LoginLinkTypography>
        </CustomSectionContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
};

export default AboutHero;

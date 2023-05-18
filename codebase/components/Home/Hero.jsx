import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import Face2OutlinedIcon from '@mui/icons-material/Face2Outlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined';

import theme from '../styles/theme';

// Styles for the root container
const RootContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2, 0), // Add padding on top and bottom
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

// Styles for the content container
const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100%', // Set maximum width to 100% of the viewport width
});

// Styles for the icon container
const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
}));

// Styles for the icon
const Icon = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '100px',
  margin: theme.spacing(0, 2),
}));

// Styles for the title
const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: 'Roboto, Arial, sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.2rem', // Reduce font size for mobile view
  },
}));

// Styles for the subtitle
const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  marginBottom: theme.spacing(2), // Add spacing below the subtitle
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem', // Reduce font size for mobile view
  },
}));

const ButtonWrapper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const HeroComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Root container */}
      <RootContainer>
        {/* Content container */}
        <ContentContainer>
          {/* Title */}
          <Title variant="h2">Your Chief Happiness Officer</Title>

          {/* Subtitle */}
          <Subtitle variant="h3">HappyHead</Subtitle>

          {/* Icons */}
          <IconContainer>
            <Face2OutlinedIcon fontSize="large" />
            <FaceOutlinedIcon fontSize="large" />
            <Face4OutlinedIcon fontSize="large" />
            <Face5OutlinedIcon fontSize="large" />
          </IconContainer>

          {/* Buttons */}
          <ButtonWrapper>
            <Button variant="contained" color="quaternary">
              Explore Tools
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant="contained" color="tertiary">
              Register as an Expert
            </Button>
          </ButtonWrapper>
        </ContentContainer>
      </RootContainer>
    </ThemeProvider>
  );
};

export default HeroComponent;

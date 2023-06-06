import React, {useState, useEffect} from 'react';
import { Button, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Face2OutlinedIcon from '@mui/icons-material/Face2Outlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined';
import styled from '@emotion/styled';

import theme from '../styles/theme';
import RootContainer from '../styles/RootContainerStyles';
import ContentContainer from '../styles/ContentContainerStyles';
import IconContainer from '../styles/IconContainerStyles';
import Title from '../styles/TitleStyles';
import Subtitle from '../styles/SubtitleStyles';
import ButtonWrapper from '../styles/ButtonWrapperStyles';
import Loader from '../styles/Loader';

const LoginLinkTypography = styled(Typography)`
  padding-top: 16px;
  color: ${({ theme }) => theme.palette.text.primary};

  a {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const HeroComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      {/* Custom root container */}
      <RootContainer>
        {/* Custom content container */}
        <ContentContainer>
          {/* Title */}
          <Title variant="h2">Your Chief Happiness Officer</Title>

          {/* Subtitle */}
          <Subtitle variant="h3">HappyHead</Subtitle>

          {/* Icon container */}
          <IconContainer>
            {/* Icons */}
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
        </ContentContainer>
      </RootContainer>
    </ThemeProvider>
  );
};

export default HeroComponent;

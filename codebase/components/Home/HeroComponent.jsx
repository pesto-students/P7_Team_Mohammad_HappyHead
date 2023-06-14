import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import Face2OutlinedIcon from "@mui/icons-material/Face2Outlined";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import Face4OutlinedIcon from "@mui/icons-material/Face4Outlined";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import styled from "@emotion/styled";
import Link from 'next/link'
import theme from '../styles/theme';
import RootContainer from '../styles/RootContainerStyles';
import ContentContainer from '../styles/ContentContainerStyles';
import IconContainer from '../styles/IconContainerStyles';
import Title from '../styles/TitleStyles';
import Subtitle from '../styles/SubtitleStyles';
import ButtonWrapper from '../styles/ButtonWrapperStyles';
import { useRouter } from "next/router";

// Styled component for the root container
const CustomRoot = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const LoginLinkTypography = styled(Typography)`
  padding-top: 16px;
  color: ${({ theme }) => theme.palette.text.primary};

  a {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;



const HeroComponent = () => {
  const router = useRouter();

  const handleUseClick = (e) => {
    router?.push("/users/signup");
  };

  const handleExpertClick = (e) => {
    router?.push("/experts/signup");
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Custom root container */}
      <CustomRoot>
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
          <ButtonWrapper color="primary" sx={{marginTop: '2rem',}}>
            <Button
              variant="contained"
              color="quaternary"
              onClick={handleUseClick}
            >
              Try for free
            </Button>
          </ButtonWrapper>

          {/* Link for "Already a user? Login" */}
          <LoginLinkTypography variant="body2" color="primary" align="center">
            Already a user? <Link href="/users/signin">Login</Link>
          </LoginLinkTypography>

          {/* Button to register as an expert */}
          <ButtonWrapper color="tertiary" sx={{marginTop: '2rem',}}>
            <Button variant="contained" color="tertiary"
              onClick={handleExpertClick}>
              Register as an Expert
            </Button>
          </ButtonWrapper>

          {/* Link for "Already an expert? Login" */}
          <LoginLinkTypography variant="body2" color="primary" align="center">
            Already an expert? <Link href="/experts/signin">Login</Link>
          </LoginLinkTypography>
        </ContentContainer>
      </CustomRoot>
    </ThemeProvider>
  );
};

export default HeroComponent;

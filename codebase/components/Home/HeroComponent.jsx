import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import Face2OutlinedIcon from '@mui/icons-material/Face2Outlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined';

import theme from '../styles/theme';
import RootContainer from './RootContainer';
import ContentContainer from './ContentContainer';
import IconContainer from './IconContainer';
import Title from './Title';
import Subtitle from './Subtitle';
import ButtonWrapper from './ButtonWrapper';

const HeroComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <ContentContainer>
          <Title variant="h2">Your Chief Happiness Officer</Title>
          <Subtitle variant="h3">HappyHead</Subtitle>
          <IconContainer>
            <Face2OutlinedIcon fontSize="large" />
            <FaceOutlinedIcon fontSize="large" />
            <Face4OutlinedIcon fontSize="large" />
            <Face5OutlinedIcon fontSize="large" />
          </IconContainer>
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

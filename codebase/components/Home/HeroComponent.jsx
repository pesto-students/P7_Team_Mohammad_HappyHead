import React from 'react'
import { Button, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import Face2OutlinedIcon from '@mui/icons-material/Face2Outlined'
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined'
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined'
import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined'

import theme from '../styles/Theme'
import RootContainer from '../styles/RootContainerStyles'
import ContentContainer from '../styles/ContentContainerStyles'
import IconContainer from '../styles/IconContainerStyles'
import Title from '../styles/TitleStyles'
import Subtitle from '../styles/SubtitleStyles'
import ButtonWrapper from '../styles/ButtonWrapperStyles'

const HeroComponent = () => {
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
              Explore Tools
            </Button>
          </ButtonWrapper>

          {/* Button to register as an expert */}
          <ButtonWrapper color="tertiary">
            <Button variant="contained" color="tertiary">
              Register as an Expert
            </Button>
          </ButtonWrapper>
        </ContentContainer>
      </RootContainer>
    </ThemeProvider>
  );
};

export default HeroComponent

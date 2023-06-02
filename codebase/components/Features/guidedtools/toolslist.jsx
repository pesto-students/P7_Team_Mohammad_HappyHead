import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';

import theme from '../../../components/styles/theme';
import RootContainer from '../../../components/styles/RootContainerStyles';
import ButtonWrapper from '../../../components/styles/ButtonWrapperStyles';
import Title from '../../../components/styles/TitleStyles';
import { redirectToPage } from '../../../utils/redirect';
import meditationTools from '../../Users/practiceTools/toolsData';

const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '2rem 0',
}));

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundImage: `linear-gradient(to bottom, ${theme.palette.tertiary.main}, ${theme.palette.quinary.main})`,
  width: '90%',
  [theme.breakpoints.up('md')]: {
    width: '80vw',
  },
  margin: '0.5rem',
  padding: '0 2rem',
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: '8px',
}));

const CustomButtonWrapper = styled(ButtonWrapper)(({ theme }) => ({
  marginTop: '2rem',
}));

const CustomTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const CustomDesc = styled(Typography)(({ theme }) => ({
  marginTop: '0.5rem',
}));

const Tools = () => {

return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <Title variant="h3" component="h1" gutterBottom>
          Guided Meditation Tools
        </Title>
        {meditationTools.map((tool) => (
          <CustomCard key={tool.toolId} variant="outlined">
            <CardContent>
              <CustomTitle variant="h5" component="h2">
                {tool.title}
              </CustomTitle>
              <CustomDesc variant="h6" component="h2">
                {tool.description}
              </CustomDesc>
              <CustomButtonWrapper color="secondary">
                <Button
                  variant="contained"
                  color="quinary"
                  disabled={true}
                >
                  Start Practice
                </Button>
              </CustomButtonWrapper>
            </CardContent>
          </CustomCard>
        ))}
      </CustomRootContainer>
    </ThemeProvider>
  );
};

export default Tools;

import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';

import theme from '../../../components/styles/theme';
import RootContainer from '../../../components/styles/RootContainerStyles';
import ButtonWrapper from '../../../components/styles/ButtonWrapperStyles';
import meditationTools from '../../Users/practiceTools/toolsData';

const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem 2rem 2rem',
}));

const CustomCard = styled(Card)(({ theme, cardColor }) => ({
  backgroundColor: cardColor,
  width: '100%',
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
  ...theme.typography.h2, 
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize, 
  },
}));

const CustomDesc = styled(Typography)(({ theme }) => ({
  marginTop: '0.5rem',
}));

const CustomImage = styled('img')(({ theme }) => ({
  maxWidth: '100%', 
  height: 'auto', 
  marginBottom: '1rem',
  paddingTop: '2rem',
}));

const Heading = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize, 
  },
}));

const Tools = () => {
  // Define an array of colors
  const cardColors = [
    theme.palette.tertiary.main,
    theme.palette.secondary.main,
    theme.palette.quinary.main,
  ];

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <Heading variant="h3" component="h2" gutterBottom>
          Guided Meditation Tools
        </Heading>
        {meditationTools.map((tool, index) => (
          <CustomCard
            key={tool.toolId}
            variant="outlined"
            cardColor={cardColors[index % cardColors.length]} 
          >
            <CardContent>
              <CustomImage
                src={tool.image}
                alt={tool.title}
                style={{ maxWidth: '200px', height: 'auto' }} 
              />
              <CustomTitle component="h2"> 
                {tool.title}
              </CustomTitle>
              <CustomDesc variant="h6" component="h2">
                {tool.description}
              </CustomDesc>
              <CustomButtonWrapper color="secondary">
                <Button variant="contained" color="quinary" disabled={true}>
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

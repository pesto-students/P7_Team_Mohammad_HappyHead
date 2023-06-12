import React,{ useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import Loader from '../../styles/Loader'
import theme from '../../../components/styles/theme';
import RootContainer from '../../../components/styles/RootContainerStyles';
import ButtonWrapper from '../../../components/styles/ButtonWrapperStyles';
import meditationTools from '../../Users/practiceTools/toolsData';
import { redirectToPage } from '../../../utils/redirect';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay of 2 seconds for loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Define an array of colors
  const cardColors = [
    theme.palette.tertiary.main,
    theme.palette.secondary.main,
    theme.palette.quinary.main,
  ];

  const handleStart = () => {
    window.alert('Login to access');
    redirectToPage('/signup'); // Redirect to the login page if path doesnt exist
};


  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loader />
      ) : (
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
                <CustomTitle component="h2">{tool.title}</CustomTitle>
                <CustomDesc variant="h6" component="h2">
                  {tool.description}
                </CustomDesc>
                <CustomButtonWrapper color="primary">
                  <Button variant="contained" onClick={handleStart}>
                    Start Practice
                  </Button>
                </CustomButtonWrapper>
              </CardContent>
            </CustomCard>
          ))}
        </CustomRootContainer>
      )}
    </ThemeProvider>
  );
};

export default Tools;

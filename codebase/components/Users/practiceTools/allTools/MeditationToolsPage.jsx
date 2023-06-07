import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';

import theme from '../../../styles/theme';
import RootContainer from '../../../styles/RootContainerStyles';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import { redirectToPage } from '../../../../utils/redirect';
import meditationTools from '../toolsData';
import Loader from '../../../styles/Loader';

// Styled component for the root container
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
  borderRadius: '8px',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Update with desired box shadow style
    transform: 'scale(1.02)', // Update with desired transformation
  },
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

const CustomDesc = styled(Typography)(() => ({
  marginTop: '0.5rem',
}));

const CustomImage = styled('img')(() => ({
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

const MeditationTools = () => {
  const router = useRouter();
  const { username } = router.query;
  const [completedStages, setCompletedStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define an array of colors
  const cardColors = [
    theme.palette.tertiary.main,
    theme.palette.secondary.main,
    theme.palette.quinary.main,
  ];

  useEffect(() => {
    // Fetch the user's data, including the toolsCompleted array, based on the username
    const fetchUserSchema = async () => {
      try {
        // Make an API request to fetch the user's profile
        const response = await fetch(`/api/users/practicetools/${username}`);
        const data = await response.json();
        const stagesCompleted = data.toolsCompleted
        if (response.ok) {
          // Set the completed stages based on the user's toolsCompleted array
          setCompletedStages(stagesCompleted);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch user profile:', data.error);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setIsLoading(false);
      }
    };

    fetchUserSchema();
  });

  const handleToolClick = (toolId) => {
    // Redirect to the tool page if it's the first tool or if the previous tool is completed
    if (toolId === 1 || completedStages.includes(toolId - 1)) {
      redirectToPage(`/users/practicetools/${username}/${toolId}`);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
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
              <CustomButtonWrapper color="primary">
                <Button
                  variant="contained"
                  color="quinary"
                  onClick={() => handleToolClick(tool.toolId)}
                  disabled={tool.toolId !== 1 && !completedStages.includes(tool.toolId - 1)}
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

export default MeditationTools;

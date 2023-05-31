import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';

import theme from '../../../styles/theme';
import RootContainer from '../../../styles/RootContainerStyles';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import Title from '../../../styles/TitleStyles';
import { redirectToPage } from '../../../../utils/redirect';
import meditationTools from '../toolsData';

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
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
}));

const CustomDesc = styled(Typography)(({ theme }) => ({
  marginTop: '0.5rem',
}));

const MeditationTools = () => {
  const router = useRouter();
  const { username } = router.query;
  const [completedStages, setCompletedStages] = useState([]);

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
        } else {
          console.error('Failed to fetch user profile:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
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

return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <Title variant="h4" component="h1" gutterBottom>
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

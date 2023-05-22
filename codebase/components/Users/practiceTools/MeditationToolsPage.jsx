import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';

import theme from '../../styles/theme';
import RootContainer from '../../styles/RootContainerStyles';
import ButtonWrapper from '../../styles/ButtonWrapperStyles';
import Title from '../../styles/TitleStyles';
import { redirectToPage } from '../../../utils/redirect';
import meditationTools from './toolsData';

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

const MeditationTools = ({ username }) => {
  const [completedStages, setCompletedStages] = useState([]);

  useEffect(() => {
    // Fetch the user's data, including the toolsCompleted array, based on the username
    const fetchUserSchema = async () => {
      try {
        // Make an API request to fetch the user's profile
        const response = await fetch(`/api/users/${username}`);
        const data = await response.json();

        if (response.ok) {
          // Set the completed stages based on the user's toolsCompleted array
          setCompletedStages(data.toolsCompleted);
        } else {
          console.error('Failed to fetch user profile:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserSchema();
  }, [username]);

  const handleToolClick = (id) => {
    // Redirect to the tool page if it's the first tool or if the previous tool is completed
    if (id === 1 || completedStages.includes(id - 1)) {
      redirectToPage(`/users/practicetools/${username}/${id}`);
    }
  };

  const handleAudioEnd = async (id) => {
    if (!completedStages.includes(id)) {
      try {
        // Update the toolsCompleted array for the user
        const updatedToolsCompleted = [...completedStages, id];

        // Make an API request to update the user's profile
        const response = await fetch(`/api/users/${username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            toolsCompleted: updatedToolsCompleted,
          }),
        });

        if (response.ok) {
          // Update the completedStages state with the updated array
          setCompletedStages(updatedToolsCompleted);
        } else {
          console.error('Failed to update user profile:', data.error);
        }
      } catch (error) {
        console.error('Failed to update user profile:', error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <Title variant="h4" component="h1" gutterBottom>
          Guided Meditation Tools
        </Title>
        {meditationTools.map((tool) => (
          <CustomCard key={tool.id} variant="outlined">
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
                  onClick={() => handleToolClick(tool.id)}
                  disabled={tool.id !== 1 && !completedStages.includes(tool.id - 1)}
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

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import { redirectToPage } from '../../../../utils/redirect';

import meditationTools from '../toolsData';

import theme from '../../../styles/theme';
import RootContainer from '../../../styles/RootContainerStyles';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import Loader from '../../../styles/Loader';

const CustomRootContainer = styled(RootContainer)(() => ({
  padding: '1rem 2rem 2rem 2rem',
}));

const CustomCard = styled(Card)(({ theme, cardcolor }) => ({
  backgroundColor: cardcolor,
  flex: 1,
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

const Heading = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

const CustomAudio = styled('div')(({ theme }) => ({
  marginBottom: '2rem',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '1rem',
  marginBottom: '2rem',
  '& > *:not(:last-child)': {
    marginRight: '1.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    flexDirection: 'column',
    '& > *:not(:last-child)': {
      marginRight: '0',
      marginBottom: '0.7rem',
    },
  },
}));

const CustomDesc = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  paddingBottom: '2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const CustomImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '1rem',
  paddingTop: '2rem',
}));

const ToolPage = () => {
  const router = useRouter();
  const { toolId, username } = router.query;
  const [completedStages, setCompletedStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define an array of colors
  const cardColors = [
    theme.palette.tertiary.main,
    theme.palette.secondary.main,
    theme.palette.quinary.main,
    theme.palette.tertiary.main,
    theme.palette.secondary.main,
    theme.palette.quinary.main,
    theme.palette.tertiary.main,
    theme.palette.secondary.main,
  ];

  useEffect(() => {
    // Fetch the user's data, including the toolsCompleted array, based on the username
    const fetchUserSchema = async () => {
      try {
        // Make an API request to fetch the user's profile
        const response = await fetch(`/api/users/practicetools/${username}/${toolId}`);
        const data = await response.json();

        const stagesCompleted = data.toolsCompleted

        if (response.ok) {
          // Set the completed stages based on the user's toolsCompleted array
          setCompletedStages(stagesCompleted);

          // Check if the toolId is not in the completedStages array (except for meditationTools with toolID=1)
          if (toolId !== '1' && !stagesCompleted.includes(Number(toolId)) && Number(toolId) !== Math.max(...stagesCompleted) + 1) {
            console.log('Condition is true');
            alert('Please finish the previous stages before moving on to this stage.');
            redirectToPage(`/users/practicetools/${username}`);
          }
        } else {
          console.error('Failed to fetch user profile:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
      finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchUserSchema();
  });

  // Render loading state or placeholder component while fetching data
  if (isLoading) {
    return <Loader />;
  }

  const handleCompleteClick = async (toolId) => {
    if (!completedStages.includes(Number(toolId))) {
      try {
        // Update the toolsCompleted array for the user
        const updatedToolsCompleted = [...completedStages, Number(toolId)];
        console.log(updatedToolsCompleted)
        // Make an API request to update the user's profile
        const response = await fetch(`/api/users/practicetools/${username}/${toolId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            toolsCompleted: updatedToolsCompleted
          }),
        });
        if (response.ok) {
          // Update the completedStages state with the updated array
          setCompletedStages(updatedToolsCompleted);
          redirectToPage(`/users/practicetools/${username}`)
        } else {
          console.error('Failed to update user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to update user profile:', error);
      }
    }
    else redirectToPage(`/users/practicetools/${username}`);
  };

  const handleBackClick = () => {
    redirectToPage(`/users/practicetools/${username}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <Heading variant="h3" component="h2" gutterBottom>{meditationTools[toolId - 1]?.title}</Heading>
        <CustomCard cardcolor={cardColors[toolId - 1]}>
          <CustomImage
            src={meditationTools[toolId - 1]?.image}
            alt={meditationTools[toolId - 1]?.title}
            style={{ maxWidth: '200px', height: 'auto' }}
          />
          <CustomDesc>{meditationTools[toolId - 1]?.description}</CustomDesc>
          <CustomAudio>
          <audio controls src={meditationTools[toolId - 1]?.audio || ''}></audio>
          </CustomAudio>
        
        </CustomCard>

        {/* Render both buttons without any condition */}
        <ButtonContainer>
          <ButtonWrapper color="quaternary">
            <Button variant="contained" color="primary" onClick={() => handleCompleteClick(toolId)}>
              Practice Completed
            </Button>
          </ButtonWrapper>
          <ButtonWrapper color="tertiary">
            <Button variant="contained" color="primary" onClick={handleBackClick}>
              Go Back
            </Button>
          </ButtonWrapper>
        </ButtonContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
};
export default ToolPage;
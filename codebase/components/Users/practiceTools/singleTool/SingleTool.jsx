import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import { redirectToPage } from '../../../../utils/redirect';

import meditationTools from '../toolsData';

import theme from '../../../styles/theme';
import RootContainer from '../../../styles/RootContainerStyles';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import Loader from '../../../styles/Loader';

const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '2rem 0',
}));


const CustomAudio = styled('audio')(({ theme }) => ({
  // marginTop: '4rem',
  marginBottom: '0.5rem',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  // flexDirection: 'column',
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
  margin: '1rem 4rem 3rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const ToolPage = () => {
  const router = useRouter();
  const { toolId, username } = router.query;
  const [completedStages, setCompletedStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <h2>{meditationTools[toolId - 1]?.title}</h2>
        <CustomDesc>{meditationTools[toolId - 1]?.description}</CustomDesc>
        <CustomAudio controls src={meditationTools[toolId - 1]?.audio || ''} />
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
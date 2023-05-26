import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import meditationTools from './toolsData';
import { redirectToPage } from '../../../utils/redirect';

const CustomAudio = styled('audio')(({ theme }) => ({
  marginBottom: '1rem',
}));


const ToolPage = () => {
  const router = useRouter();
  const { username, toolId } = router.query;
  const [completedStages, setCompletedStages] = useState([]);
  
  useEffect(() => {
    // Fetch the user's data, including the toolsCompleted array, based on the username
    const fetchUserSchema = async () => {
      try {
        // Make an API request to fetch the user's profile
        const response = await fetch(`/api/users/dashboard/${username}`);
        const data = await response.json();
        const stagesCompleted = data.toolsCompleted
        console.log(stagesCompleted)
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
  }, [username]);


  const handleCompleteClick = async (toolId) => {
    if (!completedStages.includes(toolId)) {
      try {
        // Update the toolsCompleted array for the user
        const updatedToolsCompleted = [...completedStages, toolId];

        // Make an API request to update the user's profile
        const response = await fetch(`/api/users/dashboard/${username}`, {
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

  const handleBackClick = () => {
    redirectToPage(`/users/practicetools/${username}`);
  };

  return (
    <div>
      <h2>{meditationTools[toolId - 1]?.title}</h2>
      <CustomAudio controls src={meditationTools[toolId - 1]?.title || ''} />
      {/* Render both buttons without any condition */}
      <Button variant="contained" color="primary" onClick={handleBackClick}>
        Back
      </Button>
      <Button variant="contained" color="primary" onClick={handleCompleteClick}>
        Practice Completed
      </Button>
    </div>
  );
};
export default ToolPage;
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import meditationTools from './toolsData';
import { redirectToPage } from '../../../utils/redirect';

const CustomAudio = styled('audio')(({ theme }) => ({
  marginBottom: '1rem',
}));


const ToolPage = ({ username }) => {
  const router = useRouter();
  const { id } = router.query;
  const [completed, setCompleted] = useState(false); // Initialize completed state to true

  const handleCompleteClick = () => {
    setCompleted(true);
  };

  const handleBackClick = () => {
    redirectToPage(`/users/practicetools/${username}`);
  };

  return (
    <div>
      <h2>{meditationTools[id - 1]?.title}</h2>
      <CustomAudio controls src={meditationTools[id - 1]?.title || ''} />
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
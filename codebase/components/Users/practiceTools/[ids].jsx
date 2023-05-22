import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { styled, ThemeProvider } from '@mui/system'
import { useRouter } from 'next/router'
import meditationTools from './toolsData'
import { redirectToPage } from '../../../utils/redirect'


const CustomAudio = styled('audio')(({ theme }) => ({
  marginBottom: '1rem',
}))

const ToolPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Simulating audio completion
    const timer = setTimeout(() => {
      setCompleted(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCompleteClick = () => {
    setCompleted(true);
  }

  const handleBackClick = () => {
    redirectToPage(`/practice-tools`);
  }

  return (
    <div>
      <h2>{meditationTools[id - 1]?.title}</h2>
      <CustomAudio controls src={meditationTools[id - 1]?.audio} />
      {completed && (
        <Button variant="contained" color="primary" onClick={handleBackClick}>
          Back
        </Button>
      )}
      {!completed && (
        <Button variant="contained" color="primary" onClick={handleCompleteClick}>
          Practice Completed
        </Button>
      )}
    </div>
  )
}

export default ToolPage
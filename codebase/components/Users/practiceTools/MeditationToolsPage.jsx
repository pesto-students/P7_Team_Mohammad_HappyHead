import React, { useState } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'
import { styled, ThemeProvider } from '@mui/system'

import theme from '../../styles/theme'
import RootContainer from '../../styles/RootContainerStyles'
import ButtonWrapper from '../../styles/ButtonWrapperStyles'
import Title from '../../styles/TitleStyles'

import { redirectToPage } from '../../../utils/redirect'
import meditationTools from './toolsData'

const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '2rem 0', 
}))

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
}))

const CustomButtonWrapper = styled(ButtonWrapper)(({ theme }) => ({
  marginTop: '2rem',
}))

const CustomTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}))

const CustomDesc = styled(Typography)(({ theme }) => ({
  marginTop: '0.5rem', 
}))

const MeditationTools = () => {
  const [completedStages, setCompletedStages] = useState([]);

  const handleToolClick = (id) => {
    //Checks if the tool ID is either 1 (first tool in the array)or the tool on position toolID-1
    if (id === 1 || completedStages.includes(id - 1)) {
      redirectToPage(`/tools/${id}`)
    }
  }

  const handleAudioEnd = (id) => {
    //Add completed tool state to the array of completed stages
    if (!completedStages.includes(id)) {
      setCompletedStages([...completedStages, id])
    }
  }

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
                  //Start button is disabled on all incompleted tools except tool 1
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

export default MeditationTools

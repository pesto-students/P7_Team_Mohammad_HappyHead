import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Box, FormControl, FormGroup, FormControlLabel, Checkbox, Radio, RadioGroup, Button, IconButton } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import theme from '../../../styles/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { redirectToPage } from '../../../../utils/redirect';

// Import the default questionnaire data array
import defaultQuestionnaireData from '../questions';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(Box)(({ theme }) => ({
  padding: '1rem 2rem 2rem 2rem',
  backgroundColor: theme.palette.primary.main,
}));

// Styled component for the custom content container
const CustomContentContainer = styled(Box)({
  backgroundColor: theme.palette.secondary.main,
  padding: '1rem 8rem',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    padding: '0.5rem 1.5rem',
  },
});


// Styled component for the button wrappers container
const ButtonWrapperContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '1rem',
  paddingBottom: '4rem',
  flexDirection: 'row',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
});

const CustButtonWrapper = styled('div')(({ theme, color }) => ({
  marginTop: theme.spacing(2),
  '& .MuiIconButton-root': {
    backgroundColor: theme.palette[color].main,
  },
}));


const QnAPage = () => {
  const sessionData  = useSession();
  // console.log("User:", sessionData.data?.user);
  const [username, setUsername] = useState(null);

  // State to hold the user's answers
  const [answers, setAnswers] = useState(Array(defaultQuestionnaireData.length).fill(''));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const totalQuestions = defaultQuestionnaireData.length;

  // Function to handle selecting an answer
  const handleSelectAnswer = (questionIndex, answerIndex, checked, question) => {
    const newAnswers = [...answers];
    const selectedOptions = newAnswers[questionIndex];

    if (question.type === 'checkbox') {
      // Checkbox: update selected options array
      if (checked) {
        // Option is checked, add it to the selected options
        newAnswers[questionIndex] = [...selectedOptions, answerIndex];
      } else {
        // Option is unchecked, remove it from the selected options
        const updatedOptions = selectedOptions.filter((option) => option !== answerIndex);
        newAnswers[questionIndex] = updatedOptions;
      }
    } else {
      // Radio button: update selected option directly
      newAnswers[questionIndex] = answerIndex.toString();
    }

    setAnswers(newAnswers);

    // Check if all questions are answered
    const isAllQuestionsAnswered = newAnswers.every((answer) => answer !== '');
    setIsFormValid(isAllQuestionsAnswered);
  };

  // Function to go to the previous question
  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  // Function to go to the next question
  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // Function to handle submitting the answers
  const handleSubmit = async () => {
    try {
      const usersQuestions = defaultQuestionnaireData.map((question) => question.question);
      const answersWithRecommendations = defaultQuestionnaireData.map((question, index) => {
        if (question.options.length === 1) {
          return question.options[0];
        } else {
          return answers[index];
        }
      });

      const recommendations = answersWithRecommendations.map((answer, index) => {
        if (defaultQuestionnaireData[index].recommendation.length === 1 && answer == defaultQuestionnaireData[index].options.length - 1) {
          return "";
        }
        else if (defaultQuestionnaireData[index].recommendation.length === 1) {
          return defaultQuestionnaireData[index].recommendation[0];
        }
        else {
          return defaultQuestionnaireData[index].recommendation[answer];
        }
      });

      const data = {
        answers: {
          questions: usersQuestions,
          answers: answersWithRecommendations,
          recommendations: recommendations,
        },
      };

      // Send a POST request to save the data
      const response = await fetch(`/api/users/qna/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      if (response.ok) {
        // Data saved successfully, redirect to a success page or perform any other actions
        redirectToPage(`/users/qna/report/${username}`)
      } else {
        // Handle error case
        console.error('Error saving data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const currentQuestion = defaultQuestionnaireData[currentQuestionIndex];

  return (
    <ThemeProvider theme={theme}>
    <CustomRootContainer>
    <CustomContentContainer>
        <h1 style={{ textAlign: 'center' }}>Questionnaire</h1>
        <div style={{ padding: '0.2rem 1rem' }}>
          <h3>{currentQuestion.question}</h3>
          {currentQuestion.type === 'checkbox' ? (
            // Render checkbox options
            <FormControl component="fieldset">
              <FormGroup>
                {currentQuestion.options.map((option, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    control={
                      <Checkbox
                        checked={answers[currentQuestionIndex].includes(optionIndex)}
                        onChange={(event) =>
                          handleSelectAnswer(currentQuestionIndex, optionIndex, event.target.checked, currentQuestion)
                        }
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>
            </FormControl>
          ) : (
            // Render radio button options
            <FormControl component="fieldset">
              <RadioGroup
                value={answers[currentQuestionIndex]}
                onChange={(event) =>
                  handleSelectAnswer(currentQuestionIndex, event.target.value, false, currentQuestion)
                }
              >
                {currentQuestion.options.map((option, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={optionIndex.toString()}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </div>
        <ButtonWrapperContainer>
          {currentQuestionIndex > 0 && (
            <CustButtonWrapper color="primary">
              <IconButton onClick={goToPreviousQuestion}>
                <ArrowBackIcon />
              </IconButton>
            </CustButtonWrapper>
          )}
          {currentQuestionIndex < totalQuestions - 1 ? (
            <CustButtonWrapper color="primary">
              <IconButton onClick={goToNextQuestion}>
                <ArrowForwardIcon />
              </IconButton>
            </CustButtonWrapper>
          ) : (
            <ButtonWrapper color="tertiary">
              <Button variant="contained" onClick={handleSubmit} disabled={!isFormValid}>
                Submit Form
              </Button>
            </ButtonWrapper>
          )}
        </ButtonWrapperContainer>
      </CustomContentContainer>
    </CustomRootContainer>
    </ThemeProvider>
  );
};


export default QnAPage;


import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormGroup, FormControlLabel, Checkbox, Radio, RadioGroup, Button } from '@mui/material';
import { styled } from '@mui/system';

// Import the default questionnaire data array
import defaultQuestionnaireData from '../../../../models/api/questions';
import theme from '../../../styles/theme';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import { redirectToPage } from '../../../../utils/redirect';

// Styled component for the custom content container
const CustomContentContainer = styled(Box)({
    backgroundColor: theme.palette.secondary.main,
    padding: '1rem 8rem',
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 1.5rem',
    },
},
);

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

const QnAPage = () => {
    const router = useRouter();
    const { username } = router.query;

    // State to hold the user's answers
    const [answers, setAnswers] = useState(Array(defaultQuestionnaireData.length).fill(''));

    // Function to handle selecting an answer
    const handleSelectAnswer = (questionIndex, answerIndex, checked) => {
        const newAnswers = [...answers];
        const selectedOptions = answers[questionIndex];
      
        if (checked) {
          // Option is checked, add it to the selected options
          newAnswers[questionIndex] = [...selectedOptions, answerIndex];
        } else {
          // Option is unchecked, remove it from the selected options
          const updatedOptions = selectedOptions.filter((option) => option !== answerIndex);
          newAnswers[questionIndex] = updatedOptions;
        }
      
        setAnswers(newAnswers);
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
                console.log(answer)
                console.log(index)
                if (defaultQuestionnaireData[index].recommendation.length === 1 && answer == defaultQuestionnaireData[index].options.length -1 ) {
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

            console.log(data)
            // Send a POST request to save the data
            const response = await fetch(`/api/qna/${username}`, {
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

    return (
        <CustomContentContainer>
            <h1 style={{ textAlign: 'center' }}>Questionnaire</h1>
            {defaultQuestionnaireData.map((question, index) => (
                <div key={index} style={{ padding: '0.2rem 1rem' }}>
                    <h3>{question.question}</h3>
                    {question.type === 'checkbox' ? (
                        // Render checkbox options
                        <FormControl component="fieldset">
                            <FormGroup>
                                {question.options.map((option, optionIndex) => (
                                    <FormControlLabel
                                        key={optionIndex}
                                        control={
                                            <Checkbox
                                                checked={answers[index].includes(optionIndex)}
                                                onChange={(event) => handleSelectAnswer(index, optionIndex, event.target.checked)}

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
                                value={answers[index]}
                                onChange={(event) => handleSelectAnswer(index, event.target.value)}
                            >
                                {question.options.map((option, optionIndex) => (
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
            ))}
            <ButtonWrapperContainer>
                <ButtonWrapper color="primary">
                    <Button variant="contained" onClick={handleSubmit}>Reset</Button>
                </ButtonWrapper>
                <ButtonWrapper color="tertiary">
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </ButtonWrapper>
            </ButtonWrapperContainer>
        </CustomContentContainer>
    );
};

export default QnAPage;

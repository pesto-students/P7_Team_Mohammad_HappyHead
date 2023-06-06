
import React from 'react';
import { useRouter } from 'next/router';
import RootContainer from '../../../styles/RootContainerStyles';
import { Container, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { ThemeProvider, styled } from '@mui/system';
import theme from '../../../styles/theme';
import Title from '../../../styles/TitleStyles';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import Loader from '../../../styles/Loader';

// Styled component for customizing the root container
const CustRootContainer = styled(RootContainer)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    textAlign: 'left',
}))

// Styled component for customizing the title typography
const CustTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1.4rem',
}))

// Styled component for centering the button
const CenteredButtonWrapper = styled(ButtonWrapper)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
});


const ReportGenerator = () => {
    const router = useRouter();
    const { username } = router.query;
    const [userAnswers, setUserAnswers] = useState([])
    const [userRecommendations, setUserRecommendations] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data from the API
                const response = await fetch(`/api/users/qna/${username}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserAnswers(userData.answers.answers)
                    setUserRecommendations(userData.answers.recommendations);
                    setIsLoading(false);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [username]);

    const sentences = [
        // Sentence 1: Introduction to the report
        `Based on the information provided, we have identified several areas where improvements can be made to support better mental health and well-being. The following recommendations are intended to provide guidance and support in these areas, and to help you develop a plan for managing your mental health.`,

        // Sentence 2: Recommendations based on lifestyle responses
        `Here's our specific recommendations based on your responses concerning your lifestyle:`,

        // Sentence 3: Suggestion to start with a general therapist
        `If you're not sure which specialized therapist would be best for you, we suggest starting with a general therapist who can help you identify your specific needs and refer you to the appropriate specialist if necessary. Our platform has a wide range of qualified therapists who can help you explore your options and make the best decision for your mental health. You don't have to figure it out on your own, let us help you get started.`,

        // Sentence 4: Suggestion to explore tools for self-care and stress management
        `Along with connecting you with a therapist or mental health expert, we also suggest exploring the tools available on our platform related to grounding, being aware, and other techniques prescribed by WHO for people experiencing stress. These tools can help you practice self-care and manage your stress levels on your own. We encourage you to give them a try and see what works best for you.`,

        // Sentence 5: Disclaimer that recommendations are not a substitute for professional advice
        `Please note that these recommendations are not a substitute for professional advice, and we recommend consulting with a healthcare provider or mental health professional as needed.`,
    ];

    const handleGoBack = () => {
        redirectToPage(`/users/dashboard/${username}`);
    }

    if (isLoading) {
        return <Loader />;
    }
    return (
        <ThemeProvider theme={theme}>
            <CustRootContainer>
                <Container maxWidth="md" sx={{ padding: '1rem' }}>
                    <Title variant="h4" component="h1" align="center" sx={{ paddingBottom: '0.7rem' }} gutterBottom>
                        Report
                    </Title>
                    {/* Render the sentences */}
                    {sentences.map((sentence, index) => (
                        <React.Fragment key={index}>
                            {index === 0 && (
                                <React.Fragment>
                                    <Typography paragraph>{sentence}</Typography>
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    <React.Fragment>
                                        <Typography paragraph>{sentence}</Typography>
                                    </React.Fragment>
                                    <CustTitle gutterBottom>
                                        Sleep:
                                    </CustTitle>
                                    {/* Render the user's answers and recommendations */}
                                    {userRecommendations.map((recommendation, index) => (
                                        <React.Fragment key={index}>
                                            {index === 8 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        Physical Activity:
                                    </CustTitle>
                                    {userRecommendations.map((recommendation, index) => (
                                        <React.Fragment key={index}>
                                            {index === 9 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        Screen Time:
                                    </CustTitle>
                                    {userRecommendations.map((recommendation, index) => (
                                        <React.Fragment key={index}>
                                            {index === 10 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        Food Habits:
                                    </CustTitle>
                                    {userRecommendations.map((recommendation, index) => (
                                        <React.Fragment key={index}>
                                            {index === 11 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                            {index === 12 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                            {index === 13 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        Tobacco:
                                    </CustTitle>
                                    {userRecommendations.map((recommendation, index) => (
                                        <React.Fragment key={index}>
                                            {index === 14 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        Alcohol Consumption:
                                    </CustTitle>
                                    {userRecommendations.map((recommendation, index) => (
                                        <React.Fragment key={index}>
                                            {index === 15 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        Social Life:
                                    </CustTitle>
                                    {userRecommendations.map((recommendation, index) => (
                                        <React.Fragment key={index}>
                                            {index === 17 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        Leisure & Relaxation:
                                    </CustTitle>
                                    {userRecommendations.map((recommendation, index) => (
                                        <React.Fragment key={index}>
                                            {index === 16 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                            {index === 18 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        De-stressing:
                                    </CustTitle>
                                    {userRecommendations.map((recommendation, index) => (
                                        <React.Fragment key={index}>
                                            {index === 19 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                            {index === 20 && recommendation && (
                                                <React.Fragment>
                                                    <Typography paragraph>{recommendation}</Typography>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>

                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    {userRecommendations.slice(21, 24).some(recommendation => recommendation) && (
                                        <React.Fragment>
                                            <CustTitle gutterBottom>
                                                Current Medical Condition:
                                            </CustTitle>
                                            {userRecommendations.slice(21, 24).map((recommendation, index) => (
                                                <React.Fragment key={index}>
                                                    {recommendation && (
                                                        <React.Fragment>
                                                            <Typography paragraph>{recommendation}</Typography>
                                                        </React.Fragment>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                            {index === 1 && (
                                <React.Fragment>
                                    {userRecommendations.slice(0, 5).some(recommendation => recommendation) && (
                                        <React.Fragment>
                                            <CustTitle gutterBottom>
                                                Recommendation for Expert Connect:
                                            </CustTitle>
                                            {userRecommendations.slice(0, 5).map((recommendation, index) => (
                                                <React.Fragment key={index}>
                                                    {recommendation && (
                                                        <React.Fragment>
                                                            <Typography paragraph>{recommendation}</Typography>
                                                        </React.Fragment>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                            {index === 2 && (
                                <React.Fragment>
                                    <Typography paragraph>{sentence}</Typography>
                                </React.Fragment>

                            )}
                            {index === 3 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        Practice tools:
                                    </CustTitle>
                                    <Typography paragraph>{sentence}</Typography>
                                </React.Fragment>

                            )}

                            {index === 4 && (
                                <React.Fragment>
                                    <CustTitle gutterBottom>
                                        Disclaimer:
                                    </CustTitle>
                                    <Typography paragraph>{sentence}</Typography>
                                </React.Fragment>

                            )}
                        </React.Fragment>
                    ))}
                    <CenteredButtonWrapper color="tertiary" >
                        <Button variant="contained" onClick={handleGoBack}>
                            Go Back
                        </Button>
                    </CenteredButtonWrapper>
                </Container>
            </CustRootContainer>
        </ThemeProvider>


    );
};

export default ReportGenerator;

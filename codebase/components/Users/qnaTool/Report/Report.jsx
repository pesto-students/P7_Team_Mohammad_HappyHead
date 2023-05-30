
import React from 'react';
import { useRouter } from 'next/router';
import RootContainer from '../../../styles/RootContainerStyles';
import { Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { ThemeProvider, styled } from '@mui/system';
import Title from '../../../styles/TitleStyles';
import SubText from '../../../styles/SubTextStyles';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import theme from '../../../styles/theme';


const CustRootContainer = styled(RootContainer)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    textAlign: 'left',
}))

const CustTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1.4rem',
}))

const ReportGenerator = () => {
    const router = useRouter();
    const { username } = router.query;
    const [userAnswers, setUserAnswers] = useState([])
    const [userRecommendations, setUserRecommendations] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/users/qna/${username}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserAnswers(userData.answers.answers)
                    setUserRecommendations(userData.answers.recommendations);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [username]);

    const sentences = [
        `Based on the information provided, we have identified several areas where improvements can be made to support better mental health and well-being. The following recommendations are intended to provide guidance and support in these areas, and to help you develop a plan for managing your mental health.`,
        `Here's our specific recommendations based on your responses concerning your liefestyle:`,
        `If you're not sure which specialized therapist would be best for you, we suggest starting with a general therapist who can help you identify your specific needs and refer you to the appropriate specialist if necessary. Our platform has a wide range of qualified therapists who can help you explore your options and make the best decision for your mental health. You don't have to figure it out on your own, let us help you get started.`,
        `Along with connecting you with a therapist or mental health expert, we also suggest exploring the tools available on our platform related to grounding, being aware, and other techniques prescribed by WHO for people experiencing stress. These tools can help you practice self-care and manage your stress levels on your own. We encourage you to give them a try and see what works best for you.`,
        `Disclaimer: Please note that these recommendations are not a substitute for professional advice, and we recommend consulting with a healthcare provider or mental health professional as needed.`,
    ];

    return (
        <CustRootContainer>
            <Container maxWidth="md">
                <Title variant="h4" component="h1" align="center" gutterBottom>
                    Report
                </Title>
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
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Physical Activity:
                                </Typography>
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
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Screen Time:
                                </Typography>
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
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Food Habits:
                                </Typography>
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
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Tobacco:
                                </Typography>
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
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Alcohol Consumption:
                                </Typography>
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
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Social Life:
                                </Typography>
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
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Leisure & Relaxation:
                                </Typography>
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
                                <Typography variant="h6" component="h2" gutterBottom>
                                    De-stressing:
                                </Typography>
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
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            Current Medical Condition:
                                        </Typography>
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
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            Recommendation for Expert Connect:
                                        </Typography>
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
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Practice tools:
                                </Typography>
                                <Typography paragraph>{sentence}</Typography>
                            </React.Fragment>

                        )}

                        {index === 4 && (
                            <React.Fragment>
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Disclaimer:
                                </Typography>
                                <Typography paragraph>{sentence}</Typography>
                            </React.Fragment>

                        )}
                    </React.Fragment>
                ))}
            </Container>
        </CustRootContainer>

    );
};

export default ReportGenerator;


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
import { redirectToPage } from '../../../../utils/redirect';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';


// Styled component for customizing the root container
const CustRootContainer = styled(RootContainer)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    textAlign: 'left',
    padding: '1rem 2rem 2rem 2rem',
}))

// Styled component for the main content container
const CustomSectionContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '8px',
    padding: '2rem 3rem',
    [theme.breakpoints.down('sm')]: {
        padding: '2rem 1.5rem',
    },
    [theme.breakpoints.up('sm')]: {
        padding: '2rem 4rem',
    },
    textAlign: 'center',
}));

// Styled component for customizing the title typography
const CustTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1.4rem',
    textAlign: 'center',
}))

// Styled component for centering the button
const CenteredButtonWrapper = styled(ButtonWrapper)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
});

const CustomDesc = styled(Typography)(() => ({
    marginTop: '0.5rem',
}));

// Styled component for the IconContainer with styled icons
const StyledImg = styled('img')(() => ({
    width: '8rem',
    height: '8rem',
    margin: '0 auto',
}));

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

    const generatePDF = () => {
        const doc = new jsPDF();
      
        // Get the HTML element containing the content to be converted
        const element = document.getElementById('pdf-content-wrapper');
      
        // Create a canvas element to capture the content as an image
        const canvas = document.createElement('canvas');
      
        // Set the canvas size to match the content
        const contentWrapper = element.getBoundingClientRect();
        canvas.width = contentWrapper.width;
        canvas.height = contentWrapper.height;
      
        // Convert the content to an image using html2canvas library
        html2canvas(element).then((canvas) => {
          const contentImg = canvas.toDataURL('image/png');
      
          // Calculate the aspect ratio of the image
          const aspectRatio = canvas.width / canvas.height;
      
          // Set a fixed width for the PDF page
          const pageWidth = 250; // Replace with your desired width
      
          // Calculate the corresponding height based on the aspect ratio
          const pageHeight = 300;
      
          // Add the image to the PDF document
          doc.addImage(contentImg, 'PNG', 0, 0, pageWidth, pageHeight);
      
          // Save the PDF
          doc.save('document.pdf');
        });
      };
      
  
    if (isLoading) {
        return <Loader />;
    }
    return (
        <ThemeProvider theme={theme}>
            <div id="pdf-content-wrapper">
                <CustRootContainer id="pdf-content">
                    <Title variant="h4" component="h1" align="center" sx={{ paddingBottom: '0.7rem' }} gutterBottom>
                        Your Personalised Report
                    </Title>
                    <CustomSectionContainer>
                        {/* Wrapper for the content */}
                        {/* Render the sentences */}
                        {sentences.map((sentence, index) => (
                            <React.Fragment key={index}>
                                {index === 0 && (
                                    <CustomDesc variant="h6" component="h2" paragraph>{sentence}</CustomDesc>

                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <React.Fragment>
                                            <CustomDesc variant="h6" component="h2" paragraph>{sentence}</CustomDesc>
                                        </React.Fragment>
                                        <StyledImg src="/images/report/sleep.png" alt="sleep" />
                                        <CustTitle gutterBottom>
                                            Sleep:
                                        </CustTitle>
                                        {/* Render the user's answers and recommendations */}
                                        {userRecommendations.map((recommendation, index) => (
                                            <React.Fragment key={index}>
                                                {index === 8 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <StyledImg src="/images/report/yoga.png" alt="physical-activity" />
                                        <CustTitle gutterBottom>
                                            Physical Activity:
                                        </CustTitle>
                                        {userRecommendations.map((recommendation, index) => (
                                            <React.Fragment key={index}>
                                                {index === 9 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <StyledImg src="/images/report/screen.png" alt="screen-time" />
                                        <CustTitle gutterBottom>
                                            Screen Time:
                                        </CustTitle>
                                        {userRecommendations.map((recommendation, index) => (
                                            <React.Fragment key={index}>
                                                {index === 10 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <StyledImg src="/images/report/food.png" alt="food-habits" />
                                        <CustTitle gutterBottom>
                                            Food Habits:
                                        </CustTitle>
                                        {userRecommendations.map((recommendation, index) => (
                                            <React.Fragment key={index}>
                                                {index === 11 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                                {index === 12 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                                {index === 13 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <StyledImg src="/images/report/tobacco.png" alt="tobacco" />
                                        <CustTitle gutterBottom>
                                            Tobacco:
                                        </CustTitle>
                                        {userRecommendations.map((recommendation, index) => (
                                            <React.Fragment key={index}>
                                                {index === 14 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <StyledImg src="/images/report/beer.png" alt="alcohol" />
                                        <CustTitle gutterBottom>
                                            Alcohol Consumption:
                                        </CustTitle>
                                        {userRecommendations.map((recommendation, index) => (
                                            <React.Fragment key={index}>
                                                {index === 15 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <StyledImg src="/images/report/friends.png" alt="friends" />
                                        <CustTitle gutterBottom>
                                            Social Life:
                                        </CustTitle>
                                        {userRecommendations.map((recommendation, index) => (
                                            <React.Fragment key={index}>
                                                {index === 17 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <StyledImg src="/images/report/leisure.png" alt="leisure" />
                                        <CustTitle gutterBottom>
                                            Leisure & Relaxation:
                                        </CustTitle>
                                        {userRecommendations.map((recommendation, index) => (
                                            <React.Fragment key={index}>
                                                {index === 16 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                                {index === 18 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <StyledImg src="/images/report/destress.png" alt="destress" />
                                        <CustTitle gutterBottom>
                                            De-stressing:
                                        </CustTitle>
                                        {userRecommendations.map((recommendation, index) => (
                                            <React.Fragment key={index}>
                                                {index === 19 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
                                                    </React.Fragment>
                                                )}
                                                {index === 20 && recommendation && (
                                                    <React.Fragment>
                                                        <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
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
                                                <StyledImg src="/images/report/medicine.png" alt="medical-condition" />
                                                <CustTitle gutterBottom>
                                                    Current Medical Condition:
                                                </CustTitle>
                                                {userRecommendations.slice(21, 24).map((recommendation, index) => (
                                                    <React.Fragment key={index}>
                                                        {recommendation && (
                                                            <React.Fragment>
                                                                <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
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
                                                <StyledImg src="/images/report/therapist.png" alt="therapist" />
                                                <CustTitle gutterBottom>
                                                    Recommendation for Expert Connect:
                                                </CustTitle>
                                                {userRecommendations.slice(0, 5).map((recommendation, index) => (
                                                    <React.Fragment key={index}>
                                                        {recommendation && (
                                                            <React.Fragment>
                                                                <CustomDesc variant="h6" component="h2" paragraph>{recommendation}</CustomDesc>
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
                                        <CustomDesc variant="h6" component="h2" paragraph>{sentence}</CustomDesc>
                                    </React.Fragment>

                                )}
                                {index === 3 && (
                                    <React.Fragment>
                                        <StyledImg src="/images/report/audio.png" alt="audiotools" />
                                        <CustTitle gutterBottom>
                                            Practice tools:
                                        </CustTitle>
                                        <CustomDesc variant="h6" component="h2" paragraph>{sentence}</CustomDesc>
                                    </React.Fragment>

                                )}

                                {index === 4 && (
                                    <React.Fragment>
                                        <CustTitle gutterBottom>
                                            Disclaimer:
                                        </CustTitle>
                                        <CustomDesc variant="h6" component="h2" paragraph>{sentence}</CustomDesc>
                                    </React.Fragment>

                                )}
                            </React.Fragment>
                        ))}
                        <CenteredButtonWrapper color="primary" >
                            <Button variant="contained" onClick={handleGoBack}>
                                Go Back
                            </Button>
                        </CenteredButtonWrapper>
                    </CustomSectionContainer>
                </CustRootContainer>
            </div>
            <button onClick={generatePDF}>Download PDF</button>
        </ThemeProvider>
    );
};

export default ReportGenerator;

import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import RootContainer from '../../../styles/RootContainerStyles';
import ContentContainer from '../../../styles/ContentContainerStyles';
import SubText from '../../../styles/SubTextStyles';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import IconContainer from '../../../styles/IconContainerStyles'
import theme from '../../../styles/theme';
import { useRouter } from 'next/router';
import { redirectToPage } from '../../../../utils/redirect';
import Loader from '../../../styles/Loader';

// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem 2rem 2rem',
}));

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
  backgroundColor: theme.palette.secondary.main,
  padding: '2rem 0',
  borderRadius: '8px',
});

// Styled component for the centered subtext
const CenteredSubText = styled(SubText)({
  textAlign: 'center',
  padding: '0 1rem',
});

const Heading = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.h4.fontSize,
      padding: '0 0.5rem',
  },
}));

// Styled component for the button wrappers container
const ButtonWrapperContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '1rem',
  paddingBottom: '3rem',
  flexDirection: 'row',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
});

// Styled component for the IconContainer with styled icons
const StyledIconContainer = styled(IconContainer)(() => ({
  '& img': {
      width: '8rem',
      height: '8rem',
      marging: '0',
  },
}));

const info = {
  text1: `This feature on HappyHead is designed to provide users with tailored recommendations and actionable steps to improve their mental health and well-being.`,
  text2: `By answering a series of simple questions about their current state of mind, lifestyle, and perceived problems, the platform generates a personalized report that identifies areas for improvement and suggests specific actions the user can take to feel healthier and happier again.`,
  text3: `This feature aims to empower individuals with personalized guidance and support on their mental health journey.`,
};

const QnAMain = () => {
  const router = useRouter();
  const { username } = router.query;
  const [answersExist, setAnswersExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/practicetools/${username}`);
        if (response.ok) {
          const userData = await response.json();
          const answers = userData.answers;
          setAnswersExist(answers && answers.recommendations.length == 25);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch user data');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleStart = () => {
    redirectToPage(`/users/qna/form/${username}`);
  };

  const handleViewReport = () => {
    redirectToPage(`/users/qna/report/${username}`);
  };
  if (isLoading) {
    return <Loader />;
}
  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
        <StyledIconContainer>
                        <img src="/images/tools/clipboard.png" alt="report" />
                    </StyledIconContainer>
                    <Heading variant="h3">Personalised Recommendations</Heading>
          
          {/* Centered Sub text */}
          {Object.values(info).map((text, index) => (
                        <CenteredSubText variant="h6" key={index}>
                            {text}
                        </CenteredSubText>
                    ))}

          <ButtonWrapperContainer>
            <ButtonWrapper color="tertiary">
              <Button variant="contained" onClick={handleViewReport} disabled={!answersExist}>
                View Report
              </Button>
            </ButtonWrapper>
            <ButtonWrapper color="primary">
              <Button variant="contained" onClick={handleStart}>
                Start
              </Button>
            </ButtonWrapper>
          </ButtonWrapperContainer>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
};

export default QnAMain;

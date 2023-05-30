import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import RootContainer from '../../../styles/RootContainerStyles';
import ContentContainer from '../../../styles/ContentContainerStyles';
import SubText from '../../../styles/SubTextStyles';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
import theme from '../../../styles/theme';
import { useRouter } from 'next/router';
import { redirectToPage } from '../../../../utils/redirect';

// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
  backgroundColor: theme.palette.secondary.main,
  padding: '2rem 0',
});

// Styled component for the centered subtext
const CenteredSubText = styled(SubText)({
  textAlign: 'center',
  padding: '0 1rem',
});

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

const info = {
  text: `We are constantly looking for ways to continue to build a more inclusive product and ensure we’re operating according to our mission and values. Accessibility will remain a top priority as HappyHead's offerings evolve as we want to empower all members with tools to improve their health and happiness.`,
};

const QnAMain = () => {
  const router = useRouter();
  const { username } = router.query;

  const [answersExist, setAnswersExist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/practicetools/${username}`);
        if (response.ok) {
          const userData = await response.json();
          const answers = userData.answers;
          setAnswersExist(answers && answers.recommendations.length == 25);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
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

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <h1>Personalised Mental Health Recommendations </h1>
          {/* Centered Sub text */}
          <CenteredSubText variant="h6">{info.text}</CenteredSubText>
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

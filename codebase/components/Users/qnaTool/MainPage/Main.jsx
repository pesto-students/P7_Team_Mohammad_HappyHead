import { Button, Container } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import RootContainer from '../../../styles/RootContainerStyles';
import ContentContainer from '../../../styles/ContentContainerStyles';
import SubText from '../../../styles/SubTextStyles';
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
});

const info = {
  text: `We are constantly looking for ways to continue to build a more inclusive product and ensure we’re operating according to our mission and values. Accessibility will remain a top priority as HappyHead's offerings evolve as we want to empower all members with tools to improve their health and happiness.`,
};

const QnAMain = () => {
  const router = useRouter();
  const { username } = router.query

  const handleStart = () => {
    redirectToPage(`/pages/users/qna/form/${username}`)
  };

  const handleGoBack = () => {
    redirectToPage(`/pages/users/dashboard/${username}`)
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <h1>Personalised Mental Health Recommendations </h1>
          {/* Centered Sub text */}
          <CenteredSubText variant="h6">
            {info.text}
          </CenteredSubText>
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start
          </Button>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Go Back
          </Button>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
};

export default QnAMain;

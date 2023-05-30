import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import RootContainer from '../../styles/RootContainerStyles';
import ContentContainer from '../../styles/ContentContainerStyles';
import SubText from '../../styles/SubTextStyles';
import ButtonWrapper from '../../styles/ButtonWrapperStyles';
import theme from '../../styles/theme';
import { useRouter } from 'next/router';
import { redirectToPage } from '../../../utils/redirect';

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
    text: `This feature on HappyHead is designed to provide users with tailored recommendations and actionable steps to improve their mental health and well-being. By answering a series of simple questions about their current state of mind, lifestyle, and perceived problems, the platform generates a personalized report that identifies areas for improvement and suggests specific actions the user can take to feel healthier and happier again. This feature aims to empower individuals with personalized guidance and support on their mental health journey.`,
};

const QnAMain = () => {

    const handleStart = () => {
        window.alert('Login to access');
        redirectToPage('/loginUser'); // Redirect to the login page if path doesnt exist
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
                            <Button variant="contained" disabled={true}>
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

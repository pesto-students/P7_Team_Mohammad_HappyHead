import { Box, Button, Typography } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import RootContainer from '../../styles/RootContainerStyles';
import ContentContainer from '../../styles/ContentContainerStyles';
import SubText from '../../styles/SubTextStyles';
import ButtonWrapper from '../../styles/ButtonWrapperStyles';
import theme from '../../styles/theme';
import Image from 'next/image'
import { redirectToPage } from '../../../utils/redirect';

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

const info = {
    text1: `This feature on HappyHead is designed to provide users with tailored recommendations and actionable steps to improve their mental health and well-being.`,
    text2: `By answering a series of simple questions about their current state of mind, lifestyle, and perceived problems, the platform generates a personalized report that identifies areas for improvement and suggests specific actions the user can take to feel healthier and happier again.`,
    text3: `This feature aims to empower individuals with personalized guidance and support on their mental health journey.`,
};

const QnAMain = () => {
    const handleStart = () => {
        window.alert('Login to access');
        redirectToPage('/signup'); // Redirect to the login page if path doesnt exist
    };

    return (
        <ThemeProvider theme={theme}>
            <CustomRootContainer>
                <CustomContentContainer>
                    <Image
                        src="/images/tools/clipboard.png"
                        alt="report"
                        width={170}
                        height={170}
                    />
                    <Heading variant="h3" sx={{ padding: "1rem 0.5rem"}}>Personalised Recommendations</Heading>

                    {/* Centered Sub text */}
                    {Object.values(info).map((text, index) => (
                        <CenteredSubText variant="h6" key={index}>
                            {text}
                        </CenteredSubText>
                    ))}

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

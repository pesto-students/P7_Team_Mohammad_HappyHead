import { useState, useEffect } from 'react';
import { ThemeProvider, styled } from '@mui/system';
import ContentContainer from '../../styles/ContentContainerStyles';
import SubText from '../../styles/SubTextStyles';
import RootContainer from '../../styles/RootContainerStyles';
import Title from '../../styles/TitleStyles'
import theme from '../../styles/theme';
import Image from 'next/image'
import Loader from '../../styles/Loader'
import Section1 from './Experts'
import Section2 from './Booking'

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
    padding: '1rem 2rem 0rem 2rem',
}));

// Styled component for the custom content container
const CustomHeaderContainer = styled(ContentContainer)({
    backgroundColor: theme.palette.secondary.main,
    padding: '2rem 1rem 4rem',
    textAlign: 'center',
    borderRadius: '8px',
    [theme.breakpoints.up('md')]: {
        padding: '4rem',
    },
    marginBottom: '2rem'
});

// Styled component for the centered subtext
const CenteredSubText = styled(SubText)({
    textAlign: 'center',
    color: theme.palette.text.primary,
});

export default function Connect() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating a delay of 2 seconds for loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {loading ? (
                <Loader />
            ) : (
                <CustomRootContainer>
                    {/* Page heading */}
                    <CustomHeaderContainer>
                        <Image
                            src="/images/connectwexperts/expertsconnect.png"
                            alt="connect"
                            width={170}
                            height={170}
                        />
                        <Title variant="h3" sx={{ paddingTop: "2rem" }}>Connect With Experts</Title>
                        <CenteredSubText variant="h5">
                            HappyHead provides users with a convenient and reliable way to connect and seek guidance from qualified mental health professionals. We understand the importance of mental well-being and aim to make professional support easily accessible to those in need.
                        </CenteredSubText>
                    </CustomHeaderContainer>
                </CustomRootContainer>
            )}
            {/* Page sections */}
            <Section1 />
            <Section2 />
        </ThemeProvider>
    );
}

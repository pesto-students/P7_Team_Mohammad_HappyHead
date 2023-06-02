import { ThemeProvider, styled } from '@mui/system';
import ContentContainer from '../../styles/ContentContainerStyles';
import SubText from '../../styles/SubTextStyles';
import Title from '../../styles/TitleStyles'
import theme from '../../styles/theme';
import Section1 from './Experts'
import Section2 from './Booking'

// Styled component for the custom content container
const CustomHeaderContainer = styled(ContentContainer)({
    backgroundColor: theme.palette.secondary.main,
    padding: '2rem 1rem 4rem',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        padding: '4rem',
    },
});

// Styled component for the centered subtext
const CenteredSubText = styled(SubText)({
    textAlign: 'center',
    color: theme.palette.text.primary,
});


export default function Connect() {
    return (
        <ThemeProvider theme={theme}>

            {/* Page heading */}
            <CustomHeaderContainer>
                <Title variant="h3">Connect With Experts</Title>             
                <CenteredSubText variant="h5">
                    HappyHead provides users with a convenient and reliable way to connect and seek guidance from qualified mental health professionals. We understand the importance of mental well-being and aim to make professional support easily accessible to those in need.
                </CenteredSubText>
            </CustomHeaderContainer>

             {/* Page sections */}
            <Section1 />
            <Section2 />


        </ThemeProvider>
    );
}

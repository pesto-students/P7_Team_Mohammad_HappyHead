import { ThemeProvider, styled } from '@mui/system'
import RootContainer from '../../styles/RootContainerStyles'
import ContentContainer from '../../styles/ContentContainerStyles'
import SubText from '../../styles/SubTextStyles'
import Image from 'next/image'
import theme from '../../styles/theme'

// Custom styled components for the root container, content container, and dialog
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
});

export default function Resources() {

    return (
        <ThemeProvider theme={theme}>
            <CustomRootContainer>
                <CustomContentContainer>
                    <Image
                        src="/images/contact/resources.png"
                        alt="resources"
                        width={200}
                        height={200}
                    />
                    <h1>Mental health resources</h1>
                    {/* Centered Sub text */}
                    <CenteredSubText variant="h6">
                        Looking for more help beyond meditation and mindfulness? These trusted mental health resources from India can provide you with extra support when you need it. Explore them below, and feel free to share this page with anyone you care about.
                    </CenteredSubText>
                    <CenteredSubText variant="h6">
                        Vandrevala Foundation Helpline: 1-860-2662-345 / 91-22-2570-6666
                    </CenteredSubText>
                    <CenteredSubText variant="h6">
                        Snehi Helpline: +91-22-2772-6773 / +91-22-2772-6774
                    </CenteredSubText>
                    <CenteredSubText variant="h6">
                        iCall Helpline: 022-2556-3291 / 022-2556-3292
                    </CenteredSubText>
                    <CenteredSubText variant="h6">
                        Sumaitri Helpline: 011-2338-9090
                    </CenteredSubText>

                </CustomContentContainer>
            </CustomRootContainer>
        </ThemeProvider>
    )
}

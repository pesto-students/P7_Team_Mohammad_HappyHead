import { Button, Container } from '@mui/material'
import { ThemeProvider, styled } from '@mui/system'
import RootContainer from '../../styles/RootContainerStyles'
import ContentContainer from '../../styles/ContentContainerStyles'
import ButtonWrapper from '../../styles/ButtonWrapperStyles'
import SubText from '../../styles/SubTextStyles'
import theme from '../../styles/theme'

// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}))

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
    backgroundColor: theme.palette.secondary.main,
    padding: '2rem 0',
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

import { styled } from '@mui/system'
import { ThemeProvider } from '@mui/system'
import { Grid } from '@mui/material'

import theme from '../styles/theme'
import Title from '../styles/TitleStyles'
import SubText from '../styles/SubTextStyles'
import RootContainer from '../styles/RootContainerStyles'
import IconContainer from '../styles/IconContainerStyles'
import ColumnContainer from '../styles/ColumnContainerStyle'
import SectionContainer from '../styles/SectionsContainer'

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '2rem',
}));

// Styled component for the main content container
const CustomSectionContainer = styled(SectionContainer)(({ theme }) => ({
  backgroundColor: theme.palette.tertiary.main,
}));

// Styled component for the IconContainer with styled icons
const StyledIconContainer = styled(IconContainer)(() => ({
  '& img': {
    width: '10rem',
    height: '10rem',
  },
}));

const CustomTitle = styled(Title)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(4),
}));

const WhoWhatWe = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Root container */}
      <CustomRootContainer>
        {/* Main content container */}
        <CustomSectionContainer>
        <CustomTitle variant="h3">The Aim</CustomTitle>
          <Grid container spacing={2}>
            {/* First column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* StyledIconContainer for Who */}
                <StyledIconContainer>
                <img src="/images/aboutpage/fistbump.png" alt="Who" />
                </StyledIconContainer>
                <Title variant="h5">Who we are</Title>
                <SubText variant="body1">
                  Think of HappyHead as your mind’s best friend. We’re here for you whenever you need us, wherever you are,
                  helping you get through tough times and find joy in every day.
                </SubText>
              </ColumnContainer>
            </Grid>

            {/* Second column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* StyledIconContainer for What */}
                <StyledIconContainer>
                <img src="/images/aboutpage/meditation.png" alt="What" />
                </StyledIconContainer>
                <Title variant="h5">What we do</Title>
                <SubText variant="body1">
                  Through science-backed meditation and mindfulness tools, HappyHead helps you create life-changing habits
                  to support your mental health and find a healthier, happier you.
                </SubText>
              </ColumnContainer>
            </Grid>

            {/* Third column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* StyledIconContainer for Why */}
                <StyledIconContainer>
                <img src="/images/aboutpage/relax.png" alt="Why" />
                </StyledIconContainer>
                <Title variant="h5">Why we do it</Title>
                <SubText variant="body1">
                  HappyHead is proven to reduce stress by 14% in just 10 days. It can also help you relax your mind in minutes,
                  improve focus, and get the best sleep ever.
                </SubText>
              </ColumnContainer>
            </Grid>
          </Grid>
        </CustomSectionContainer>
      </CustomRootContainer>
    </ThemeProvider>
  )
}

export default WhoWhatWe

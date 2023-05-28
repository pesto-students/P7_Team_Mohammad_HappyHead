import { styled } from '@mui/system'
import { ThemeProvider } from '@mui/system'
import { Grid } from '@mui/material'

import theme from '../styles/theme'
import Title from '../styles/TitleStyles'
import SubText from '../styles/SubTextStyles'
import RootContainer from '../styles/RootContainerStyles'
import ContentContainer from '../styles/ContentContainerStyles'
import IconContainer from '../styles/IconContainerStyles'
import ColumnContainer from '../styles/ColumnContainerStyle'

import Who from '@mui/icons-material/SupervisedUserCircleOutlined'
import What from '@mui/icons-material/RecordVoiceOverOutlined'
import Why from '@mui/icons-material/SentimentVerySatisfiedOutlined'

// Styled component for the root container
const CustomRoot = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.tertiary.main,
}));

// Styled component for the main content container
const CustomAboutContainer = styled(ContentContainer)(({ theme }) => ({
  maxWidth: 'none', // Exclude the maxWidth property
  backgroundColor: theme.palette.tertiary.main,
  margin: theme.spacing(2),
}));

// Styled component for the IconContainer with styled icons
const StyledIconContainer = styled(IconContainer)(({ theme }) => ({
  '& svg': {
    fontSize: '3rem',
    color: theme.palette.primary.main,
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
      <CustomRoot>
        {/* Main content container */}
        <CustomAboutContainer>
        <CustomTitle variant="h3">The Aim</CustomTitle>
          <Grid container spacing={2}>
            {/* First column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* StyledIconContainer for Who */}
                <StyledIconContainer>
                  <Who />
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
                  <What />
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
                  <Why />
                </StyledIconContainer>
                <Title variant="h5">Why we do it</Title>
                <SubText variant="body1">
                  HappyHead is proven to reduce stress by 14% in just 10 days. It can also help you relax your mind in minutes,
                  improve focus, and get the best sleep ever.
                </SubText>
              </ColumnContainer>
            </Grid>
          </Grid>
        </CustomAboutContainer>
      </CustomRoot>
    </ThemeProvider>
  )
}

export default WhoWhatWe

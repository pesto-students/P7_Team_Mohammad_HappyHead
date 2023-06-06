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

// Styled component for the root container
const CustomRoot = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

// Styled component for the main content container
const CustomAboutContainer = styled(ContentContainer)(({ theme }) => ({
  maxWidth: 'none', // Exclude the maxWidth property
  backgroundColor: theme.palette.tertiary.main,
  margin: theme.spacing(2),
  borderRadius:'8px',
  padding: '3rem 0',
}));

// Styled component for the IconContainer with styled icons
const StyledIconContainer = styled(IconContainer)(() => ({
  '& img': {
    width: '10rem',
    height: '10rem',
  },
}));

const Tile1 = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Root container */}
      <CustomRoot>
        {/* Main content container */}
        <CustomAboutContainer>
          <Grid container spacing={2}>
            {/* First column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* StyledIconContainer for Joy */}
                <StyledIconContainer>
                  <img src="/images/homepage/calm.png" alt="Joy" />
                </StyledIconContainer>
                <SubText variant="body1">
                  Catch your breath, relax your mind, and feel 14% less stressed in just 10 days.
                </SubText>
              </ColumnContainer>
            </Grid>

            {/* Second column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* StyledIconContainer for Sleep */}
                <StyledIconContainer>
                  <img src="/images/homepage/sleep.png" alt="Sleep" />
                </StyledIconContainer>
                <SubText variant="body1">
                  Put your mind to bed, wake up refreshed, and make good days your new normal.
                </SubText>
              </ColumnContainer>
            </Grid>

            {/* Third column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* StyledIconContainer for Happiness */}
                <StyledIconContainer>
                  <img src="/images/homepage/happiness.png" alt="Happiness" />
                </StyledIconContainer>
                <SubText variant="body1">
                  Do it for yourself, and everyone you love. It only takes a few minutes to find some headspace.
                </SubText>
              </ColumnContainer>
            </Grid>
          </Grid>
        </CustomAboutContainer>
      </CustomRoot>
    </ThemeProvider>
  )
}

export default Tile1

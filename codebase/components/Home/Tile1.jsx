import { styled } from '@mui/system'
import { ThemeProvider } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import theme from '../styles/theme'
import RootContainer from '../styles/RootContainerStyles'
import ContentContainer from '../styles/ContentContainerStyles'
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
  borderRadius: '8px',
  padding: '3rem 0',
}));

const CustomDesc = styled(Typography)(({ theme }) => ({
  marginTop: '0.5rem',
  padding: '1rem 3rem',
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
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                <Image
                  src="/images/homepage/calm.png"
                  alt="joy"
                  width={170}
                  height={170}
                />
                <CustomDesc variant="h6" component="h2">
                  Catch your breath, relax your mind, and feel 14% less stressed in just 10 days.
                </CustomDesc>
              </ColumnContainer>
            </Grid>

            {/* Second column */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                <Image
                  src="/images/homepage/sleep.png"
                  alt="sleep"
                  width={170}
                  height={170}
                />
                <CustomDesc variant="h6" component="h2">
                  Put your mind to bed, wake up refreshed, and make good days your new normal.
                </CustomDesc>
              </ColumnContainer>
            </Grid>

            {/* Third column */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                <Image
                  src="/images/homepage/happiness.png"
                  alt="happiness"
                  width={170}
                  height={170}
                />
                <CustomDesc variant="h6" component="h2">
                  Do it for yourself, and everyone you love. It only takes a few minutes to find some headspace.
                </CustomDesc>
              </ColumnContainer>
            </Grid>
          </Grid>
        </CustomAboutContainer>
      </CustomRoot>
    </ThemeProvider>
  )
}

export default Tile1

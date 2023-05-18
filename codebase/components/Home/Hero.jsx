import React from 'react';
import { Button, Typography, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import theme from '../styles/theme'; // Import the theme from the theme.js file
import heroStyles from '../styles/heroStyles'; // Import the component-specific styles

const HeroComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <div sx={heroStyles.hero}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h2" sx={heroStyles.heroText}>
                Your Guide to Mindfulness
              </Typography>
              <Typography variant="h5" sx={heroStyles.subText}>
                Find your calm, wherever you go
              </Typography>
              <div sx={heroStyles.buttons}>
                <Button variant="contained" color="primary">
                  Try as an expert
                </Button>
                <Button variant="outlined" color="primary">
                  Explore Tools
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div sx={heroStyles.image}>
                <Image
                  src="/path/to/your/image.jpg" // Replace with the path to your actual image
                  alt="Hero Image"
                  width={600}
                  height={400}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default HeroComponent;

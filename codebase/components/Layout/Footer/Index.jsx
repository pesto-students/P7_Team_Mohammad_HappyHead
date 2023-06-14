import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import theme from '../../styles/theme'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'
import FeaturesSection from './FeaturesSection'
import BottomSection from './BottomSection'
import { useSession } from 'next-auth/react';

const pages = [
  { name: 'About', path: '/about' },
  { name: 'Features', path: '/features' },
  { name: 'Contact', path: '/contact' },
]

const Footer = () => {

  const { data: session, status } = useSession();
  const { user } = session || {}; // Destructure user from session object
  let username;

  // console.log("Role:", user?.image[1]);
  // console.log("User/ExpertName:", user?.image[0]);


  if (session && user?.image[1] === "user") {
    username = user?.image[0];
    // console.log("its a user")
  }

  
const featureLinks = [
  {
    name: 'Personalised Mental Health Report & Recommendation',
    path: (session && username)
        ? `/users/qna/${username}`
        : '/features/qna'
  },
  {
    name: 'Guided Mindfulness Tools',
    path: (session && username)
        ? `/users/practicetools/${username}`
        : '/features/guidedtools'
  },
  {
    name: 'Connect with Experts',
    path: (session && username)
        ? `/users/expertConnect/${username}`
        : '/features/connect'
  },
  {
    name: 'Login as an Expert',
    path: '/experts/signin',
  },
]

  return (
    <Box sx={{ bgcolor: theme.palette.quinary.main, py: 3 }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <AboutSection />
          </Grid>

          {/* Features Section */}
          <Grid item xs={12} sm={4}>
            <FeaturesSection featureLinks={featureLinks} />
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <ContactSection />
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <BottomSection />
      </Container>
    </Box>
  )
}

export default Footer

import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import theme from '../../styles/Theme'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'
import FeaturesSection from './FeaturesSection'
import BottomSection from './BottomSection'

const pages = [
  { name: 'About', path: '/about' },
  { name: 'Features', path: '/features' },
  { name: 'Contact', path: '/contact' },
]

const featureLinks = [
  {
    name: 'Personalised Mental Health Report & Recommendation',
    path: '/features/personalised-report',
  },
  {
    name: 'Guided Mindfulness Tools',
    path: '/features/mindfulness-tools',
  },
  {
    name: 'Connect with Experts',
    path: '/features/connect-with-experts',
  },
  {
    name: 'Login as an Expert',
    path: '/features/login-as-expert',
  },
]

const Footer = () => {
  return (
    <Box sx={{ bgcolor: theme.palette.quaternary.main, py: 3 }}>
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

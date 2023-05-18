import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { NextLinkComposed } from '../MuiLink';
import theme from '../styles/theme';

const pages = [
  { name: 'About', path: '/about' },
  { name: 'Features', path: '/features' },
  { name: 'Contact', path: '/contact' },
];

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
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: theme.palette.quaternary.main, py: 3 }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {/* About, Features, Contact Sections */}
          {pages.map((page) => (
            <Grid item xs={12} sm={4} key={page.name}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <NextLinkComposed
                  to={page.path}
                  color="textPrimary"
                  sx={{
                    color: theme.palette.text.primary,
                    textDecoration: 'none',
                    fontFamily: theme.typography.fontFamily,
                    fontWeight: theme.typography.fontWeightBold,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" gutterBottom align="center">
                    {page.name}
                  </Typography>
                </NextLinkComposed>
                {page.name === 'Features' && (
                  <>
                    {featureLinks.map((feature) => (
                      <NextLinkComposed
                        key={feature.name}
                        to={feature.path}
                        color="textPrimary"
                        sx={{
                          color: theme.palette.text.primary,
                          textDecoration: 'none',
                          fontFamily: theme.typography.fontFamily,
                          fontWeight: theme.typography.fontWeightBold,
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                          {feature.name}
                        </Typography>
                      </NextLinkComposed>
                    ))}
                  </>
                )}
                {page.name === 'Contact' && (
                  <>
                    <NextLinkComposed
                      to="/contact-us"
                      color="textPrimary"
                      sx={{
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.typography.fontWeightBold,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Contact us
                      </Typography>
                    </NextLinkComposed>
                    <NextLinkComposed
                      to="/mental-health-resources"
                      color="textPrimary"
                      sx={{
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.typography.fontWeightBold,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Mental health resources
                      </Typography>
                    </NextLinkComposed>
                    <NextLinkComposed
                      to="/accessibility-statement"
                      color="textPrimary"
                      sx={{
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.typography.fontWeightBold,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Accessibility Statement
                      </Typography>
                    </NextLinkComposed>
                  </>
                )}
                {page.name === 'About' && (
                  <>
                    <NextLinkComposed
                      to="/about-happyhead"
                      color="textPrimary"
                      sx={{
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.typography.fontWeightBold,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="body2" color="textSecondary" component="p" align="center">
                        About HappyHead
                      </Typography>
                    </NextLinkComposed>
                    <NextLinkComposed
                      to="/the-team"
                      color="textPrimary"
                      sx={{
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.typography.fontWeightBold,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="body2" color="textSecondary" component="p" align="center">
                        The Team
                      </Typography>
                    </NextLinkComposed>
                    <NextLinkComposed
                      to="/join-our-team"
                      color="textPrimary"
                      sx={{
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.typography.fontWeightBold,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Join our Team
                      </Typography>
                    </NextLinkComposed>
                  </>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          {/* Social Media Icons */}
          <Grid item>
            <FacebookIcon sx={{ mx: 1 }} />
            <TwitterIcon sx={{ mx: 1 }} />
            <InstagramIcon sx={{ mx: 1 }} />
          </Grid>

          {/* Copyright */}
          <Typography
            variant="body2"
            color="textSecondary"
            mt={2}
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            © {new Date().getFullYear()} Your App. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

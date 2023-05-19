import React from 'react'
import { Box, Typography } from '@mui/material'
import { NextLinkComposed } from '../../MuiLink'
import theme from '../../styles/theme'


const AboutSection = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6" gutterBottom align="center">
          About
        </Typography>
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
      </Box>
    )
  }
  

export default AboutSection

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
        to="about#about-happyhead"
        smooth={true}
        duration={500}
        color="textPrimary"
        sx={{
          color: theme.palette.text.primary,
          textDecoration: 'none',
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeightBold,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" color="textSecondary" component="p" align="center">
          About HappyHead
        </Typography>
      </NextLinkComposed>
      <NextLinkComposed
        to="/about#about-aim"
        color="textPrimary"
        sx={{
          color: theme.palette.text.primary,
          textDecoration: 'none',
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeightBold,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" color="textSecondary" component="p" align="center">
          Our Aim
        </Typography>
      </NextLinkComposed>
      <NextLinkComposed
        to="/about#about-team"
        color="textPrimary"
        sx={{
          color: theme.palette.text.primary,
          textDecoration: 'none',
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeightBold,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" color="textSecondary" component="p" align="center">
          The Team
        </Typography>
      </NextLinkComposed>
    </Box>
  )
}


export default AboutSection

import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import theme from '../../styles/Theme'

const BottomSection = () => {
  return (
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
  )
}

export default BottomSection

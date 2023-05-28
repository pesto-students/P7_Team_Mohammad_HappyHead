import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiLink from '../../MuiLink'

const DesktopMenu = ({ pages, handleCloseNavMenu, theme }) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', paddingLeft: '3rem' } }}>
      {pages.map((page) => (
        <MuiLink key={page.name} href={page.path} color="inherit" underline="none" sx={{ fontFamily: 'Roboto, Arial, sans-serif', }}>
          <Button
            component="div"
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: theme.palette.text.primary, display: 'block', fontWeight: theme.typography.fontWeightBold, fontFamily: 'Roboto, Arial, sans-serif'}}
          >
            {page.name}
          </Button>
        </MuiLink>
      ))}
    </Box>
  )
}

export default DesktopMenu

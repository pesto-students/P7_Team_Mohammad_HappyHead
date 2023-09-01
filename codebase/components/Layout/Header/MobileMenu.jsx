import React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import MuiLink from '../../MuiLink'

const MobileMenu = ({ anchorElNav, handleOpenNavMenu, handleCloseNavMenu, pages, theme }) => {
  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        sx={{ color: theme.palette.text.primary }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.quinary.main, 
          },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page.name} onClick={handleCloseNavMenu}>
            <MuiLink href={page.path} color="inherit" underline="none">
              <Typography textAlign="center">{page.name}</Typography>
            </MuiLink>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MobileMenu

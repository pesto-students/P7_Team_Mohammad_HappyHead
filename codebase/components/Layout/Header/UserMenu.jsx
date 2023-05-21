import React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Login from '@mui/icons-material/AccountCircleRounded'
import MuiLink from '../../MuiLink'
import Box from '@mui/material/Box'

// UserMenu component
const UserMenu = ({ anchorElUser, handleOpenUserMenu, handleCloseUserMenu, login, theme }) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      {/* Login Button */}
      <Tooltip title="Login">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Login alt="Login" src="" sx={{ color: theme.palette.text.primary }} />{/* Color applied to the Login icon */}
        </IconButton>
      </Tooltip>
      {/* User Menu */}
      <Menu
        sx={{
          mt: '45px',
          '& .MuiPaper-root': {
            backgroundColor: theme.palette.quinary.main, 
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {/* Mapping login options */}
        {login.map((login) => (
          <MenuItem key={login.name} onClick={handleCloseUserMenu}>
            <MuiLink href={login.path} color="inherit" underline="none">
              <Typography textAlign="center" sx={{ color: theme.palette.text.primary }}>
                {login.name}
              </Typography>
            </MuiLink>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default UserMenu
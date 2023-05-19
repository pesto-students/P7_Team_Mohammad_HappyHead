import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/system'
import theme from '../../styles/theme'
import Logo from '@mui/icons-material/AddReactionOutlined'
import MuiLink from '../../MuiLink'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import UserMenu from './UserMenu'

const pages = [
  { name: 'About', path: '/about' },
  { name: 'Features', path: '/features' },
  { name: 'Contact', path: '/contact' },
];

const login = [
  { name: 'Sign In', path: '/signin' },
  { name: 'Sign Up', path: '/signup' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Desktop Styling */}
            <Logo sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            
            <Typography
              variant="h6"
              noWrap
              component="div"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: theme.palette.text.primary, // Color applied to the LOGO text
                textDecoration: 'none',
              }}
            >
             <MuiLink href="/" color="inherit" underline="none">HappyHead</MuiLink>
            </Typography>

            {/* Mobile Styling */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <MobileMenu
                anchorElNav={anchorElNav}
                handleOpenNavMenu={handleOpenNavMenu}
                handleCloseNavMenu={handleCloseNavMenu}
                pages={pages}
                theme={theme}
              />
            </Box>

            <Logo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="div"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: theme.palette.text.primary, // Color applied to the LOGO text
                textDecoration: 'none',
              }}
            >
             <MuiLink href="/" color="inherit" underline="none">HappyHead</MuiLink>
            </Typography>

            {/* Desktop Styling */}
            <DesktopMenu 
            pages={pages} 
            handleCloseNavMenu={handleCloseNavMenu}
            theme={theme} />

            <UserMenu
              anchorElUser={anchorElUser}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              login={login}
              theme={theme}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default ResponsiveAppBar

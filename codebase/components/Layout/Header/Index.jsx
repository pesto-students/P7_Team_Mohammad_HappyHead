import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/system'
import theme from '../../styles/theme'
import Logo from '@mui/icons-material/AddReactionOutlined'
import MuiLink from '../../MuiLink'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import UserMenu from './UserMenu'
import {useSession} from 'next-auth/react'

// ResponsiveAppBar component
function ResponsiveAppBar({ isLoggedIn }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { username, expertname } = router.query;
  const dashboardPath = isLoggedIn ? (username ? `/users/dashboard/${username}` : `/experts/dashboard/${expertname}`) : '/features';


  // State variables
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  // Array of pages for navigation
  const pages = [
    { name: 'About', path: '/about' },
    { name: isLoggedIn ? 'Dashboard' : 'Features', path: dashboardPath },
    { name: 'Contact', path: '/contact' },
  ];

  // Array of login options
  const login = [
    { name: 'Sign In', path: '/signin' },
    { name: 'Sign Up', path: '/signup' },
    { name: 'Dashboard', path: dashboardPath },
    { name: 'Logout', path: '/logout' },
  ];

  // Event handlers for opening and closing navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  };

  const filteredPages = pages.filter((page) => {
    if (page.name === 'Dashboard') {
      return isLoggedIn;
    }
    return true;
  });

  // Filtering login options based on user's login status
  const filteredLoginOptions = username || expertname ? login.slice(2, 4) : login.slice(0, 2);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Desktop Styling */}
            <Logo sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize="large" />

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
              <MuiLink href="/" color="inherit" underline="none">
                HappyHead
              </MuiLink>
            </Typography>

            {/* Mobile Styling */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <MobileMenu
                anchorElNav={anchorElNav}
                handleOpenNavMenu={handleOpenNavMenu}
                handleCloseNavMenu={handleCloseNavMenu}
                pages={filteredPages}
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
              <MuiLink href="/" color="inherit" underline="none">
                HappyHead
              </MuiLink>
            </Typography>

            {/* Desktop Styling */}
            <DesktopMenu pages={filteredPages} handleCloseNavMenu={handleCloseNavMenu} theme={theme} />

            { (session ? <h4>Logged In, {session?.user?.name}</h4>: <h4>Log In</h4>)}

            {/* User Menu */}
            <UserMenu
              anchorElUser={anchorElUser}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              login={filteredLoginOptions}
              theme={theme}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

// Default props for ResponsiveAppBar component
ResponsiveAppBar.defaultProps = {
  isLoggedIn: false,
}

export default ResponsiveAppBar;

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Login from '@mui/icons-material/AccountCircleRounded';
import { ThemeProvider } from "@mui/system"
import theme from '../styles/theme';
import Logo from '@mui/icons-material/AddReactionOutlined';
import Link from 'next/link';

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

            {/* Color applied here */}
            <Typography
              variant="h6"
              noWrap
              component="a"
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
              HappyHead
            </Typography>

            {/* Mobile Styling */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    backgroundColor: theme.palette.quinary.main, // Set the background color here
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link href={page.path} passHref>
                      <Typography textAlign="center">{page.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>

            </Box>
            <Logo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

            {/* Color applied here */}
            <Typography
              variant="h5"
              noWrap
              component="a"
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
              HappyHead
            </Typography>

            {/* Desktop Styling */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link key={page.name} href={page.path} passHref>
                  <Button
                    component="a"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: theme.palette.text.primary, display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </Link> 
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }} >
              <Tooltip title="Login">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* Color applied here */}
                  <Login alt="Login" src="" sx={{ color: theme.palette.text.primary }} /> {/* Color applied to the Login icon */}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: '45px',
                  '& .MuiPaper-root': {
                    backgroundColor: theme.palette.quinary.main // Set the background color here
                  }
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
                {login.map((login) => (
                  <MenuItem key={login.name} onClick={handleCloseUserMenu}>
                    <Link href={login.path} passHref>
                      <Typography textAlign="center" sx={{ color: theme.palette.text.primary }}>{login.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default ResponsiveAppBar;

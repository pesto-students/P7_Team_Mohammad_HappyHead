import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signOut } from 'next-auth/react';
import { ThemeProvider, display, styled } from '@mui/system';
import theme from '../styles/theme';
import ButtonWrapper from '../styles/ButtonWrapperStyles';
import RootContainer from '../styles/RootContainerStyles';
import SectionContainer from '../styles/SectionsContainer';
import { redirectToPage } from '../../utils/redirect';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem 2rem 2rem',
}));

// Styled component for the main content container
const CustomSectionContainer = styled(SectionContainer)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '3rem',
  },
  height: '50vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Logout = () => {
  const handleSignOut = async () => {
    await signOut();
    // Redirect to the desired page after sign out
    redirectToPage(`/`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomSectionContainer>
          <Typography variant="h4" align="center" mt={4} sx={{paddingBottom: '1.5rem'}}>
            Are you sure you want to logout?
          </Typography>

          <ButtonWrapper color="primary">
            <Button variant="contained" onClick={handleSignOut}>
              Logout
            </Button>
          </ButtonWrapper>
        </CustomSectionContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
};

export default Logout;

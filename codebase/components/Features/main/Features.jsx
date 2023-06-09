import React, { useState, useEffect } from 'react';
import { CardContent } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import { redirectToPage } from '../../../utils/redirect';
import RootContainer from '../../styles/RootContainerStyles';
import SectionContainer from '../../styles/SectionsContainer';
import theme from '../../styles/theme';
import MuiLink from '../../MuiLink';
import Loader from '../../styles/Loader'
import Image from 'next/image'
import { toolsData } from '../toolsData';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem 2rem 2rem',
}));

// Styled component for the main content container
const CustomSectionContainer = styled(SectionContainer)(({ theme }) => ({
  padding: '2rem',
  margin: '1rem 2rem',
  // Add the desired background colors for each section
  '&:nth-child(1)': {
    backgroundColor: theme.palette.quinary.main,
    margin: '0 2rem 1rem 2rem',
  },
  '&:nth-child(2)': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:nth-child(3)': {
    backgroundColor: theme.palette.tertiary.main,
  },
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Update with desired box shadow style
    transform: 'scale(1.02)', // Update with desired transformation
  },
}));

const muiLinkStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Features = ({ isLoggedIn }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay of 2 seconds for loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle card click
  const handleCardClick = (tool) => {
    if (tool.path) {
      console.log(`Redirecting to ${tool.path}`);
      redirectToPage(tool.path); // Call the redirect function with the tool's path
    } else {
      console.log('User not logged in. Redirecting to login page...');
      window.alert('Login to access');
      redirectToPage('/loginUser'); // Redirect to the login page if path doesn't exist
    }
  };

  // Divide the toolsData into three sections
  const section1 = toolsData.slice(0, 3);
  const section2 = toolsData.slice(3, 6);
  const section3 = toolsData.slice(6, 9);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loader />
      ) : (
        <CustomRootContainer>

          {/* Section 1 */}

          {section1.map((tool, index) => (
            <CustomSectionContainer key={index} onClick={() => handleCardClick(tool)}>
              <CardContent>
                <Image
                  src={tool.image}
                  alt={tool.name}
                  width={200}
                  height={200}
                />
                <MuiLink
                  href={tool.path ? tool.path : '/loginUser'}
                  underline="none"
                  color="inherit"
                  variant="h3"
                  gutterBottom
                  sx={{
                    ...muiLinkStyles,
                    fontSize: { xs: '2rem', sm: '2rem', md: '2rem', lg: '3rem' },
                  }}
                >
                  {tool.name}
                </MuiLink>
                <MuiLink
                  href={isLoggedIn ? tool.path : '/loginUser'}
                  underline="none"
                  color="inherit"
                  variant="h6"
                  component="p"
                  sx={muiLinkStyles}
                >
                  {tool.subtext}
                </MuiLink>
              </CardContent>
            </CustomSectionContainer>
          ))}

          {/* // Section 2 */}
          {section2.map((tool, index) => (
            <CustomSectionContainer key={index} onClick={() => handleCardClick(tool)}>
              <CardContent>
                <StyledIconContainer>
                  <img src={tool.image} alt={tool.name} />
                </StyledIconContainer>
                <MuiLink
                  href={tool.path ? tool.path : '/loginUser'}
                  underline="none"
                  color="inherit"
                  variant="h3" // Update the variant to match the desired typography style
                  component="h2"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                  }}
                >
                  {tool.name}
                </MuiLink>
                <MuiLink
                  href={isLoggedIn ? tool.path : '/loginUser'}
                  underline="none"
                  color="inherit"
                  variant="h6" // Update the variant to match the desired typography style
                  component="p"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {tool.subtext}
                </MuiLink>
              </CardContent>
            </CustomSectionContainer>
          ))}

          {/* // Section 3 */}
          {section3.map((tool, index) => (
            <CustomSectionContainer key={index} onClick={() => handleCardClick(tool)}>
              <CardContent>
                <StyledIconContainer>
                  <img src={tool.image} alt={tool.name} />
                </StyledIconContainer>
                <MuiLink
                  href={tool.path ? tool.path : '/loginUser'}
                  underline="none"
                  color="inherit"
                  variant="h3" // Update the variant to match the desired typography style
                  component="h2"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                  }}
                >
                  {tool.name}
                </MuiLink>
                <MuiLink
                  href={isLoggedIn ? tool.path : '/loginUser'}
                  underline="none"
                  color="inherit"
                  variant="h6" // Update the variant to match the desired typography style
                  component="p"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {tool.subtext}
                </MuiLink>
              </CardContent>
            </CustomSectionContainer>
          ))}

        </CustomRootContainer>
      )}
    </ThemeProvider>
  );
};

export default Features;

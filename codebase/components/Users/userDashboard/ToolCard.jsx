import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider, styled } from '@mui/system';
import { Grid, CardContent } from '@mui/material';
import MuiLink from '../../MuiLink';
import RootContainer from '../../styles/RootContainerStyles';
import SectionContainer from '../../styles/SectionsContainer';
import theme from '../../styles/theme';
import Loader from '../../styles/Loader';
import Image from 'next/image'
import { redirectToPage } from '../../../utils/redirect';
import { useSession } from 'next-auth/react';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '0 2rem',
}));

// Styled component for the main content container
const CustomSectionContainer = styled(SectionContainer)(({ theme }) => ({
  margin: '0 2rem',
  backgroundColor: theme.palette.primary.main,
  width: '100%',
}));

// Styled component for the IconContainer with styled icons
const StyledCard = styled(CardContent)(() => ({
  borderRadius: '8px',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    transform: 'scale(1.02)',
  },
}));

const muiLinkStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const ToolCardContainer = () => {
  const router = useRouter();

  const sessionData  = useSession();
  // console.log("User:", sessionData.data?.user);
  const [username, setUsername] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {    
    // Get username or expertname from the session object
    if (sessionData.data && sessionData.data?.user && sessionData.data.user?.image[1] === "user") {
      setUsername(sessionData.data.user.image?.[0]);
      // console.log('is user')
    }      
}, [sessionData]);

  useEffect(() => {
    // Simulating a delay of 2 seconds for loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  //Array with all user tools data
  const toolsData = [
    {
      name: 'Your Mental Health Report',
      subtext:
        'Answer a few questions related to your stressors & lifestyle and get personalized insights and recommendations',
      path: `/users/qna/${username}`,
      image: '/images/features/report.png',
      color: theme.palette.secondary.main,
    },
    {
      name: 'Connect with Experts',
      subtext:
        'Get personalized guidance and support from certified professionals to address your mental health concerns effectively.',
      path: `/users/expertConnect/${username}`,
      image: '/images/features/expert.png',
      color: theme.palette.quaternary.main,
    },
    {
      name: 'Guided Practice Tools',
      subtext: `Discover effective relaxation techniques and practices to enhance your well-being and find inner calm amidst life's challenges.`,
      path: `/users/practicetools/${username}`,
      image: '/images/features/tools.png',
      color: theme.palette.tertiary.main,
    },
  ];

  // Handle click on a tool card
  const handleCardClick = (tool) => {
    console.log(`Redirecting to ${tool.path}`);
    redirectToPage(tool.path);
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <Loader />
      ) : (
        <CustomRootContainer>
          <CustomSectionContainer>
            <Grid container spacing={2}>
              {toolsData.map((tool, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
                  <StyledCard style={{ backgroundColor: tool.color }} onClick={() => handleCardClick(tool)}>
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      width={200}
                      height={200}
                    />
                    <div>
                      <MuiLink
                        href={tool.path}
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
                        href={tool.path}
                        underline="none"
                        color="inherit"
                        variant="h6"
                        component="p"
                        sx={{
                          ...muiLinkStyles,
                          padding: '0 1rem',
                        }}
                      >
                        {tool.subtext}
                      </MuiLink>
                    </div>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </CustomSectionContainer>
        </CustomRootContainer>
      )}
    </ThemeProvider>
  );
};

export default ToolCardContainer;

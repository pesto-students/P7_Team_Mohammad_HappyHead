import React from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider, styled } from '@mui/system';
import { Grid, CardContent } from '@mui/material';
import MuiLink from '../../MuiLink';
import RootContainer from '../../styles/RootContainerStyles';
import SectionContainer from '../../styles/SectionsContainer';
import IconContainer from '../../styles/IconContainerStyles';
import theme from '../../styles/theme';
import Loader from '../../styles/Loader';
import { redirectToPage } from '../../../utils/redirect';

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
const StyledIconContainer = styled(IconContainer)(() => ({
  '& img': {
    width: '10rem',
    height: '10rem',
  },
}));

// Styled component for the IconContainer with styled icons
const StyledCard = styled(CardContent)(() => ({
  borderRadius: '8px',
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

const ToolCardContainer = () => {
  const router = useRouter();
  const { username } = router.query;

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
      <CustomRootContainer>
        <CustomSectionContainer>
          <Grid container spacing={2}>
            {toolsData.map((tool, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
                <StyledCard style={{ backgroundColor: tool.color }} onClick={() => handleCardClick(tool)}>
                  <StyledIconContainer>
                    <img src={tool.image} alt={tool.name} />
                  </StyledIconContainer>
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
                        padding: '0 1rem', // Add desired padding values
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
    </ThemeProvider>
  );
};

export default ToolCardContainer;

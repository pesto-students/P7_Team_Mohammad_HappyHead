import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/system';
import { Grid, Avatar } from '@mui/material';

import theme from '../styles/theme';
import Title from '../styles/TitleStyles';
import SubText from '../styles/SubTextStyles';
import RootContainer from '../styles/RootContainerStyles';
import ContentContainer from '../styles/ContentContainerStyles';
import PhotoContainer from '../styles/PhotoContainerStyle';
import ColumnContainer from '../styles/ColumnContainerStyle';

// Styled component for the root container
const CustomRoot = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.tertiary.main,
}));

// Styled component for the main content container
const CustomAboutContainer = styled(ContentContainer)(({ theme }) => ({
  maxWidth: 'none', // Exclude the maxWidth property
  backgroundColor: theme.palette.tertiary.main,
  margin: theme.spacing(2),
  marginTop: '3rem',
}));

// Styled component for the circular ImageContainer
const ImageContainer = styled(PhotoContainer)(({ theme }) => ({
  // Additional styling specific to the ImageContainer
  // ...

  '& .MuiAvatar-root': {
    width: '10rem',
    height: '10rem',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `2px solid ${theme.palette.primary.main}`, 
  },
}));

const CustomTitle = styled(Title)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(6),
}));

const Team = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Root container */}
      <CustomRoot>
        {/* Main content container */}
        <CustomAboutContainer>
          <Grid container spacing={2}>
            {/* First column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* ImageContainer for Chaitra */}
                <ImageContainer>
                  <Avatar alt="Chaitra" src="/images/chaitra.jpg" />
                </ImageContainer>
                <CustomTitle variant="h5">Chaitra</CustomTitle>
                <SubText variant="body1">
                  Think of HappyHead as your mind’s best friend. We’re here for you whenever you need us, wherever you are,
                  helping you get through tough times and find joy in every day.
                </SubText>
              </ColumnContainer>
            </Grid>

            {/* Second column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* ImageContainer for Parisha */}
                <ImageContainer>
                  <Avatar alt="Parisha" src="/images/parisha.jpeg" />
                </ImageContainer>
                <CustomTitle variant="h5">Parisha</CustomTitle>
                <SubText variant="body1">
                  Through science-backed meditation and mindfulness tools, HappyHead helps you create life-changing habits
                  to support your mental health and find a healthier, happier you.
                </SubText>
              </ColumnContainer>
            </Grid>

            {/* Third column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* ImageContainer for Shubham */}
                <ImageContainer>
                  <Avatar alt="Shubham" src="/path/to/why-image.jpg" />
                </ImageContainer>
                <CustomTitle variant="h5">Shubham</CustomTitle>
                <SubText variant="body1">
                  HappyHead is proven to reduce stress by 14% in just 10 days. It can also help you relax your mind in minutes,
                  improve focus, and get the best sleep ever.
                </SubText>
              </ColumnContainer>
            </Grid>
          </Grid>
        </CustomAboutContainer>
      </CustomRoot>
    </ThemeProvider>
  );
}

export default Team;


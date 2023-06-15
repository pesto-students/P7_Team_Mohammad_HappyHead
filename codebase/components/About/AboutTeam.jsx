import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/system';
import { Grid, Avatar } from '@mui/material';

import theme from '../styles/theme';
import Title from '../styles/TitleStyles';
import SubText from '../styles/SubTextStyles';
import RootContainer from '../styles/RootContainerStyles';
import PhotoContainer from '../styles/PhotoContainerStyle';
import ColumnContainer from '../styles/ColumnContainerStyle';
import SectionContainer from '../styles/SectionsContainer'

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem 3rem 2rem',
}));

// Styled component for the main content container
const CustomSectionContainer = styled(SectionContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

// Styled component for the circular ImageContainer
const ImageContainer = styled(PhotoContainer)(({ theme }) => ({
  '& .MuiAvatar-root': {
    width: '10rem',
    height: '10rem',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `10px solid ${theme.palette.quinary.main}`,
  },
}));

const CustomTitle = styled(Title)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const CustomSubTitle = styled(Title)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(6),
}));

const Team = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Root container */}
      <CustomRootContainer>
        <CustomSectionContainer>
          <CustomTitle variant="h3">The Team</CustomTitle>
          {/* Main content container */}
          <Grid container spacing={2}>
            {/* First column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* ImageContainer for Chaitra */}
                <ImageContainer>
                  <Avatar alt="Chaitra" src="/images/chaitra.jpg" />
                </ImageContainer>
                <CustomSubTitle variant="h5">Chaitra</CustomSubTitle>
                <SubText variant="body1">
                A free-spirited tech wizard with a bohemian soul, she blends code and wanderlust. When not debugging, she unleashes her zumba freak, joyfully bouncing to the beat.
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
                <CustomSubTitle variant="h5">Parisha</CustomSubTitle>
                <SubText variant="body1">
                  An unboxabe chameleon who is too interesting to categorise, she is a marketer, coder, rower, ukulele player, avid reader, pet parent, pizza eater and music lover.
                </SubText>
              </ColumnContainer>
            </Grid>

            {/* Third column */}
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ColumnContainer>
                {/* ImageContainer for Shubham */}
                <ImageContainer>
                  <Avatar alt="Shubham" src="/images/shubham.jpeg" />
                </ImageContainer>
                <CustomSubTitle variant="h5">Shubham</CustomSubTitle>
                <SubText variant="body1">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora et magnam, ab, voluptatum numquam rem excepturi id voluptatem obcaecati eos eveniet porro.
                </SubText>
              </ColumnContainer>
            </Grid>
          </Grid>
        </CustomSectionContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
}

export default Team;


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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quod libero natus quas a omnis. Numquam qui fuga modi ex soluta.
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
                <CustomTitle variant="h5">Shubham</CustomTitle>
                <SubText variant="body1">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora et magnam, ab, voluptatum numquam rem excepturi id voluptatem obcaecati eos eveniet porro.
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


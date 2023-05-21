import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/system';
import { Grid, Avatar,Button } from '@mui/material';
import ButtonWrapper from '../styles/ButtonWrapperStyles';
import { useEffect, useState } from 'react';
import expertsData from '../../data/expertsData.json';




import theme from '../styles/theme';
import Title from '../styles/TitleStyles';
import SubText from '../styles/SubTextStyles';
import RootContainer from '../styles/RootContainerStyles';
import ContentContainer from '../styles/ContentContainerStyles';
import PhotoContainer from '../styles/PhotoContainerStyle';
import ColumnContainer from '../styles/ColumnContainerStyle';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent } from '@mui/material';




// const  = () => {
//     return (
//         <p>hello world</p>
//       )
//     }


// Styled component for the root container
// const CustomRoot = styled(RootContainer)(({ theme }) => ({
//     backgroundColor: theme.palette.tertiary.main,
//   }));
  
//   // Styled component for the main content container
//   const CustomAboutContainer = styled(ContentContainer)(({ theme }) => ({
//     maxWidth: 'none', // Exclude the maxWidth property
//     backgroundColor: theme.palette.tertiary.main,
//     margin: theme.spacing(2),
//     marginTop: '3rem',
//   }));
  
//   // Styled component for the circular ImageContainer
//   const ImageContainer = styled(PhotoContainer)(({ theme }) => ({
//     // Additional styling specific to the ImageContainer
//     // ...
  
//     '& .MuiAvatar-root': {
//       width: '10rem',
//       height: '10rem',
//       borderRadius: '50%',
//       objectFit: 'cover',
//       border: `2px solid ${theme.palette.primary.main}`, 
//     },
//   }));
  
//   const CustomTitle = styled(Title)(({ theme }) => ({
//     marginBottom: theme.spacing(2),
//     paddingTop: theme.spacing(6),
//   }));

const StyledPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.secondary.main,
...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 600,
    maxHeight:400,
    color: theme.palette.text.primary,
  }));
  
  const message = `Truncation should be conditionally applicable on this long line of text
   as this is a much ff line than what the container can support.Liwihuhasb hbuyhsuidhsiudh sdbsiuduhsdiufhs hbudshfuyshf huyshfyus `;
  
  const Experts = () => {
    const classes = useStyles();
  
    return (
      <div>
        <h1>Doctors</h1>
        {doctorsData.map((doctor) => (
          <Card key={doctor.id} className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {doctor.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Specialty: {doctor.specialty}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Location: {doctor.location}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  export default Experts;

import React from 'react'
import { Avatar, CardActions, Typography, Grid, Card, Button } from '@mui/material'
import CardContentStyle from '../../styles/CardContentStyle'
import theme from '../../styles/theme';

const ExpertProfile = ({ expertProfile, handleOpenDialog }) => {
  const cardActionsStyles = {
    justifyContent: 'center',
    margin: '1rem',
    [theme.breakpoints.up('lg')]: {
      marginLeft: '4rem',
  },
  }

  return (
    <Grid item xs={12} lg={11}>
      <Card style={{ height: '80%', width: '100%',}}>
        <CardContentStyle>
          <Avatar sx={{ marginTop: '1.2rem' }}>{expertProfile.name[0]}</Avatar>
          <Typography variant="h6">{expertProfile.name}</Typography>
          <Typography color="textSecondary"><strong>Username: </strong>{expertProfile.expertname}</Typography>
          <Typography color="textSecondary"><strong>Email: </strong>{expertProfile.email}</Typography>
          <Typography color="textSecondary"><strong>Phone Number: </strong>{expertProfile.phoneNumber}</Typography>
          <Typography color="textSecondary"><strong>Qualifications: </strong>{expertProfile.qualifications}</Typography>
          <Typography color="textSecondary"><strong>Experience: </strong>{expertProfile.yearsOfExperience}yrs</Typography>
          <Typography color="textSecondary"><strong>Speciality: </strong>{expertProfile.speciality}</Typography>
          <Typography color="textSecondary"><strong>Consultation Fee: </strong>{expertProfile.consultationFee}</Typography>
          <CardActions style={cardActionsStyles}>
            <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
              Edit Profile
            </Button>
          </CardActions>
        </CardContentStyle>
      </Card>
    </Grid>
  )
}

export default ExpertProfile
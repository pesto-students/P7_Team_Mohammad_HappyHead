import React from 'react'
import { Avatar, CardActions, Typography, Grid, Card, Button } from '@mui/material'
import CardContentStyle from '../styles/CardContentStyle'

const ExpertsProfile = ({ expertsProfile, handleOpenDialog }) => {
  const cardActionsStyles = {
    justifyContent: 'center',
    marginBottom: '1rem',
  }

  return (
    <Grid item xs={12} lg={4}>
      <Card style={{ height: '500px', width: '300px',marginLeft:'8rem',marginTop:'3rem',}}>
        <CardContentStyle>
          <Avatar sx={{ marginTop: '1.2rem' }}>{expertsProfile.name[0]}</Avatar>
          <Typography variant="h6">{expertsProfile.name}</Typography>
          <Typography color="textSecondary">{expertsProfile.username}</Typography>
          <Typography color="textSecondary">{expertsProfile.email}</Typography>
          <Typography color="textSecondary">{expertsProfile.dob}</Typography>
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

export default ExpertsProfile
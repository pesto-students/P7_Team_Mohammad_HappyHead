import React from 'react'
import { Avatar, CardActions, Typography, Grid, Card, Button } from '@mui/material'
import CardContentStyle from '../../styles/CardContentStyle'

const UserProfile = ({ userProfile, handleOpenDialog }) => {
  const cardActionsStyles = {
    justifyContent: 'center',
    marginBottom: '1rem',
  }
// console.log(userProfile.user.name)
      return (
      <Grid item xs={12} lg={4}>
        <Card style={{ height: '100%' }}>
          <CardContentStyle>
          {userProfile && (
            <>
            <Avatar sx={{ marginTop: '1.4rem' }}>{userProfile?.name[0]}</Avatar>
            <Typography variant="h6">{userProfile.name}</Typography>
            <Typography color="textSecondary">{userProfile?.username}</Typography>
            <Typography color="textSecondary">{userProfile?.email}</Typography>
            <Typography color="textSecondary">{userProfile?.dob}</Typography>
            </>
          )}
            
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



export default UserProfile

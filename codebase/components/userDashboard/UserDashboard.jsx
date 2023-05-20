import React, { useState } from 'react';
import {
  CardContent,
  Typography,
  Grid,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  DialogActions
} from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import { Avatar, CardActions } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import RootContainer from '../styles/RootContainerStyles';
import ContentContainer from '../styles/ContentContainerStyles';
import CardStyle from '../styles/CardStyles';
import CardContentStyle from '../styles/CardContentStyle';
import theme from '../styles/theme';
import MuiLink from '../MuiLink';
import {redirectToPage} from '../../utils/redirect'
import { toolsData } from '../Features/toolsData';


// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

// Styled component for the content container
const CustomContentContainer = styled(ContentContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: '2rem',
  [theme.breakpoints.up('lg')]: {
    padding: '4rem',
  },
}));

// Styles for the card actions
const cardActionsStyles = {
  justifyContent: 'center',
  marginBottom: '1rem',
};

// Styles for the MuiLink components
const muiLinkStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.secondary.main,
  },
  '& .MuiInputLabel-outlined': {
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.text.primary, 
    },
  },
}));

// Styles for the edit profile pop-up button components
const buttonStyles = {
  cancelButton: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.tertiary.main,
    // Add more styling properties as needed
  },
  saveButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.quinary.main,
    // Add more styling properties as needed
  },
};


const UserDashboard = ({ isLoggedIn }) => {
  // User profile data
  const [userProfile, setUserProfile] = useState({
    name: 'Arjun',
    username: 'ArjunS',
    email: 'arjun@gmail.com',
    dob: '1990-01-01',
    password: '********',
  });

  // Edit profile dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  // Toggle password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle opening the edit profile dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEditedProfile({ ...userProfile });
  };

  // Function to handle closing the edit profile dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle saving the edited profile
  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setOpenDialog(false);
  };

  // Function to handle input change in the profile form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Function to handle card click
  const handleCardClick = (tool) => {
    if (isLoggedIn) {
      console.log(`Redirecting to ${tool.path}`);
      // Call the redirect function with the tool's path
      redirectToPage(tool.path);
    } else {
      console.log('User not logged in. Redirecting to login page...');
      // Redirect to the login page if the user is not logged in
      redirectToPage('/loginUser');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <Grid container spacing={2}>
            {/* User profile section */}
            <Grid item xs={12} lg={4}>
              <Card style={{ height: '100%' }}>
                <CardContentStyle>
                  <Avatar sx={{ marginTop: '1.4rem' }}>{userProfile.name[0]}</Avatar>
                  <Typography variant="h6">{userProfile.name}</Typography>
                  <Typography color="textSecondary">{userProfile.username}</Typography>
                  <Typography color="textSecondary">{userProfile.email}</Typography>
                  <Typography color="textSecondary">{userProfile.dob}</Typography>
                  <CardActions style={cardActionsStyles}>
                    <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
                      Edit Profile
                    </Button>
                  </CardActions>
                </CardContentStyle>
              </Card>
            </Grid>

            {/* Tools section */}
            <Grid item xs={12} lg={8} container spacing={2}>
              {toolsData.map((tool, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CardStyle onClick={() => handleCardClick(tool)}>
                    <CardContent>
                      <MuiLink
                        href={isLoggedIn ? tool.path : '/loginUser'}
                        underline="none"
                        color="inherit"
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={muiLinkStyles}
                      >
                        {tool.name}
                      </MuiLink>
                      <MuiLink
                        href={isLoggedIn ? tool.path : '/loginUser'}
                        underline="none"
                        color="inherit"
                        variant="body1"
                        component="p"
                        sx={muiLinkStyles}
                      >
                        {tool.subtext}
                      </MuiLink>
                    </CardContent>
                  </CardStyle>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </CustomContentContainer>
      </CustomRootContainer>

      {/* Edit profile dialog */}
      <CustomDialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            name="name"
            value={editedProfile.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Username"
            type="text"
            name="username"
            value={editedProfile.username}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            name="email"
            value={editedProfile.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            name="dob"
            value={editedProfile.dob}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={editedProfile.password}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={buttonStyles.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} style={buttonStyles.saveButton} variant="contained">
            Save
          </Button>
        </DialogActions>
      </CustomDialog>
    </ThemeProvider>
  );
};

export default UserDashboard;




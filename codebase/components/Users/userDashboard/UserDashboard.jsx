import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, CardActions, Dialog, DialogTitle, DialogContent, TextField, InputAdornment, IconButton, DialogActions, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RootContainer from '../../styles/RootContainerStyles';
import Image from 'next/image'
import SectionContainer from '../../styles/SectionsContainer';
import SubText from '../../styles/SubTextStyles';
import theme from '../../styles/theme';
import Loader from '../../styles/Loader';
import messages from './messages'
import { redirectToPage } from '../../../utils/redirect';
import { useSession } from 'next-auth/react';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '0 2rem 0',
}));

// Styled component for the main content container
const CustomSectionContainer = styled(SectionContainer)(({ theme }) => ({
  backgroundColor: theme.palette.quinary.main,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: '3rem',
  margin: '0 2rem',
  width: '100%',
}));

//Styled component for the Heading 
const CustomTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

// Styled component for the cards 
const cardActionsStyles = {
  justifyContent: 'center',
  marginBottom: '1rem',
}

// Styled component for the popup dialog box
const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiInputLabel-outlined': {
    color: theme.palette.text.primary, // Apply theme.palette.text.primary color to label text
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.text.primary, // Apply theme.palette.text.primary color to outline border on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.text.primary, // Apply theme.palette.text.primary color to outline border when focused
    },
    '&.Mui-focused .MuiInputLabel-outlined': {
      color: 'black !important', // Change the color to black for the label text when focused
    },
  },
}));

// Styled component for the centered subtext
const CenteredSubText = styled(SubText)({
  textAlign: 'center',
  padding: '0 1rem',
  width: '100%'
});

// Button styles for cancel and save buttons
const buttonStyles = {
  cancelButton: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.tertiary.main,
  },
  saveButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.quinary.main,
  },
};

const UserDashboard = () => {
  const router = useRouter();
  // const { username } = router.query;

  const sessionData  = useSession();
  console.log("User:", sessionData.data?.user);
  const [username, setUsername] = useState(null);

  // State variables
  const [userProfile, setUserProfile] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile, password: '' }); // Initialize with empty password
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(); // State variable for username availability
  const [originalUsername, setOriginalUsername] = useState(''); // New state variable for storing the original username

  useEffect(() => {    
      // Get username or expertname from the session object
      if (sessionData.data && sessionData.data?.user && sessionData.data.user?.image[1] === "user") {
        setUsername(sessionData.data.user.image?.[0]);
        console.log('is user')
      }      
  }, [sessionData]);

  // Open the profile edit dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEditedProfile(userProfile ? { ...userProfile } : {});
  };

  // Close the profile edit dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    // Fetch user profile data when the component mounts and username changes
    const getUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/dashboard/${username}`)
        const userProfile = await response.json();
        setUserProfile(userProfile);
        setEditedProfile(userProfile);
        setOriginalUsername(username);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    }
    getUserProfile();
  }, [username]);

  const handleSaveProfile = async () => {
    try {
      // Fetch the user profile with the new username
      const res = await fetch(`/api/users/dashboard/${editedProfile.username}`);
      const existingUser = await res.json();

      // Check if the username already exists and it belongs to a different user
      if (existingUser && existingUser.username !== originalUsername) {
        console.error('Username already exists');
        alert('Username already exists, try something else.');
        return; // Stop execution and display an error message
      }

      const response = await fetch(`/api/users/dashboard/${originalUsername}`, { // Use the original username to make the request
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldUsername: originalUsername,
          editedProfile
        }), // Include oldUsername field in the request body
      });
   
      if (response.ok) {
        setUsername(editedProfile.username);
        console.log(username)
        setEditedProfile(editedProfile);
        setOpenDialog(false);       
        redirectToPage(`/users/dashboard/${editedProfile.username}`);
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Failed to update user profile', error);
    }
  };

  // Handle input change in the profile edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      // Convert the date value to the required format "yyyy-MM-dd"
      const formattedDate = new Date(value).toISOString().split('T')[0];
      setEditedProfile((prevState) => ({
        ...prevState,
        [name]: formattedDate,
      }));
    }
    else {
      setEditedProfile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Check username availability when Check Availability button is clicked
  const handleCheckAvailability = async () => {
    const { username } = editedProfile;
    const response = await fetch(`/api/users/dashboard/availability/${username}`);
    const result = await response.json();
    console.log(result)
    setUsernameAvailable(result.available);
  };

  // To generate random welcome messages for the user
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  if (!userProfile) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        {/* User profile component */}
        <CustomSectionContainer>
          <Image
            src="/images/dashboard/bee.png"
            alt="happy-bee"
            width={125}
            height={125}
          />
          {userProfile && (
            <CustomTitle component="h2">Hey there, {userProfile.name}!</CustomTitle>
          )}
          <CenteredSubText>{randomMessage}</CenteredSubText>
          <CardActions style={cardActionsStyles}>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
              Edit Profile
            </Button>
          </CardActions>
        </CustomSectionContainer>

        {/* Custom styled dialog */}
        <CustomDialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            {/* Profile edit form */}
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Name"
              name="name"
              value={editedProfile.name || ''}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Username"
              name="username"
              value={editedProfile.username || ''}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={handleCheckAvailability}
                      style={{
                        backgroundColor: theme.palette.quinary.main,
                        fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.main,
                        },
                      }}
                    >
                      Check Availability
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            {usernameAvailable !== null && usernameAvailable !== undefined && (
              <Typography variant="caption" color={usernameAvailable ? 'green' : 'error'}>
                {usernameAvailable ? 'Username available' : 'Username already taken'}
              </Typography>
            )}

            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Email"
              name="email"
              value={editedProfile.email || ''}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Date of Birth"
              name="dob"
              type="date"
              placeholder='Date of birth'
              value={editedProfile.dob || ''}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
                shrink: true,
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter new password'
              value={editedProfile.password || ''}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button style={buttonStyles.cancelButton} onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button style={buttonStyles.saveButton} onClick={handleSaveProfile}>
              Save
            </Button>
          </DialogActions>
        </CustomDialog>
      </CustomRootContainer>
    </ThemeProvider>
  );
};

export default UserDashboard;

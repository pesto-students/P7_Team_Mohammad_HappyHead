import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, CardActions, Dialog, DialogTitle, DialogContent, TextField, InputAdornment, IconButton, DialogActions, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RootContainer from '../../styles/RootContainerStyles';
import SectionContainer from '../../styles/SectionsContainer';
import SubText from '../../styles/SubTextStyles';
import theme from '../../styles/theme';
import Loader from '../../styles/Loader';
import messages from './messages';
import Image from 'next/image'

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
  paddingTop: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

// Styled component for the cards 
const cardActionsStyles = {
  justifyContent: 'center',
  marginBottom: '1rem',
};

// Styled component for the popup dialog box
const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiInputLabel-outlined': {
    color: theme.palette.text.primary, // Apply theme.palette.text.primary color to label text
  },
  '&.Mui-focused fieldset': {
    borderColor: theme.palette.text.primary, // Apply theme.palette.text.primary color to outline border when focused
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
  width: '100%',
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
  const { expertname } = router.query;

  // State variables
  const [expertProfile, setExpertProfile] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...expertProfile, password: '' }); // Initialize with empty password
  const [showPassword, setShowPassword] = useState(false);
  const [originalExpertname, setOriginalExpertname] = useState(''); // New state variable for storing the original username
  const [expertnameAvailable, setExpertnameAvailable] = useState(); // State variable for username availability


  // Open the profile edit dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEditedProfile(expertProfile ? { ...expertProfile } : {});
  };

  // Close the profile edit dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    // Fetch expert profile data when the component mounts and expertname changes
    const getExpertProfile = async () => {
      try {
        const response = await fetch(`/api/experts/dashboard/${expertname}`);
        const expertProfile = await response.json();
        setExpertProfile(expertProfile);
        setEditedProfile(expertProfile);
        setOriginalExpertname(expertname);
      } catch (error) {
        console.error('Failed to fetch expert profile', error);
      }
    };
    getExpertProfile();
  }, [expertname]);

  // Save the edited profile
  const handleSaveProfile = async () => {
    try {
      // Fetch the user profile with the new username
      const res = await fetch(`/api/experts/dashboard/${editedProfile.expertname}`);
      const existingExpert = await res.json();

      // Check if the username already exists and it belongs to a different user
      if (existingExpert && existingExpert.expertname !== originalExpertname) {
        console.error('Expertname already exists');
        alert('Expertname already exists, try something else.');
        return; // Stop execution and display an error message
      }

      const response = await fetch(`/api/experts/dashboard/${expertname}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldExpertname: originalExpertname, editedProfile }),
      });
      if (response.ok) {
        setExpertProfile(editedProfile);
        setOpenDialog(false);
        router.push(`/experts/dashboard/${editedProfile.expertname}`);
      } else {
        console.error('Failed to update expert profile');
      }
    } catch (error) {
      console.error('Failed to update expert profile', error);
    }
  };

  // Handle input change in the profile edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Check username availability when Check Availability button is clicked
  const handleCheckAvailability = async () => {
    const { expertname } = editedProfile;
    const response = await fetch(`/api/experts/${expertname}`);
    const result = await response.json();
    console.log(result)
    setExpertnameAvailable(result.available);
  };

  // To generate random welcome messages for the user
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  if (!expertProfile) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        {/* Expert profile component */}
        <CustomSectionContainer>
          <Image
            src="/images/dashboard/bee.png"
            alt="happy-bee"
            width={125}
            height={125}
          />
          {expertProfile && (
            <CustomTitle component="h2">Hey there, {expertProfile.name}!</CustomTitle>
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
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              name="name"
              value={editedProfile.name || ''}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />
            <TextField
              margin="dense"
              label="Username"
              type="text"
              name="expertname"
              value={editedProfile.expertname || ''}
              onChange={handleInputChange}
              fullWidth
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
            {expertnameAvailable !== null && expertnameAvailable !== undefined && (
              <Typography variant="caption" color={expertnameAvailable ? 'green' : 'error'}>
                {expertnameAvailable ? 'Expertname available' : 'Expertname already taken'}
              </Typography>
            )}

            <TextField
              margin="dense"
              label="Email"
              type="email"
              name="email"
              value={editedProfile.email || ''}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={editedProfile.phoneNumber || ''}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />
            <TextField
              margin="dense"
              label="Qualifications"
              type="text"
              name="qualifications"
              value={editedProfile.qualifications || ''}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />
            <TextField
              margin="dense"
              label="Years of Experience"
              type="number"
              name="yearsOfExperience"
              value={editedProfile.yearsOfExperience || ''}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />
            <TextField
              margin="dense"
              label="Speciality"
              type="text"
              name="speciality"
              value={editedProfile.speciality || ''}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />
            <TextField
              margin="dense"
              label="Consultation Fee"
              type="number"
              name="consultationFee"
              value={editedProfile.consultationFee || ''}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
              }}
              InputProps={{
                style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
              }}
            />
            <TextField
              margin="dense"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder='Enter new password'
              value={editedProfile.password || ''}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                style: { color: 'black' }, // Set the label text color to black
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* Toggle password visibility */}
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

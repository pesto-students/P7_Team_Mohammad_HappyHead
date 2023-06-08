import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, CardActions, Dialog, DialogTitle, DialogContent, TextField, InputAdornment, IconButton, DialogActions, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RootContainer from '../../styles/RootContainerStyles';
import IconContainer from '../../styles/IconContainerStyles'
import SectionContainer from '../../styles/SectionsContainer';
import SubText from '../../styles/SubTextStyles';
import theme from '../../styles/theme';
import Loader from '../../styles/Loader';
import messages from './messages'

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
        backgroundColor: theme.palette.secondary.main,
    },
    '& .MuiInputLabel-outlined': {
        color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.text.primary,
            color: theme.palette.text.primary,
        },
        '& .MuiDialogTitle-root': {
            color: theme.palette.text.primary,
        },
        '& .MuiDialogLabel-root': {
            color: theme.palette.text.primary,
        },
    },
}));

// Styled component for the IconContainer with styled icons
const StyledImg = styled(IconContainer)(() => ({
    '& img': {
        width: '8rem',
        height: '8rem',
        marging: '0',
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
    const { username } = router.query;
    // State variables
    const [userProfile, setUserProfile] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...userProfile, password: '' }); // Initialize with empty password
    const [showPassword, setShowPassword] = useState(false);

    // Open the profile edit dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
        setEditedProfile({ ...userProfile });
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
            } catch (error) {
                console.error('Failed to fetch user profile', error);
            }
        }
        getUserProfile();
    }, [username]);

    // Save the edited profile
    const handleSaveProfile = async () => {
        try {
            const response = await fetch(`/api/users/dashboard/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProfile),
            });
            if (response.ok) {
                setUserProfile(editedProfile);
                setOpenDialog(false);
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
        } else {
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
                    <StyledImg>
                        <img src="/images/dashboard/bee.png" alt="happy-bee" />
                    </StyledImg>
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
                            value={editedProfile.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Username"
                            name="username"
                            value={editedProfile.username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={editedProfile.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={editedProfile.dob}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={editedProfile.password}
                            onChange={handleInputChange}
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

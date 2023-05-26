import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Button, Dialog, DialogTitle, DialogContent, TextField, InputAdornment, IconButton, DialogActions } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RootContainer from '../../styles/RootContainerStyles';
import ContentContainer from '../../styles/ContentContainerStyles';
import theme from '../../styles/theme';
import { redirectToPage } from '../../../utils/redirect';
// import { toolsData } from '../../Users/userDashboard/toolsData';

import UserProfile from './UserProfile';
import ToolCard from './ToolCard';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

const CustomContentContainer = styled(ContentContainer)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '2rem',
    [theme.breakpoints.up('lg')]: {
        padding: '4rem',
    },
}));

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
        '& .MuiDialogTitle-root': {
            color: theme.palette.text.primary,
        },
    },
}));

// Button styles for cancel and save buttons
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
    const router = useRouter();
    const { username } = router.query;
    // State variables
    const [userProfile, setUserProfile] = useState();

    const [openDialog, setOpenDialog] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...userProfile });
    // const [showPassword, setShowPassword] = useState(false);

    const toolsData = [
        {
            name: 'You Mental Health Report',
            subtext:
                'Answer a few questions related to your stressors & lifestyle and get personalized insights and recommendations',
            path: '/users/questionnaire',
        },
        {
            name: 'Connect with Experts',
            subtext:
                'Get personalized guidance and support from certified professionals to address your mental health concerns effectively.',
            path: '/users/connect-with-experts',
        },
        {
            name: 'Guided Practice Tools',
            subtext: `Discover effective relaxation techniques and practices to enhance your well-being and find inner calm amidst life's challenges.`,
            path: `/users/practicetools/${username}`,
        },
    ];

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
    }, [ username]);

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

    // // Toggle password visibility
    // const handleTogglePassword = () => {
    //     setShowPassword((prevShowPassword) => !prevShowPassword);
    // };

    // Handle click on a tool card
    const handleCardClick = (tool) => {
            console.log(`Redirecting to ${tool.path}`);
            redirectToPage(tool.path);
    };
    if (!userProfile) {
        return <div>Loading...</div>;
    }
    return (
        <ThemeProvider theme={theme}>
            {/* Custom styled root container */}
            <CustomRootContainer>
                {/* Custom styled content container */}
                <CustomContentContainer>
                    <Grid container spacing={2}>
                        {/* User profile component */}
                        <UserProfile userProfile={userProfile} handleOpenDialog={handleOpenDialog} />

                        {/* Tool cards */}
                        <Grid item xs={12} lg={8} container spacing={2}>
                            {toolsData.map((tool, index) => (
                                <ToolCard
                                    key={index}
                                    tool={tool}
                                    handleCardClick={handleCardClick}
                                    isLoggedIn={isLoggedIn}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </CustomContentContainer>
            </CustomRootContainer>

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
                    {/* <TextField
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
                    /> */}
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
        </ThemeProvider>
    );
};


export default UserDashboard;

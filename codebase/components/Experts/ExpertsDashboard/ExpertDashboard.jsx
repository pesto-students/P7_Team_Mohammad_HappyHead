import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Button, Dialog, DialogTitle, DialogContent, TextField, InputAdornment, IconButton, DialogActions, Paper } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RootContainer from '../../styles/RootContainerStyles';
import ContentContainer from '../../styles/ContentContainerStyles';
import theme from '../../styles/theme';
import ExpertProfile from './ExpertProfile';
import AvailabilityForm from './AvailabilityForm';


// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '2rem',
    [theme.breakpoints.up('lg')]: {
        padding: '4rem',
    },
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
        '& .MuiDialogLabel-root': {
            color: theme.palette.text.primary,
        },
    },
}));

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

const ExpertsDashboard = ({ isLoggedIn }) => {
    const router = useRouter();
    const { expertname } = router.query;
    const [expertProfile, setExpertProfile] = useState();

    const [openDialog, setOpenDialog] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...expertProfile });
    const [showPassword, setShowPassword] = useState(false);

    // Open the profile edit dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
        setEditedProfile({ ...expertProfile });
    };

    // Close the profile edit dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        // Fetch expert profile data when the component mounts and expertname changes
        const getExpertProfile = async () => {
            try {
                const response = await fetch(`/api/experts/dashboard/${expertname}`)
                const expertProfile = await response.json();
                setExpertProfile(expertProfile);
                setEditedProfile(expertProfile);
            } catch (error) {
                console.error('Failed to fetch expert profile', error);
            }
        }
        getExpertProfile();
    }, [expertname]);

    // Save the edited profile
    const handleSaveProfile = async () => {
        try {
            const response = await fetch(`/api/experts/dashboard/${expertname}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProfile),
            });
            if (response.ok) {
                setExpertProfile(editedProfile);
                setOpenDialog(false);
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

    if (!expertProfile) {
        return <div>Loading...</div>;
    }
    return (

        <ThemeProvider theme={theme}>
            <CustomRootContainer>
                <Grid container spacing={2}>
                    {/* Expert profile component */}
                    <Grid item xs={12} lg={6} sx={{  marginBottom: { xs: '2rem', lg: '0' }}}>
                        <ExpertProfile expertProfile={expertProfile} handleOpenDialog={handleOpenDialog} />
                    </Grid>

                    {/*  Availability form component */}
                    <Grid item xs={12} lg={6} sx={{ marginBottom: { xs: '2rem', lg: '0' } }}>
                        <AvailabilityForm />
                    </Grid>
                </Grid>
            </CustomRootContainer>


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
                        value={editedProfile.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        name="username"
                        value={editedProfile.expertname}
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
                        label="Phone Number"
                        type="tel"
                        name="phoneNumber"
                        value={editedProfile.phoneNumber}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Qualifications"
                        type="text"
                        name="qualifications"
                        value={editedProfile.qualifications}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Years of Experience"
                        type="number"
                        name="yearsOfExperience"
                        value={editedProfile.yearsOfExperience}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Speciality"
                        type="text"
                        name="speciality"
                        value={editedProfile.speciality}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Consultation Fee"
                        type="number"
                        name="consultationFee"
                        value={editedProfile.consultationFee}
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
                    {/* Cancel button */}
                    <Button onClick={handleCloseDialog} style={buttonStyles.cancelButton}>
                        Cancel
                    </Button>
                    {/* Save button */}
                    <Button onClick={handleSaveProfile} style={buttonStyles.saveButton}>
                        Save
                    </Button>
                </DialogActions>
            </CustomDialog>
        </ThemeProvider>
    );
};

export default ExpertsDashboard;
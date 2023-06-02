import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles'
import theme from '../../../styles/theme'
import { ThemeProvider, styled } from '@mui/system';
import {redirectToPage} from '../../../../utils/redirect'

// Styled component for the custom content container
const CustomContentContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '1rem 8rem',
    minHeight: '60vh',
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 1.5rem 2rem',
    },
}));

// Styled component for the grid container
const GridContainer = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },
}));

// Styled component for the left column
const LeftColumn = styled('div')(({ theme }) => ({
    alignSelf: 'start',
}));

// Styled component for the right column
const RightColumn = styled('div')(({ theme }) => ({
    alignSelf: 'start',
}));

// Styled component for the button
const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    // color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.tertiary.main, // Set the desired hover background color
        color: theme.palette.getContrastText(theme.palette.primary.contrastText), // Set the desired hover text color
      },
    }));

const BookSlot = () => {
    const router = useRouter();
    const { username, expertname, availability, slot } = router.query;
    const [expertProfile, setExpertProfile] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);


    useEffect(() => {
        const fetchExpert = async () => {
            try {
                const response = await fetch(`/api/users/connect/${expertname}`);
                const data = await response.json();
                setExpertProfile(data);
            } catch (error) {
                console.error('Error fetching experts:', error);
            }
        };
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/dashboard/${username}`);
                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchExpert();
        fetchUser();
    }, [expertname, username]);



    const parsedAvailability = availability ? JSON.parse(availability) : null;
    const parsedSlot = slot ? JSON.parse(slot) : null;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const phoneNumber = e.target.elements.phoneNumber.value;
        // Validate phone number format
        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumber.match(phoneNumberRegex)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
        try {
            const response = await fetch(`/api/users/dashboard/${username}`);
            const data = await response.json();
            setUserDetails(data);

            const updatedExpertProfile = {
                ...expertProfile,
                availability: expertProfile.availability.map((day) => {
                    if (day.date === parsedAvailability.date) {
                        return {
                            ...day,
                            timeSlots: day.timeSlots.map((timeSlot) => {
                                if (
                                    timeSlot.startTime === parsedSlot.startTime &&
                                    timeSlot.endTime === parsedSlot.endTime
                                ) {
                                    return {
                                        ...timeSlot,
                                        booked: true,
                                        user: {
                                            name: userDetails.name,
                                            phoneNumber: phoneNumber,
                                        },
                                    };
                                }
                                return timeSlot;
                            }),
                        };
                    }
                    return day;
                }),
            };
            const updatedUserProfile = {
                ...userDetails,
                bookedSlots: [
                    {
                        day: parsedAvailability.day,
                        date: parsedAvailability.date,
                        startTime: parsedSlot.startTime,
                        endTime: parsedSlot.endTime,
                        booked: true,
                        user: {
                            name: expertProfile.name,
                            phoneNumber: expertProfile.phoneNumber,
                        },
                    },
                ],
            };

            setExpertProfile(updatedExpertProfile);
            setUserDetails(updatedUserProfile);

            try {
                const response = await fetch(`/api/users/connect/${expertname}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedExpertProfile),
                });

                if (response.ok) {
                    console.log('Expert profile updated successfully');
                } else {
                    console.error('Failed to update expert profile');
                    // Display an error message
                }
            } catch (error) {
                console.error('Error updating expert profile:', error);
                // Display an error message
            }

            try {
                // Update user's profile with booking details
                const response = await fetch(`/api/users/connect/booking/${username}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUserProfile),
                });

                if (response.ok) {
                    console.log('User profile updated successfully');
                    setBookingConfirmed(true); // Set booking confirmed state to true
                } else {
                    console.error('Failed to update user profile');
                    // Display an error message
                }
            } catch (error) {
                console.error('Error updating user profile:', error);
                // Display an error message
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            // Display an error message
        }
    };

    const handleCloseDialog = () => {
        setBookingConfirmed(false); // Reset booking confirmed state
        redirectToPage(`/users/dashboard/${username}`);  // Assuming you have a function to redirect to a success page
    };

    return (
        <ThemeProvider theme={theme}>
            <CustomContentContainer>
                <h1>Appointment Booking</h1>
                <GridContainer>
                    <LeftColumn>
                        {expertProfile ? (
                            <>
                                <h2>{expertProfile.name}</h2>
                                <Typography variant="subtitle1"><strong>Experience:</strong> {expertProfile.yearsOfExperience} years</Typography>
                                <Typography variant="subtitle1"><strong>Qualifications:</strong> {expertProfile.qualifications}</Typography>
                                <Typography variant="subtitle1"><strong>Speciality:</strong> {expertProfile.speciality}</Typography>
                                <Typography variant="subtitle1"><strong>Consultation Fee:</strong> ₹{Math.floor(expertProfile.consultationFee)}</Typography>
                                {/* <p>Qualifications: {expertProfile.qualifications}</p>
                <p>Experience: {expertProfile.yearsOfExperience}</p>
                <p>Consultation Fee: {expertProfile.consultationFee}</p> */}
                            </>
                        ) : (
                            <p>Loading expert profile...</p>
                        )}
                    </LeftColumn>
                    <RightColumn>
                        <h2>Selected Slot Details</h2>
                        {parsedAvailability ? (
                            <>
                                <Typography variant="subtitle1">
                                    <strong> Date:</strong>{' '}
                                    {new Date(parsedAvailability.date).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong> Time: </strong>{parsedSlot.startTime} - {parsedSlot.endTime}
                                </Typography>
                            </>
                        ) : (
                            <p>Loading slot details...</p>
                        )}

                        <h2>Confirm Booking</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone Number"
                                variant="outlined"
                                required
                                fullWidth
                                inputProps={{
                                    maxLength: 10,
                                }}
                                sx={{
                                    width: { xs: '90%', sm: '90%', md: '70%', lg: '60%', xl: '50%' },
                                    '& .MuiFormLabel-root': {
                                        color: theme.palette.text.primary, // Set the label color to red (change it to your desired color)
                                    },
                                }}
                            />
                            <ButtonWrapper color='primary'>
                                <StyledButton type="submit">Confirm Booking</StyledButton>
                            </ButtonWrapper>
                        </form>
                    </RightColumn>
                </GridContainer>

                {/* Dialog to show booking confirmation */}
                <Dialog open={bookingConfirmed} onClose={handleCloseDialog}>
                    <DialogTitle>Booking Confirmed!</DialogTitle>
                    <DialogContent>
                        <p>Your booking has been confirmed.</p>
                        {/* Additional confirmation details */}
                    </DialogContent>
                    <DialogActions>
                        <StyledButton onClick={handleCloseDialog}>Close</StyledButton>
                    </DialogActions>
                </Dialog>
            </CustomContentContainer>
        </ThemeProvider>

    );
};

export default BookSlot;

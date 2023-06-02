import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles'
import theme from '../../../styles/theme'
import { ThemeProvider, styled } from '@mui/system';

// Styled component for the custom content container
const CustomContentContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '1rem 8rem',
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 1.5rem',
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

    

    const parsedAvailability = JSON.parse(availability ?? '');
    const parsedSlot = JSON.parse(slot ?? '');

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const phoneNumber = e.target.elements.phoneNumber.value;

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
                            phoneNumber: expertProfile,phoneNumber,
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
        // redirectToPage('/success'); // Assuming you have a function to redirect to a success page
    };

    return (
        <div>
            <h1>Expert Profile</h1>
            {expertProfile ? (
                <>
                    <h2>{expertProfile.name}</h2>
                    <p>Qualifications: {expertProfile.qualifications}</p>
                    <p>Experience: {expertProfile.yearsOfExperience}</p>
                    <p>Consultation Fee: {expertProfile.consultationFee}</p>
                </>
            ) : (
                <p>Loading expert profile...</p>
            )}

            <h2>Selected Slot Details</h2>
            {parsedAvailability ? (
                <>
                    <p>
                        Date:{' '}
                        {new Date(parsedAvailability.date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                    <p>
                        Time: {parsedSlot.startTime} - {parsedSlot.endTime}
                    </p>
                </>
            ) : (
                <p>Loading slot details...</p>
            )}

            <h2>Confirm Booking</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" name="phoneNumber" required />
                <button type="submit">Confirm Booking</button>
            </form>

            {/* Dialog to show booking confirmation */}
            <Dialog open={bookingConfirmed} onClose={handleCloseDialog}>
                <DialogTitle>Booking Confirmed!</DialogTitle>
                <DialogContent>
                    <p>Your booking has been confirmed.</p>
                    {/* Additional confirmation details */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BookSlot;

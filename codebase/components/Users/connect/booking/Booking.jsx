import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import {
//     Box,
//     Button,
//     Card,
//     CardContent,
//     Grid,
//     Typography,
//     useMediaQuery,
// } from '@mui/material';
// import ButtonWrapper from '../../../styles/ButtonWrapperStyles';
// import theme from '../../../styles/theme';
// import { ThemeProvider, styled } from '@mui/system';
// import redirectToPage from '../../../../utils/redirect'

const BookSlot = () => {
    const router = useRouter();
    const { username, expertname, availability, slot } = router.query;
    // console.log(router.query)
    // console.log(availability, slot);
    const [expertProfile, setExpertProfile] = useState(null);

    useEffect(() => {
        fetchExperts();
    }, []);

    const fetchExperts = async () => {
        try {
            const response = await fetch(`/api/users/connect/${expertname}`);
            const data = await response.json();
            // console.log(data)
            setExpertProfile(data);
        } catch (error) {
            console.error('Error fetching experts:', error);
        }
    };


    // Parse the updatedAvailability string back into an object
    const parsedAvailability = JSON.parse(availability);
    const parsedSlot = JSON.parse(slot);





    const handleSubmit = async (e) => {
        e.preventDefault();
        const phoneNumber = e.target.elements.phoneNumber.value;
        const additionalInfo = e.target.elements.additionalInfo.value;

        // Update the expert profile object
        const updatedExpertProfile = {
            ...expertProfile,
            phoneNumber,
            additionalInfo,
            updatedAvailability: {
                ...parsedSlot,
                booked: true,
            },
        };

        try {
            const response = await fetch(`/api/users/connect/${expertname}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExpertProfile),
            });

            if (response.ok) {
                // Handle success
                console.log('Expert profile updated successfully');
                // Redirect or display a success message
                redirectToPage('/success'); // Assuming you have a function to redirect to a success page
            } else {
                // Handle error
                console.error('Failed to update expert profile');
                // Display an error message
            }
        } catch (error) {
            console.error('Error updating expert profile:', error);
            // Display an error message
        }
    };


    return (
        <div>
            <h1>Expert Profile</h1>
            {expertProfile ? (
                <>
                    <h2>{expertProfile.name}</h2>
                    <p>Qualifications: {expertProfile.qualifications}</p>
                    <p>Experience: {expertProfile.experience}</p>
                    <p>Consultation Fee: {expertProfile.consultationFee}</p>
                </>
            ) : (
                <p>Loading expert profile...</p>
            )}

            <h2>Selected Slot Details</h2>
            {parsedAvailability ? (
                <>
                    <p>Date: {new Date(parsedAvailability.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}</p>
                    <p>Time: {parsedSlot.startTime} - {parsedSlot.endTime}</p>
                </>
            ) : (
                <p>Loading slot details...</p>
            )}
            <h2>Confirm Booking</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" name="phoneNumber" required />

                <label htmlFor="additionalInfo">Additional Information:</label>
                <textarea id="additionalInfo" name="additionalInfo"></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BookSlot


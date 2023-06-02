import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled, ThemeProvider } from '@mui/system';
import { Typography } from '@mui/material';
import RootContainer from '../../styles/RootContainerStyles';
import ContentContainer from '../../styles/ContentContainerStyles';
import TextStyle from '../../styles/SubTextStyles'
import theme from '../../styles/theme';

// Custom styled component for the container
const CustomContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.tertiary.main, 
    padding: '2rem',
}));

const CustomList = styled('ul')({
    listStyleType: 'none', 
    padding: 0,
});

const CustomListItem = styled('li')({
    display: 'inline-block',
    border: '0.2rem solid white',
    background: 'transparent',
    padding: '1rem',
    marginBottom: '1rem',
  });

const UpcomingAppointments = () => {
    const router = useRouter();
    const { username } = router.query;
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`/api/users/dashboard/${username}`);
                const data = await response.json();

                const bookedSlots = data.bookedSlots || [];
                const filteredAppointments = bookedSlots.filter(slot => {
                    const appointmentDate = new Date(slot.date);
                    const currentDate = new Date();
                    return appointmentDate > currentDate;
                });
                console.log(filteredAppointments)
                setUpcomingAppointments(filteredAppointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        if (username) {
            fetchAppointments();
        }
    }, [username]);

    const noAppointmentsMessage = <p>No upcoming appointments</p>;

    return (
        <ThemeProvider theme={theme}>
            <CustomContainer>
                <h2>Upcoming Appointments</h2>
                {upcomingAppointments.length === 0 ? (
                    noAppointmentsMessage
                ) : (
                    <CustomList>
                        {upcomingAppointments.map(appointment => (
                            <CustomListItem key={appointment.date}>
                                <TextStyle><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}</TextStyle>
                                <TextStyle><strong>Time: </strong>{appointment.startTime} - {appointment.endTime}</TextStyle>
                                <TextStyle><strong>Expert Name:</strong> {appointment.user.name}</TextStyle>
                                <TextStyle><strong>Expert Phone Number:</strong> {appointment.user.phoneNumber}</TextStyle>
                            </CustomListItem>
                        ))}
                    </CustomList>
                )}

            </CustomContainer>

        </ThemeProvider>

    );
};

export default UpcomingAppointments;

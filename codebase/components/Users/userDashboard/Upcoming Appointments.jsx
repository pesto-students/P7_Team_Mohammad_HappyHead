import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled, ThemeProvider } from '@mui/system';
import { Typography } from '@mui/material';
import TextStyle from '../../styles/SubTextStyles';
import theme from '../../styles/theme';

// Custom styled component for the container
const CustomContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.tertiary.main,
  padding: '2rem',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '7rem',
  },
}));

const CustomList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
});

const CustomListItem = styled('li')({
  display: 'inline-block',
  border: '0.2rem solid white',
  borderRadius: '8px',
  background: 'transparent',
  padding: '1rem',
  marginBottom: '1rem',
  [theme.breakpoints.up('lg')]: {
    marginRight: '2rem',
  },
});

const Heading = styled('h2')(({ theme }) => ({
  textAlign: 'center',
  paddingBottom: '1rem',
  [theme.breakpoints.up('lg')]: {
    textAlign: 'left',
  },
}));

const LoadingState = styled('p')({
  textAlign: 'center',
  fontSize: '1.2rem',
});

const UpcomingAppointments = () => {
  const router = useRouter();
  const { username } = router.query;
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      
        setUpcomingAppointments(filteredAppointments);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setIsLoading(false);
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
        <Heading>Upcoming Appointments</Heading>
        {isLoading ? (
          <LoadingState>Loading appointments...</LoadingState>
        ) : upcomingAppointments.length === 0 ? (
          noAppointmentsMessage
        ) : (
          <CustomList>
            {upcomingAppointments.map((appointment, index) => (
              <CustomListItem key={`${appointment.date}-${index}`}>
                <TextStyle>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TextStyle>
                <TextStyle>
                  <strong>Time:</strong> {appointment.startTime} - {appointment.endTime}
                </TextStyle>
                <TextStyle>
                  <strong>Expert Name:</strong> {appointment.user.name}
                </TextStyle>
                <TextStyle>
                  <strong>Expert Phone Number:</strong> {appointment.user.phoneNumber}
                </TextStyle>
              </CustomListItem>
            ))}
          </CustomList>
        )}
      </CustomContainer>
    </ThemeProvider>
  );
};

export default UpcomingAppointments;

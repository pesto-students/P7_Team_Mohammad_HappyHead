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
    width: '30%',
    paddingLeft: '1rem',
  },
  width: '95%',
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
  const { expertname } = router.query;
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/experts/availability/${expertname}`);
        const data = await response.json();
        console.log(data);

        const availability = data.availability || [];
        const expertAvailability = availability.reduce((slots, day) => {
          const timeSlots = day.timeSlots.filter((slot) => slot.booked);
          if (timeSlots.length > 0) {
            const currentDate = new Date().setHours(0, 0, 0, 0);
            const filteredSlots = timeSlots.filter((slot) => {
              const appointmentDate = new Date(day.date).setHours(0, 0, 0, 0);
              return appointmentDate >= currentDate;
            });
            if (filteredSlots.length > 0) {
              slots.push({
                day: day.day,
                date: day.date,
                timeSlots: filteredSlots,
              });
            }
          }
          return slots;
        }, []);

        console.log(expertAvailability);
        setUpcomingAppointments(expertAvailability);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setIsLoading(false);
      }
    };

    if (expertname) {
      fetchAppointments();
    }
  }, [expertname]);

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
            {upcomingAppointments.map((appointment) =>
              appointment.timeSlots
                .filter((slot) => slot.booked)
                .map((slot) => (
                  <CustomListItem key={`${appointment.date}-${slot.startTime}`}>
                    <TextStyle style={{ whiteSpace: 'nowrap' }}>
                      <strong>Date:</strong>{' '}
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </TextStyle>
                    <TextStyle>
                      <strong>Day:</strong> {appointment.day}
                    </TextStyle>
                    <TextStyle>
                      <strong>Time:</strong> {slot.startTime} - {slot.endTime}
                    </TextStyle>
                    <TextStyle>
                      <strong>Patient's Details:</strong>
                    </TextStyle>
                    <TextStyle>
                      <strong>Name:</strong> {slot.user.name}
                    </TextStyle>
                    <TextStyle>
                      <strong>Contact:</strong> {slot.user.phoneNumber}
                    </TextStyle>
                  </CustomListItem>
                ))
            )}
          </CustomList>
        )}
      </CustomContainer>
    </ThemeProvider>
  );
};

export default UpcomingAppointments;

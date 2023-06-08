import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled, ThemeProvider } from '@mui/system';
import { Typography, Card, CardContent } from '@mui/material';
import RootContainer from '../../styles/RootContainerStyles';
import IconContainer from '../../styles/IconContainerStyles';
import theme from '../../styles/theme';
import Loader from '../../styles/Loader';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(() => ({
  padding: '1rem 2rem 2rem 2rem',
}));

const CustomCard = styled(Card)(({ theme, cardColor }) => ({
  backgroundColor: cardColor,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '60vw',
    padding: '0 2rem',
  },
  margin: '0.5rem',
  borderRadius: '8px',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    transform: 'scale(1.02)',
  },
}));

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },
}));

// Styled component for the IconContainer with styled icons
const StyledIconContainer = styled(IconContainer)(() => ({
  '& img': {
    width: '10rem',
    height: '10rem',
  },
}));

const CustomTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  fontWeight: '70pt',
  fontSize: theme.typography.h3.fontSize,
  padding: '1rem 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

const SubText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h2.fontFamily,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  fontSize: '1.2rem',
}));

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

    // Define an array of colors
    const cardColors = [
      theme.palette.tertiary.main,
      theme.palette.secondary.main,
      theme.palette.quinary.main,
    ];

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <Loader />
      ) : (
        <CustomRootContainer>
          <CustomTitle>Upcoming Appointments</CustomTitle>
          {upcomingAppointments.length === 0 ? (
            noAppointmentsMessage
          ) : (
            <>
              {upcomingAppointments.map((appointment, index) =>
                appointment.timeSlots
                  .filter((slot) => slot.booked)
                  .map((slot, slotIndex) => (
                    <CustomCard
                      key={`${appointment.date}-${slot.startTime}-${slotIndex}`}
                      cardColor={cardColors[(index * 3 + slotIndex) % cardColors.length]}
                    >
                      <CustomCardContent>
                        <StyledIconContainer>
                          <img src="/images/dashboard/appointment.png" alt="appointment" />
                        </StyledIconContainer>
                        <div>
                        {/* Slot details */}
                          <SubText style={{ whiteSpace: 'nowrap' }}>
                            <strong>Date:</strong>{' '}
                            {new Date(appointment.date).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </SubText>
                          <SubText>
                            <strong>Day:</strong> {appointment.day}
                          </SubText>
                          <SubText>
                            <strong>Time:</strong> {slot.startTime} - {slot.endTime}
                          </SubText>
                            {/* Patient details */}
                          <SubText>
                            <strong>{`Patient's Details:`}</strong>
                          </SubText>
                          <SubText>
                            <strong>Name:</strong> {slot.user.name}
                          </SubText>
                          <SubText>
                            <strong>Contact:</strong> {slot.user.phoneNumber}
                          </SubText>
                        </div>
                      </CustomCardContent>
                    </CustomCard>
                  ))
              )}
            </>
          )}
        </CustomRootContainer>
      )}
    </ThemeProvider>
  );
};

export default UpcomingAppointments;

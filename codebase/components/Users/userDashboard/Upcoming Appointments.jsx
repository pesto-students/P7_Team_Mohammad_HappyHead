import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled, ThemeProvider } from '@mui/system';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import RootContainer from '../../styles/RootContainerStyles';
import SectionContainer from '../../styles/SectionsContainer';
import IconContainer from '../../styles/IconContainerStyles';
import TextStyle from '../../styles/SubTextStyles';
import theme from '../../styles/theme';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem 2rem 2rem',
}));

const CustomCard = styled(Card)(({ theme, cardColor }) => ({
  backgroundColor: cardColor,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '60vw',
    padding: '0 2rem',
  },
  margin: '0.5rem',
  borderRadius: '8px',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Update with desired box shadow style
    transform: 'scale(1.02)', // Update with desired transformation
  },
}));

const CustomCardContent = styled(CardContent)(({ theme, cardColor }) => ({
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
}))

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
        const filteredAppointments = bookedSlots.filter((slot) => {
          const appointmentDate = new Date(slot.date);
          const currentDate = new Date();
          return appointmentDate > currentDate;
        });

        setUpcomingAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    if (username) {
      fetchAppointments();
    }
  }, [username]);

  // Define an array of colors
  const cardColors = [
    theme.palette.tertiary.main,
    theme.palette.secondary.main,
    theme.palette.quinary.main,
  ];

  const noAppointmentsMessage = <p>No upcoming appointments</p>;

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
      <CustomTitle> Upcoming Appointments</CustomTitle>
        {upcomingAppointments.length === 0 ? (
          noAppointmentsMessage
        ) : (
          <>
            {upcomingAppointments.map((appointment, index) => (
              <CustomCard
                cardColor={cardColors[index % cardColors.length]}
                key={`${appointment.date}-${index}`}>
                <CustomCardContent>
                  <StyledIconContainer>
                    <img src="/images/dashboard/appointment.png" alt="appointment" />
                  </StyledIconContainer>

                  <div>
                    <SubText>
                      <strong>Date:</strong>{' '}
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </SubText>
                    <SubText>
                      <strong>Time:</strong> {appointment.startTime} - {appointment.endTime}
                    </SubText>
                    <SubText>
                      <strong>Expert Name:</strong> {appointment.user.name}
                    </SubText>
                    <SubText>
                      <strong>Expert Phone Number:</strong> {appointment.user.phoneNumber}
                    </SubText>
                  </div>
                </CustomCardContent>
              </CustomCard>

            ))}
          </>
        )}
      </CustomRootContainer>
    </ThemeProvider>
  );
};

export default UpcomingAppointments;

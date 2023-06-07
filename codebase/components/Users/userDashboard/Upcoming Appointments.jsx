import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled, ThemeProvider } from '@mui/system';
import { Typography, Card, CardContent } from '@mui/material';
import RootContainer from '../../styles/RootContainerStyles';
import SectionContainer from '../../styles/SectionsContainer';
import IconContainer from '../../styles/IconContainerStyles';
import TextStyle from '../../styles/SubTextStyles';
import theme from '../../styles/theme';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '0 2rem 0',
}));

// Styled component for the main content container
const CustomSectionContainer = styled(SectionContainer)(({ theme }) => ({
  margin: '0 2rem',
  backgroundColor: theme.palette.primary.main,
  width: '100%',
}));

const CustomTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

const CustomCard = styled(Card)(({ theme, cardColor }) => ({
  backgroundColor: cardColor,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '80vw',
  },
  margin: '0.5rem',
  padding: '0 2rem',
  borderRadius: '8px',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Update with desired box shadow style
    transform: 'scale(1.02)', // Update with desired transformation
  },
}));

// Styled component for the IconContainer with styled icons
const StyledIconContainer = styled(IconContainer)(() => ({
  '& img': {
    width: '10rem',
    height: '10rem',
  },
}));

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
        <CustomTitle component="h2">Upcoming Appointments</CustomTitle>
        {upcomingAppointments.length === 0 ? (
          noAppointmentsMessage
        ) : (
          <CustomSectionContainer>
            {upcomingAppointments.map((appointment, index) => (
              <CustomCard
                key={`${appointment.date}-${index}`}
                cardColor={cardColors[index % cardColors.length]}
              >
                <StyledIconContainer>
                  <img src="/images/dashboard/appointment.png" alt="appointment" />
                </StyledIconContainer>
                <TextStyle>
                  <strong>Date:</strong>{' '}
                  {new Date(appointment.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
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
              </CustomCard>
            ))}
          </CustomSectionContainer>
        )}
      </CustomRootContainer>
    </ThemeProvider>
  );
};

export default UpcomingAppointments;

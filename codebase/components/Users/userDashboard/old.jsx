import React, { useEffect, useState } from 'react';
import { styled, ThemeProvider } from '@mui/system';
import { Typography, Card, CardContent, Divider, Button } from '@mui/material';
import RootContainer from '../../styles/RootContainerStyles';
import theme from '../../styles/theme';
import Loader from '../../styles/Loader';
import Image from 'next/image'
import { useSession } from 'next-auth/react';

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

const CustomCardContent = styled(CardContent)(({ theme, cardColor }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
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

const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.primary.main,
  },
}))

const UpcomingAppointments = () => {
  const sessionData = useSession();
  // console.log("User:", sessionData.data?.user);
  const [username, setUsername] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [expertProfile, setExpertProfile] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [bookingCancelled, setBookingCancelled] = useState(false);

  useEffect(() => {
    // Get username or expertname from the session object
    if (sessionData.data && sessionData.data?.user && sessionData.data.user?.image[1] === "user") {
      setUsername(sessionData.data.user.image?.[0]);
      // console.log('is user')
    }
  }, [sessionData]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/users/dashboard/${username}`);
        const data = await response.json();
        setUserDetails(data);
        const bookedSlots = data?.bookedSlots || [];
        console.log('bookedSlots', bookedSlots)
        const filteredAppointments = bookedSlots.filter((slot) => {
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
      console.log("Im refreshing")
      fetchAppointments();
    }
  }, [username, sessionData, bookingCancelled]);


  // Define an array of colors
  const cardColors = [
    theme.palette.tertiary.main,
    theme.palette.secondary.main,
    theme.palette.quinary.main,
  ];

  const noAppointmentsMessage = <p>No upcoming appointments</p>;

  // useEffect to fetch expert profile
  useEffect(() => {
    async function fetchDetailsAndProfile(phoneNumber) {
      try {
        const expertResponse = await fetch(`/api/users/cancelbooking/${phoneNumber}`);
        const expertData = await expertResponse.json();
        setExpertProfile(expertData);
      } catch (error) {
        console.error('Error fetching expert profile:', error);
      }
    }

    if (phoneNumber && appointment) {
      fetchDetailsAndProfile(appointment.user.phoneNumber);
    }
  }, [phoneNumber, appointment]);

  // useEffect to update user details and expert profile
  useEffect(() => {
    async function updateDetailsAndProfile() {
      console.log(userDetails)
      console.log(expertProfile)
      const updatedExpertProfile = {
        ...expertProfile,
        availability: expertProfile.availability.map((day) => {
          return {
            ...day,
            timeSlots: day.timeSlots.map((timeSlot) => {
              if (timeSlot.id === appointment.id) {
                return {
                  ...timeSlot,
                  id: "", // Remove the booking ID
                  booked: false,
                  user: {
                    name: "",
                    phoneNumber: "",
                  },
                };
              }
              return timeSlot;
            }),
          };
        }),
      };
      setExpertProfile(updatedExpertProfile);

      const updatedUserProfile = {
        ...userDetails,
        bookedSlots: userDetails.bookedSlots.filter((slot) => slot.id !== appointment.id),
      };
      setUsername(updatedUserProfile)
      console.log("updatedExpertProfile", updatedExpertProfile)
      
      try {
        // Update expert profile
        fetch(`/api/users/cancelbooking/${phoneNumber}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedExpertProfile),
        });

        // Update user profile
        fetch(`/api/users/connect/booking/${username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUserProfile),
        });

        // Set booking cancelled state
        setBookingCancelled(true);
      } catch (error) {
        console.error('Error updating profiles:', error);
      }
    }

    if (userDetails && expertProfile && appointment) {
      updateDetailsAndProfile();
      setphoneNumber(null);
      setAppointment(null);
      setBookingCancelled(false);
    }

  }, [userDetails, expertProfile, appointment]);

  // Function to handle canceling appointment
  const cancelAppointment = async (appointment) => {
    setphoneNumber(appointment.user.phoneNumber);
    setAppointment(appointment);
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <Loader />
      ) : (
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
                    <Image
                      src="/images/dashboard/appointment.png"
                      alt="appointment"
                      width={200}
                      height={200}
                    />
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
                      <Divider sx={{ backgroundColor: 'white', height: 2 }} /> {/* Modified divider */}
                      <SubText>
                        <strong>Expert Name:</strong> {appointment.user.name}
                      </SubText>
                      <SubText>
                        <strong>Expert Phone Number:</strong> {appointment.user.phoneNumber}
                      </SubText>
                      <CancelButton onClick={() => cancelAppointment(appointment)}>Cancel Appointment</CancelButton>
                    </div>
                  </CustomCardContent>
                </CustomCard>
              ))}
            </>
          )}
        </CustomRootContainer>
      )}
    </ThemeProvider>
  );
};

export default UpcomingAppointments;

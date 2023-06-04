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
  const { expertname } = router.query;
  const [expertAvailability, setExpertAvailability] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpertAvailability = async () => {
      try {      
        
        const response = await fetch(`/api/experts/availability/${expertname}`);
        const data = await response.json();
             // console.log(`recceived data ${data}`)
             
             const availability = data.availability || [];
             const expertAvailability = availability.filter(slot => {
               const appointmentDate = new Date(slot.date);
               const currentDate = new Date();
               return appointmentDate > currentDate;
             });
             console.log(expertAvailability);
             setExpertAvailability(expertAvailability);
             setIsLoading(false);
           } catch (error) {
             console.error('Error fetching availability:', error);
             setIsLoading(false);
           }
         };
     
         if (expertname) {
            fetchExpertAvailability();
         }
       }, [expertname]);
     
  const noUpcomingAvailability = <p>No upcoming availability</p>;

  return (
    <ThemeProvider theme={theme}>
      <CustomContainer>
        <Heading>Current Availability</Heading>
        {isLoading ? (
          <LoadingState>Loading Availability...</LoadingState>
        ) : expertAvailability.length === 0 ? (
          noUpcomingAvailability
        ) : (
          <CustomList>
            {expertAvailability.map((day) => (
              <CustomListItem key={day.date}>
                <TextStyle>
                  <strong>Date:</strong>{" "}
                  {new Date(day.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TextStyle>
                <TextStyle>
                  <strong>Time Slots:</strong>
                </TextStyle>
                <ul>
                  {day.timeSlots.map((slot) => (
                    <li key={slot.startTime}>
                      <TextStyle>
                        {slot.startTime} - {slot.endTime}
                      </TextStyle>
                    </li>
                  ))}
                </ul>
              </CustomListItem>
            ))}
          </CustomList>
        )}
      </CustomContainer>
    </ThemeProvider>
  );
};

export default UpcomingAppointments;

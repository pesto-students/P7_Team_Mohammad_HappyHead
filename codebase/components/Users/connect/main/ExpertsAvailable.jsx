import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, Typography, useMediaQuery } from '@mui/material';
import { ThemeProvider, styled } from '@mui/system';
import theme from '../../../styles/theme'
import RootContainer from '../../../styles/RootContainerStyles';
import Loader from '../../../styles/Loader';

// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  padding: '1rem 2rem 2rem 2rem',
}));

const CustomCard = styled(Card)(({ theme, cardColor }) => ({
  backgroundColor: cardColor,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '80vw',
  },
  margin: '0.5rem',
  borderRadius: '8px',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  fontWeight: 'bold',
  paddingBottom: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

const CustomDesc = styled(Typography)(({ theme }) => ({
  marginTop: '0.5rem',
  fontSize: theme.typography.body1.fontSize,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const CustomDialogContainer = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '2rem 1.5rem',
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '70%',
    maxWidth: 'none',
    backgroundColor: theme.palette.quinary.main,
  },
  [theme.breakpoints.up('md')]: {
    '& .MuiDialog-paper': {
      width: '30%',
    },
  },
}));

const StyledSlotButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.quinary.main}`,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.quinary.main,
    border: `1px solid ${theme.palette.quinary.main}`,
  },
}));


const ExpertsPage = () => {
  const router = useRouter();
  const sessionData  = useSession();
  const [username, setUsername] = useState(null);
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {    
    // Get username or expertname from the session object
    if (sessionData.data && sessionData.data?.user && sessionData.data.user?.image[1] === "user") {
      setUsername(sessionData.data.user.image?.[0]);
      // console.log('is user')
    }      
}, [sessionData]);

  // Define an array of colors
  const cardColors = [
    theme.palette.tertiary.main,
    theme.palette.secondary.main,
    theme.palette.quinary.main,
  ];

  useEffect(() => {
    fetchExperts();
  }, []);

  // Fetch the list of experts
  const fetchExperts = async () => {
    try {
      const response = await fetch('/api/users/connect/experts');
      const data = await response.json();
      setExperts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching experts:', error);
      setIsLoading(false);
    }
  };

  // Handle click on an expert card
  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
    setDialogOpen(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle slot selection
  const handleSlotSelection = (availability, slot) => {
    const { expertname } = selectedExpert;

    // Redirect the user to the slot booking path
    router.push({
      pathname: `/users/expertConnect/${username}/${expertname}`,
      query: { username, expertname, availability: JSON.stringify(availability), slot: JSON.stringify(slot) },
    });
  };

  // Check if the screen size is small
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <Heading variant="h3" component="h2">Mental Health Experts</Heading>
        {experts.map((expert, index) => (
          <CustomCard
            key={expert._id}
            variant="outlined"
            cardColor={cardColors[index % cardColors.length]}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8} style={isSmallScreen ? { textAlign: 'center' } : {}}>
                  <h2 sx={{ width: '100%' }}>{expert.name}</h2>
                  <CustomDesc>
                    <strong>Experience:</strong> {expert.yearsOfExperience ? `${expert.yearsOfExperience} years` : "Currently Unavailable"}
                  </CustomDesc>
                  <CustomDesc><strong>Qualifications:</strong> {expert.qualifications ? expert.qualifications : "Currently Unavailable"}</CustomDesc>
                  <CustomDesc><strong>Speciality:</strong> {expert.speciality ? expert.speciality : "Currently Unavailable"}</CustomDesc>
                  <CustomDesc><strong>Consultation Fee:</strong> {expert.consultationFee ? `₹${Math.floor(expert.consultationFee)}` : "Currently Unavailable"}</CustomDesc>

                </Grid>
                <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <StyledButton variant="contained" onClick={() => handleExpertClick(expert)}>
                    Book Appointment
                  </StyledButton>
                </Grid>
              </Grid>
            </CardContent>
          </CustomCard>
        ))}

        <CustomDialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle style={{ fontWeight: 'bold' }}>Book Appointment</DialogTitle>
          <CustomDialogContainer>
            {selectedExpert && (
              <div>
                <Typography variant="h6" style={{ paddingTop: '1rem' }}>{selectedExpert.name}</Typography>

                {selectedExpert.availability.length === 0 ||
                  selectedExpert.availability.every((availability) =>
                    availability.timeSlots.every((slot) => slot.booked)
                  ) ? (
                  <Typography variant="subtitle1">No appointments available currently</Typography>
                ) : (
                  selectedExpert.availability.map((availability) => {
                    const availableSlots = availability.timeSlots.filter((slot) => !slot.booked);

                    if (availableSlots.length === 0) {
                      return null;
                    }

                    return (
                      <div style={{ paddingTop: '0.4rem' }} key={availability._id}>
                        <Typography variant="subtitle2">{availability.day}</Typography>
                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>{new Date(availability.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}</Typography>
                        {availableSlots.map((slot) => (
                          <Button key={slot._id}>
                            <StyledSlotButton
                              variant="outlined"
                              onClick={() => handleSlotSelection(availability, slot)}
                            >
                              {slot.startTime} - {slot.endTime}
                            </StyledSlotButton>
                          </Button>
                        ))}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </CustomDialogContainer>
        </CustomDialog>
      </CustomRootContainer>
    </ThemeProvider>
  );
};

export default ExpertsPage;

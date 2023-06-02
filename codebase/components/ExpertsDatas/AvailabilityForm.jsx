import React, { useState } from 'react';
import Calendar from './Calendar';
import TimeSlot from './TimeSlot';
import { Button, Box } from '@mui/material';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import theme from '../styles/theme';
import RootContainer from '../styles/RootContainerStyles';
import { styled, ThemeProvider } from '@mui/system';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles({
  datePicker: {
    width: '200px', // Adjust the width as per your desired size
  },
  calendar: {
    fontSize: '0.8rem', // Adjust the font size as per your requirement
  },
});


const AvailabilityForm = () => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotChange = (time, selected) => {
    if (selected) {
      setSelectedSlots((prevSlots) => [...prevSlots, time]);
    } else {
      setSelectedSlots((prevSlots) => prevSlots.filter((slot) => slot !== time));
    }
  };

  const handleSubmit = () => {
    // Submit the selected date and slots to MongoDB
    console.log('Selected Date:', selectedDate);
    console.log('Selected Slots:', selectedSlots);
    // You can make an API call here to store the data in MongoDB
  };
  const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
    backgroundColor: theme.palette.quaternary.main,
}));

  return (

    <Card style={{ height: '500px', width: '500px',marginLeft:'1.2rem',marginTop:'1.5rem' }}>
          <CustomRootContainer>

    <CardContent style={{ height: '300px', width: '500px',marginLeft:'1rem'}}>

      <Typography variant="h5" component="div"> 
        Select an Appointment
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Calendar   selectedDate={selectedDate} handleDateChange={handleDateChange} />
        </Grid>
        <Grid item xs={6}>
        <TimeSlot time="09:00 AM" selected={selectedSlots.includes('09:00 AM')} handleSlotChange={handleSlotChange} />
        <TimeSlot time="10:00 AM" selected={selectedSlots.includes('10:00 AM')} handleSlotChange={handleSlotChange} />        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Availability
      </Button>

    </CardContent>
    </CustomRootContainer>

   
  </Card>

);
   
};

export default AvailabilityForm;
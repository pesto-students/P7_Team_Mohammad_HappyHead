import React, { useState } from 'react';
import Calendar from './Calendar';
import TimeSlot from './TimeSlot';
import { Button, Box } from '@mui/material';

const AvailabilityForm = () => {
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

  return (
    <Box>
      <Calendar selectedDate={selectedDate} handleDateChange={handleDateChange} />
      <Box>
        <h3>Select Time Slots:</h3>
        <TimeSlot time="09:00 AM" selected={selectedSlots.includes('09:00 AM')} handleSlotChange={handleSlotChange} />
        <TimeSlot time="10:00 AM" selected={selectedSlots.includes('10:00 AM')} handleSlotChange={handleSlotChange} />
        {/* Add more TimeSlot components for other time slots */}
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Availability
      </Button>
    </Box>
  );
};

export default AvailabilityForm;

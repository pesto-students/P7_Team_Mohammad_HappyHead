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



import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Box } from '@mui/material';
import Calendar from './Calendar';
import TimeSlot from './TimeSlot';

const AvailabilityForm = () => {
  const router = useRouter();
  const { expertname } = router.query;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [expertAvailability, setExpertAvailability] = useState([]);

  useEffect(() => {
    const fetchExpertAvailability = async (date) => {
      try {
        // Convert the date to the required format "2023-07-03T00:00:00.000Z"
        const formattedDate = new Date(date).toISOString();

        // Make an API call to fetch expert's availability for the selected date
        // Replace this with your own API endpoint
        const response = await fetch(`/api/experts/availability/${expertname}?date=${formattedDate}`);
        const data = await response.json();
        console.log(data);
        setExpertAvailability(data.availability);
      } catch (error) {
        console.log('Error fetching expert availability:', error);
      }
    };

    // Fetch expert's availability from the API based on selectedDate
    fetchExpertAvailability(selectedDate);
  }, [selectedDate]);


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
    // Save the selected date and slots to the expert's availability
    const updatedAvailability = expertAvailability.map((day) => {
      if (day.date === selectedDate) {
        // If the day already exists, overwrite the timeSlots
        return {
          ...day,
          timeSlots: selectedSlots.map((slot) => ({
            startTime: slot,
            endTime: slot.includes('AM') ? `${slot.slice(0, 5)} PM` : `${slot.slice(0, 5)} AM`,
            booked: false,
            user: null,
          })),
        };
      }
      return day;
    });

    // If the day doesn't exist in the expert's availability, add it as a new object
    if (!expertAvailability.some((day) => day.date === selectedDate)) {
      updatedAvailability.push({
        day: getDayOfWeek(selectedDate), // Implement the function to get the day of the week
        date: selectedDate,
        timeSlots: selectedSlots.map((slot) => ({
          startTime: slot,
          endTime: slot.includes('AM') ? `${slot.slice(0, 5)} PM` : `${slot.slice(0, 5)} AM`,
          booked: false,
          user: null,
        })),
      });
    }

    // Submit the updated availability to MongoDB
    saveExpertAvailability(updatedAvailability);
  };

  const saveExpertAvailability = async (availability) => {
    try {
      // Make an API call to save the updated availability to MongoDB
      // Replace this with your own API endpoint
      await fetch(`/api/experts/availability/${expertname}`, {
        method: 'POST',
        body: JSON.stringify({ availability }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Availability saved successfully');
    } catch (error) {
      console.log('Error saving expert availability:', error);
    }
  };

  // Generate TimeSlot components for all 24 hours
  const renderTimeSlots = () => {
    const timeSlots = [];

    for (let hour = 0; hour < 24; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00 AM`;
      const endTime = `${hour.toString().padStart(2, '0')}:00 PM`;
      const selected = selectedSlots.includes(startTime);

      timeSlots.push(
        <TimeSlot
          key={startTime}
          startTime={startTime}
          endTime={endTime}
          selected={selected}
          handleSlotChange={handleSlotChange}
        />
      );
    }

    return timeSlots;
  };

  return (
    <Box>
      <Calendar selectedDate={selectedDate} handleDateChange={handleDateChange} />
      <Box>
        <h3>Select Time Slots:</h3>
        {renderTimeSlots()}
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Availability
      </Button>
    </Box>
  );
};

export default AvailabilityForm;

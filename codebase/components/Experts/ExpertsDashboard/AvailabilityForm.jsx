import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import Calendar from './Calendar';
import TimeSlot from './TimeSlot';
import { styled, ThemeProvider } from '@mui/system';
import theme from '../../styles/theme';
import DialogBox from '../../styles/DialogBox';

// Styled component for heading
const Heading = styled('h2')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '1rem',
  },
}));

// Styled component for button wrapper
const ButtonWrapper = styled('div')(({ theme, color }) => ({
  '& button': {
    backgroundColor: theme.palette[color].main,
  },
  '& button + button': {
    marginTop: theme.spacing(2),
  },
}));

const AvailabilityForm = () => {
  const router = useRouter();
  const { expertname } = router.query;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [expertAvailability, setExpertAvailability] = useState([]);
  const [openSetAvailabilityDialog, setOpenSetAvailabilityDialog] = useState(false);
  const [openCheckAvailabilityDialog, setOpenCheckAvailabilityDialog] = useState(false);

  // Fetch expert availability from the server
  useEffect(() => {
    const fetchExpertAvailability = async () => {
      try {
        const response = await fetch(`/api/experts/availability/${expertname}`);
        const data = await response.json();
        setExpertAvailability(data.availability);
      } catch (error) {
        console.log('Error fetching expert availability:', error);
      }
    };

    fetchExpertAvailability();
  }, [expertname]);

  // Handle date change
  const handleDateChange = (date) => {
    const startOfDayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setSelectedDate(startOfDayUTC);
  };

  // Handle slot change (checkbox)
  const handleSlotChange = (time, selected) => {
    if (selected) {
      setSelectedSlots((prevSlots) => [...prevSlots, time]);
    } else {
      setSelectedSlots((prevSlots) => prevSlots.filter((slot) => slot !== time));
    }
  };

  // Save expert availability to the server
  const saveExpertAvailability = async (expertAvailability) => {
    try {
      const payload = {
        expertname: expertname,
        availability: expertAvailability,
      };
      const response = await fetch(`/api/experts/availability/${expertname}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setExpertAvailability(expertAvailability);
        setOpenSetAvailabilityDialog(false);
        console.log('Availability saved successfully');
      } else {
        console.error('Failed to update expert profile');
      }
    } catch (error) {
      console.log('Error saving expert availability:', error);
    }
  };

  // Format time slot for display
  const formatTimeSlot = (slot) => {
    const startHour = parseInt(slot.slice(0, 2));
    const startHour12 = startHour === 0 ? 12 : startHour > 12 ? startHour - 12 : startHour;
    const endHour = (startHour + 1) % 24;
    const endHour12 = endHour === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;
    const startTimeAMPM = startHour < 12 ? 'AM' : 'PM';
    const endTimeAMPM = endHour < 12 ? 'AM' : 'PM';
    const startTime = `${startHour12.toString().padStart(2, '0')}:00 ${startTimeAMPM}`;
    const endTime = `${endHour12.toString().padStart(2, '0')}:00 ${endTimeAMPM}`;

    return {
      startTime: startTime,
      endTime: endTime,
      booked: false,
      user: null,
    };
  };

  // Handle form submission
  const handleSubmit = () => {
    let updatedAvailability = [];
    const formattedDate = selectedDate.toISOString();

    // Get the day of the week
    const getDayOfWeek = (selectedDate) => {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayIndex = selectedDate.getDay();
      return daysOfWeek[dayIndex];
    };

    // Update availability based on the selected date and slots
    if (expertAvailability === null || expertAvailability === undefined || expertAvailability.length === 0) {
      updatedAvailability.push({
        day: getDayOfWeek(selectedDate),
        date: formattedDate,
        timeSlots: selectedSlots.map(formatTimeSlot),
      });
    } else if (Array.isArray(expertAvailability)) {
      updatedAvailability = expertAvailability.map((day) => {
        if (day.date === formattedDate) {
          return {
            ...day,
            timeSlots: selectedSlots.map(formatTimeSlot),
          };
        }
        return day;
      });

      if (!expertAvailability.some((day) => day.date === formattedDate)) {
        updatedAvailability.push({
          day: getDayOfWeek(selectedDate),
          date: formattedDate,
          timeSlots: selectedSlots.map(formatTimeSlot),
        });
      }
    }

    // Save the updated availability
    saveExpertAvailability(updatedAvailability);

    // Clear the selected slots after saving
    setSelectedSlots([]);

    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  // Render time slots checkboxes
  const renderTimeSlots = () => {
    const timeSlots = [];

    for (let hour = 0; hour < 24; hour++) {
      const startHour = (hour % 12 || 12).toString().padStart(2, '0');
      const endHour = ((hour + 1) % 12 || 12).toString().padStart(2, '0');
      const startTimeAMPM = hour < 12 ? 'AM' : 'PM';
      const endTimeAMPM = (hour + 1) < 12 ? 'AM' : 'PM';
      const startTime = `${startHour}:00 ${startTimeAMPM}`;
      const endTime = `${endHour}:00 ${endTimeAMPM}`;
      const selected = selectedSlots.includes(startTime);

      timeSlots.push(
        <FormControlLabel
          key={startTime}
          control={<Checkbox checked={selected} onChange={(e) => handleSlotChange(startTime, e.target.checked)} />}
          label={`${startTime} - ${endTime}`}
        />
      );
    }

    return timeSlots;
  };

  // Open set availability dialog
  const handleOpenSetAvailabilityDialog = () => {
    setOpenSetAvailabilityDialog(true);
  };

  // Close set availability dialog
  const handleCloseSetAvailabilityDialog = () => {
    setOpenSetAvailabilityDialog(false);
  };

  // Open check availability dialog
  const handleOpenCheckAvailabilityDialog = () => {
    setOpenCheckAvailabilityDialog(true);
  };

  // Close check availability dialog
  const handleCloseCheckAvailabilityDialog = () => {
    setOpenCheckAvailabilityDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Heading>Appointment Slots</Heading>
        <Calendar selectedDate={selectedDate} handleDateChange={handleDateChange} />

        {/* Availability slots setter and checker */}
        <ButtonWrapper color="tertiary" sx={{ marginTop: theme.spacing(0) }}>
          <Button variant="contained" onClick={handleOpenCheckAvailabilityDialog}>
            Check Current Availability
          </Button>
        </ButtonWrapper>

        <ButtonWrapper color="quinary" sx={{ marginTop: theme.spacing(2) }}>
          <Button variant="contained" onClick={handleOpenSetAvailabilityDialog}>
            Set Availability
          </Button>
        </ButtonWrapper>

        {/* Availability slots setter */}
        <DialogBox open={openSetAvailabilityDialog} onClose={handleCloseSetAvailabilityDialog}
          PaperProps={{
            style: {
              backgroundColor: theme.palette.quinary.main,
            },
          }}>
          <DialogTitle>Set Availability</DialogTitle>
          <DialogContent>{renderTimeSlots()}</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSetAvailabilityDialog}>Close</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </DialogBox>

        {/* Availability slots checker */}
        <DialogBox
          open={openCheckAvailabilityDialog}
          onClose={handleCloseCheckAvailabilityDialog}
          PaperProps={{
            style: {
              backgroundColor: theme.palette.tertiary.main,
            },
          }}
        >
          <DialogTitle>Check Current Availability</DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            {expertAvailability === null ||
              expertAvailability === undefined ||
              expertAvailability.length === 0 ||
              !expertAvailability.some((day) => day.date.slice(0, 10) === selectedDate.toISOString().slice(0, 10)) ? (
              <p>No availability information set for the selected date</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {expertAvailability.map((day) => {
                  const dayDate = new Date(day.date);
                  const selected = dayDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
                  const formattedDate = dayDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                  if (selected && day.timeSlots.length > 0) {
                    return (
                      <li key={day.date}>
                        {`${formattedDate}: ${day.timeSlots.length} slots available`}
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {day.timeSlots.map((slot) => (
                            <li key={`${day.date}-${slot.startTime}-${slot.endTime}`} style={{ textDecoration: 'none' }}>
                              {`${slot.startTime} - ${slot.endTime}`}
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCheckAvailabilityDialog}>Close</Button>
          </DialogActions>
        </DialogBox>
      </Box>
    </ThemeProvider>
  );
};

export default AvailabilityForm;

// This component represents a form for managing availability slots for appointments.
// It imports various dependencies and components from external libraries and local files.

// The component starts by importing the necessary dependencies and components.

// The `AvailabilityForm` function is defined, representing the main

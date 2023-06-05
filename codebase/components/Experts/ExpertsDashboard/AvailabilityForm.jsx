import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import Calendar from './Calendar';
import TimeSlot from './TimeSlot';
import { styled, ThemeProvider } from '@mui/system';
import theme from '../../styles/theme';
import DialogBox from '../../styles/DialogBox';

const Heading = styled('h2')(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.down('sm')]: {
    paddingBottom: '1rem',
  },
}));

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

  const handleDateChange = (date) => {
    const startOfDayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setSelectedDate(startOfDayUTC);
  };

  const handleSlotChange = (time, selected) => {
    if (selected) {
      setSelectedSlots((prevSlots) => [...prevSlots, time]);
    } else {
      setSelectedSlots((prevSlots) => prevSlots.filter((slot) => slot !== time));
    }
  };

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

  
  const handleSubmit = () => {
    let updatedAvailability = [];
    const formattedDate = selectedDate.toISOString();

    const getDayOfWeek = (selectedDate) => {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayIndex = selectedDate.getDay();
      return daysOfWeek[dayIndex];
    };

    if (expertAvailability === null || expertAvailability === undefined || expertAvailability.length === 0) {
      updatedAvailability.push({
        day: getDayOfWeek(selectedDate),
        date: formattedDate,
        timeSlots: selectedSlots.map((slot) => ({
          startTime: slot,
          endTime: slot.includes('AM') ? `${slot.slice(0, 5)} PM` : `${slot.slice(0, 5)} AM`,
          booked: false,
          user: null,
        })),
      });
    } else if (Array.isArray(expertAvailability)) {
      updatedAvailability = expertAvailability.map((day) => {
        if (day.date === formattedDate) {
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

      if (!expertAvailability.some((day) => day.date === formattedDate)) {
        updatedAvailability.push({
          day: getDayOfWeek(selectedDate),
          date: formattedDate,
          timeSlots: selectedSlots.map((slot) => ({
            startTime: slot,
            endTime: slot.includes('AM') ? `${slot.slice(0, 5)} PM` : `${slot.slice(0, 5)} AM`,
            booked: false,
            user: null,
          })),
        });
      }
    }

    saveExpertAvailability(updatedAvailability);

  };

 
  const renderTimeSlots = () => {
    const timeSlots = [];

    for (let hour = 0; hour < 24; hour++) {
      const startTime = `${(hour % 12 || 12).toString().padStart(2, '0')}:00 ${hour < 12 ? 'AM' : 'PM'}`;
      const endTime = `${((hour + 1) % 12 || 12).toString().padStart(2, '0')}:00 ${(hour + 1) < 12 ? 'AM' : 'PM'}`;
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

  const handleOpenSetAvailabilityDialog = () => {
    setOpenSetAvailabilityDialog(true);
  };

  const handleCloseSetAvailabilityDialog = () => {
    setOpenSetAvailabilityDialog(false);
  };

  const handleOpenCheckAvailabilityDialog = () => {
    setOpenCheckAvailabilityDialog(true);
  };

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

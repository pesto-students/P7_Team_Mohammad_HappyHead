import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import Calendar from './Calendar';
import TimeSlot from './TimeSlot';
import { styled, ThemeProvider } from '@mui/system';
import theme from '../../styles/theme';
// import ButtonWrapper from '../../styles/ButtonWrapperStyles';

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
    const fetchExpertAvailability = async (selectedDate) => {
      try {
        const formattedDate = new Date(selectedDate).toISOString();
        const response = await fetch(`/api/experts/availability/${expertname}?date=${formattedDate}`);
        const data = await response.json();
        setExpertAvailability(data.availability);
      } catch (error) {
        console.log('Error fetching expert availability:', error);
      }
    };
    console.log(expertAvailability)
    fetchExpertAvailability(selectedDate);
  }, [selectedDate]);

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

  const handleSubmit = () => {
    let updatedAvailability = [];

    if (Array.isArray(expertAvailability)) {
      updatedAvailability = expertAvailability.map((day) => {
        if (day.date === selectedDate) {
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
    }

    if (
      Array.isArray(expertAvailability) &&
      !expertAvailability.some((day) => day.date === selectedDate)
    ) {
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

    saveExpertAvailability(updatedAvailability);
  };

  const saveExpertAvailability = async (availability) => {
    try {
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

  const renderTimeSlots = () => {
    const timeSlots = [];

    for (let hour = 0; hour < 24; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00 AM`;
      const endTime = `${hour.toString().padStart(2, '0')}:00 PM`;
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
        <Calendar selectedDate={selectedDate} handleDateChange={handleDateChange} />
        <ButtonWrapper color="tertiary" sx={{ marginTop: theme.spacing(0), }}>
          <Button variant="contained" onClick={handleOpenCheckAvailabilityDialog}>
            Check Current Availability
          </Button>
        </ButtonWrapper>

        <ButtonWrapper color="quinary" sx={{ marginTop: theme.spacing(2), }}>
          <Button variant="contained" onClick={handleOpenSetAvailabilityDialog}>
            Set Availability
          </Button>
        </ButtonWrapper>

        <Dialog open={openSetAvailabilityDialog} onClose={handleCloseSetAvailabilityDialog}
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
        </Dialog>

        <Dialog open={openCheckAvailabilityDialog} onClose={handleCloseCheckAvailabilityDialog}
          PaperProps={{
            style: {
              backgroundColor: theme.palette.tertiary.main,
            },
          }}
        >
          <DialogTitle>Check Current Availability</DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            {expertAvailability.some((day) => {
              const dayDate = new Date(day.date);
              const selected = dayDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
              return selected;
            }) ? (
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
            ) : (
              <p>No availability information set currently</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCheckAvailabilityDialog}>Close</Button>
          </DialogActions>
        </Dialog>






      </Box>
    </ThemeProvider>

  );
};

export default AvailabilityForm;

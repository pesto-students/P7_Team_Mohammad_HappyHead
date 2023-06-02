import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { styled, ThemeProvider } from '@mui/system';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    datePicker: {
      width: '100px',
      height:'300px', // Adjust the width as per your desired size
    },
    calendar: {
      fontSize: '0.2rem', // Adjust the font size as per your requirement
    },
  });
  

const Calendar = ({ selectedDate, handleDateChange }) => {
    
    const classes = useStyles();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker className={classes.datePicker}
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                format="yyyy-MM-dd"
                variant="inline"
                inputVariant="outlined"
                PopoverProps={{
                    classes: {
                      paper: classes.calendar,
                    },
                  }}
            />
        </LocalizationProvider>
    );
}

export default Calendar;
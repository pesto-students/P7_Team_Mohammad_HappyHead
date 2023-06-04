import * as React from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

// import { DatePicker, AdapterDayjs } from '@mui/x-data-pickers';
// import { LocalizationProvider } from '@mui/x-data-pickers/LocalizationProvider';
// import dayjs from 'dayjs'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'


const Calendar = ({ selectedDate, handleDateChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                format="yyyy-MM-dd"
                variant="inline"
                inputVariant="outlined"
            />
        </LocalizationProvider>
    );
}

export default Calendar;



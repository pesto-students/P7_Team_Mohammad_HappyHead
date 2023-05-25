import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const Calendar = ({ selectedDate, handleDateChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
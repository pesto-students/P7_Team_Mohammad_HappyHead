import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
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



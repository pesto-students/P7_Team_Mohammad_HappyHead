import React from 'react';
import { format } from 'date-fns';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function DateCalendarValue({ selectedDate, handleDateChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar 
        value={selectedDate} 
        onChange={handleDateChange} 
        defaultValue={new Date()}
        valueFormatter={(value) => format(value, 'yyyy-MM-dd')}
      />
    </LocalizationProvider>
  );
}

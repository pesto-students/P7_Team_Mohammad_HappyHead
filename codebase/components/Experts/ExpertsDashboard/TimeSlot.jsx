import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const TimeSlot = ({ time, selected, handleSlotChange }) => {
  const handleCheckboxChange = (event) => {
    handleSlotChange(time, event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={selected} onChange={handleCheckboxChange} />}
      label={time}
    />
  );
};

export default TimeSlot;

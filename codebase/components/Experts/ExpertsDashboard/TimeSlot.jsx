import React from 'react';

const TimeSlot = ({ startTime, endTime, selected, handleSlotChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => handleSlotChange(startTime, !selected)}
      />
      <label>{startTime} - {endTime}</label>
    </div>
  );
};


export default TimeSlot;
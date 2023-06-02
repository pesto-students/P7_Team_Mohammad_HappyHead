import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const UpcomingAppointments = () => {
  const router = useRouter();
  const { username } = router.query;
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/users/dashboard/${username}`);
        const data = await response.json();
        console.log(data)
        const bookedSlots = data.bookedSlots || [];
        const filteredAppointments = bookedSlots.filter(slot => {
          const appointmentDate = new Date(slot.date);
          const currentDate = new Date();
          return appointmentDate > currentDate;
        });
        console.log(filteredAppointments)
        setUpcomingAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    if (username) {
      fetchAppointments();
    }
  }, [username]);
  console.log(upcomingAppointments)
  const noAppointmentsMessage = <p>No upcoming appointments</p>;

  return (
    <div>
      <h2>Upcoming Appointments</h2>
      {upcomingAppointments.length === 0 ? (
        noAppointmentsMessage
      ) : (
        <ul>
          {upcomingAppointments.map(appointment => (
            <li key={appointment.date}>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.startTime} - {appointment.endTime}</p>
              <p>Expert Name: {appointment.user.name}</p>
              <p>Expert Phone Number: {appointment.user.phoneNumber}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingAppointments;

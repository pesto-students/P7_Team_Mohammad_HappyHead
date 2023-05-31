import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

const ExpertsPage = () => {
    const [experts, setExperts] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        fetchExperts();
    }, []);

    const fetchExperts = async () => {
        try {
            const response = await fetch('/api/users/connect/experts');
            const data = await response.json();
            setExperts(data);
        } catch (error) {
            console.error('Error fetching experts:', error);
        }
    };

    const handleExpertClick = (expert) => {
        setSelectedExpert(expert);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleBookAppointment = (slot) => {
        // Handle booking appointment here
        console.log('Booking appointment:', slot);
    };

    return (
        <div>
            {experts.map((expert) => (
                <Card key={expert._id}>
                    <CardContent>
                        <Typography variant="h5">{expert.name}</Typography>
                        <Typography variant="subtitle1">Experience: {expert.yearsOfExperience} years</Typography>
                        <Typography variant="subtitle1">Qualifications: {expert.qualifications}</Typography>
                        <Typography variant="subtitle1">Speciality: {expert.speciality}</Typography>
                        <Typography variant="subtitle1">Consultation Fee: ₹{Math.floor(expert.consultationFee)}</Typography>
                        <Button variant="contained" color="primary" onClick={() => handleExpertClick(expert)}>
                            Book Appointment
                        </Button>
                    </CardContent>
                </Card>
            ))}

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Book Appointment</DialogTitle>
                <DialogContent>
                    {selectedExpert && (
                        <div>
                            <Typography variant="h6">{selectedExpert.name}</Typography>
                            <Typography variant="subtitle1">Availability:</Typography>
                            {selectedExpert.availability.map((availability) => (
                                <div key={availability._id}>
                                    <Typography variant="subtitle2">{availability.day}</Typography>
                                    <Typography variant="subtitle2">{new Date(availability.date).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}</Typography>
                                    {availability.timeSlots.map((slot) => (
                                        <Button
                                            key={slot._id}
                                            variant="outlined"
                                            onClick={() => handleBookAppointment(slot)}
                                        >
                                            {slot.startTime} - {slot.endTime}
                                        </Button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ExpertsPage;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, Typography, useMediaQuery } from '@mui/material';
import ButtonWrapper from '../../../styles/ButtonWrapperStyles'
import theme from '../../../styles/theme'
import { ThemeProvider, styled } from '@mui/system';


// Styled component for the custom content container
const CustomContentContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '1rem 8rem',
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 1.5rem',
    },
}));

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: '1.5rem',
    backgroundColor: theme.palette.quaternary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const CustomDialogContainer = styled(DialogContent)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '2rem 1.5rem',
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '70%',
        maxWidth: 'none',
    },
    [theme.breakpoints.up('md')]: {
        '& .MuiDialog-paper': {
            width: '30%',
        },
    },
}));

const StyledSlotButton = styled(Button)(({ theme, isSelected }) => ({
    backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
    color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
    border: `2px solid ${theme.palette.tertiary.main}`, 
    '&:hover': {
        backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.primary.light,
    },
}));

const ExpertsPage = () => {
    const router = useRouter();
    const { username } = router.query;
    const [experts, setExperts] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
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

    const handleSlotSelection = (availability, slot) => {
        const { expertname } = selectedExpert;

        // Redirect the user to the slot booking path
        router.push({
            pathname: `/users/expertConnect/${username}/${expertname}`,
            query: { username, expertname, availability: JSON.stringify(availability), slot: JSON.stringify(slot) },
        });
    };

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ThemeProvider theme={theme}>
            <CustomContentContainer>
                <h1 style={{ textAlign: 'center' }}>Available Experts</h1>
                <div style={{ padding: '0.2rem 1rem' }}>
                    {experts.map((expert) => (
                        <StyledCard key={expert._id}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8} style={isSmallScreen ? { textAlign: 'center' } : {}}>
                                        <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '0.8rem' }}>{expert.name}</Typography>
                                        <Typography variant="subtitle1"><strong>Experience:</strong> {expert.yearsOfExperience} years</Typography>
                                        <Typography variant="subtitle1"><strong>Qualifications:</strong> {expert.qualifications}</Typography>
                                        <Typography variant="subtitle1"><strong>Speciality:</strong> {expert.speciality}</Typography>
                                        <Typography variant="subtitle1"><strong>Consultation Fee:</strong> ₹{Math.floor(expert.consultationFee)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <ButtonWrapper color="tertiary">
                                            <StyledButton variant="contained" onClick={() => handleExpertClick(expert)}>
                                                Book Appointment
                                            </StyledButton>
                                        </ButtonWrapper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </StyledCard>
                    ))}

                    <CustomDialog open={dialogOpen} onClose={handleCloseDialog}>
                        <DialogTitle style={{ fontWeight: 'bold' }}>Book Appointment</DialogTitle>
                        <CustomDialogContainer>
                            {selectedExpert && (
                                <div>
                                    <Typography variant="h6" style={{ paddingTop: '1rem' }}>{selectedExpert.name}</Typography>
                                    <Typography variant="subtitle1">Availability:</Typography>
                                    {selectedExpert.availability.map((availability) => (
                                        <div style={{ paddingTop: '0.4rem' }} key={availability._id}>
                                           
                                            {!availability.timeSlots.every((slot) => slot.booked) && (
                                                <>
                                                <Typography variant="subtitle2">{availability.day}</Typography>
                                                <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>{new Date(availability.date).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}</Typography>
                                                </>
                                                
                                            )}
                                            {availability.timeSlots
                                                .filter((slot) => !slot.booked) // Exclude slots that are booked
                                                .map((slot) => (
                                                    <Button key={slot._id}>
                                                        <StyledSlotButton
                                                            variant="outlined"
                                                            onClick={() => handleSlotSelection(availability, slot)}
                                                            isSelected={slot.isSelected}
                                                        >
                                                            {slot.startTime} - {slot.endTime}
                                                        </StyledSlotButton>
                                                    </Button>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CustomDialogContainer>
                    </CustomDialog>
                </div>
            </CustomContentContainer>
        </ThemeProvider>
    );
};

export default ExpertsPage;

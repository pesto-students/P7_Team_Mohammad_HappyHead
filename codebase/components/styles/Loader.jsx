import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/system'
import theme from './theme';

export default function LoadingButtons() {
    return (
        <ThemeProvider theme={theme}>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{
                    minHeight: '95vh',
                    backgroundColor: theme.palette.primary.main,
                }}
            >
                <LoadingButton
                    loading
                    loadingPosition="center"
                    loadingIndicator={<CircularProgress color="inherit" />}
                    variant="filled"
                    role="progressbar"
                    sx={{
                        color: theme.palette.quinary.main, 
                        borderRadius: '8px',                         
                    }}
                >
                </LoadingButton>
            </Stack>
        </ThemeProvider>

    );
}

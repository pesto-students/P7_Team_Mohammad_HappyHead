import { styled, Typography } from '@mui/material';

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

export default Subtitle;

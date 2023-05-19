import { styled, Typography } from '@mui/material'

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: 'Roboto, Arial, sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.2rem',
  },
}))

export default Title

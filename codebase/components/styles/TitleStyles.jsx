import { styled, Typography } from '@mui/material'

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.typography.h2.fontFamily,
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.2rem',
  },
}))

export default Title

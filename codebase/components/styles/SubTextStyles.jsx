import { styled, Typography } from '@mui/material'

const SubText= styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h3.fontFamily,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
    width: '90%', // Set width to 40% of the viewport
  },
  width: '60%', // Set width to 40% of the viewport
}))

export default SubText
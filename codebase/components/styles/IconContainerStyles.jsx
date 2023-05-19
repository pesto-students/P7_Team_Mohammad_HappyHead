import { styled } from '@mui/system'

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2, 0),

  // Increase icon size on desktop view
  [theme.breakpoints.up('md')]: {
    '& svg': {
      fontSize: '3rem',
    },
    '& svg:not(:last-child)': {
      marginRight: theme.spacing(4),
    },
  },
}))

export default IconContainer

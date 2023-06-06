import { styled } from '@mui/system'

const RootContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  // padding: theme.spacing(2, 0),
  backgroundColor: theme.palette.primary.main,
  // backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  textAlign: 'center',
}))

export default RootContainer

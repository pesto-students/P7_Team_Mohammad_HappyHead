import { styled } from '@mui/system'

const RootContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  textAlign: 'center',
}))

export default RootContainer

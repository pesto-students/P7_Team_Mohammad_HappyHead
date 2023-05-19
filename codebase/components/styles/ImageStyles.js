import { styled } from '@mui/system'

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  margin: theme.spacing(2, 0),
}))

export default Image

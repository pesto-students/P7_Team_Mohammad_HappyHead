import { styled } from '@mui/system'

const ButtonWrapper = styled('div')(({ theme, color }) => ({
  marginTop: theme.spacing(2),
  '& button': {
    backgroundColor: theme.palette[color].main,
  },
}))

export default ButtonWrapper

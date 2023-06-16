import { styled } from '@mui/system'

const PhotoContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
}))

export default PhotoContainer
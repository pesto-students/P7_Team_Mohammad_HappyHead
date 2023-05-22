import { styled } from '@mui/system'

const CardContentStyle = styled('div')(({ theme }) => ({
    backgroundImage: `linear-gradient(to bottom, ${theme.palette.tertiary.main}, ${theme.palette.quinary.main})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    border: `3px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
    gap: '0.5rem', 
}))

export default CardContentStyle
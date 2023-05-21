import { styled } from '@mui/system'

const CardStyle = styled('div')(({ theme }) => ({
    backgroundImage: `linear-gradient(to bottom, ${theme.palette.quinary.main}, ${theme.palette.tertiary.main})`,
    height: '400px',
    width: '100%',
    cursor: 'pointer',
    border: `3px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
}))

export default CardStyle
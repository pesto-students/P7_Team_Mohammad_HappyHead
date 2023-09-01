import { styled } from '@mui/system'

const CardStyle = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.tertiary.main,
    height: '300px',
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
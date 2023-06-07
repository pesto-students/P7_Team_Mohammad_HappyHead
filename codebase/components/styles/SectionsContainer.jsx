import { styled } from '@mui/system'

const SectionContainer = styled('div')(({ theme }) =>({
    minWidth: '98%', 
    flexDirection: 'row',
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderRadius: '8px',
    padding: '2rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 0',
  },
}))

export default SectionContainer
import { styled } from '@mui/system'

const ColumnContainer = styled('div')(({ theme }) => ({
    flexBasis: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
}))

export default ColumnContainer
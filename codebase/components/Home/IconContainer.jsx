import { styled } from '@mui/system';

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
}));

export default IconContainer;

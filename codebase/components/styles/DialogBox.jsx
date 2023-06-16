import { styled } from '@mui/system'
import { Dialog } from '@mui/material';

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      backgroundColor: theme.palette.secondary.main,
      border: `2px solid ${theme.palette.primary.main}`, // Add border styles
      borderRadius: '8px', // Add border radius
    },
    '& .MuiInputLabel-outlined': {
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '& .MuiDialogTitle-root': {
        color: theme.palette.text.primary,
      },
      '& .MuiDialogLabel-root': {
        color: theme.palette.text.primary,
      },
    },
  }));
  

export default CustomDialog
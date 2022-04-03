import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';


const PrimaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[300]),
  backgroundColor: grey[300],
  "&:hover": {
    backgroundColor: grey[400],
  },
  maxHeight: 30,
  height: "min-content",
}))

export default PrimaryButton

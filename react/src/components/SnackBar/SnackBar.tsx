
import { forwardRef, useState } from "react";
import Button from '@mui/material/Button';
import { Snackbar, Stack} from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type severityType =  'error' |  'info' | 'success' | 'warning';

interface ISnackBar {
  message: string;
  severity: severityType;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar:React.FC<ISnackBar> = ({message, severity}) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Stack>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  )

}

export default SnackBar;
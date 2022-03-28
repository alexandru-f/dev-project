import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import {DialogContent} from '@mui/material';
import { IModalProps } from '../../interface/IModal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Modal:React.FC<IModalProps> = ({open, handleClose, children, title, button}) => {
  return (
    <Dialog 
      PaperProps={{
        style: {
          paddingBottom: '2rem',
          paddingTop: '2rem'
        }
      }}
      fullWidth={true}
      maxWidth={"xs"}
      transitionDuration={40} 
      open={open} 
      disableEscapeKeyDown
      onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {title && <DialogTitle sx={{pb: "1rem", pt: "0"}}>{title}</DialogTitle>}
      <DialogContent>
        {children()}
      </DialogContent>  
      <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
      {button()}
      </DialogActions>
    </Dialog>
  );

}

export default Modal;
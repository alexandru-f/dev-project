import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteSubscriptionMutation } from "../../features/subscriptionApi";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    paddingTop: '30px',
    paddingBottom: '30px'
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogAction: {
    justifyContent: 'center!important'
  },
  dialogContentTitle: {
    paddingBottom: '10px!important'
  },
  iconButton: {
    fontSize: '3rem!important'
  }
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subTitle: string;
  deleteId?: number
}

const ConfirmDialog:React.FC<ConfirmProps> = ({open, onClose, title, subTitle, deleteId}) => {

    const classes = useStyles();
    const [deleteSubscription] = useDeleteSubscriptionMutation({fixedCacheKey: 'share-delete-subs'});
    
    const onSubscriptionDelete = async (deleteId: number) => {
      await deleteSubscription(deleteId);
    }

    const handleAgreeClick = () => {
      if (deleteId !== undefined) {
        onSubscriptionDelete(deleteId);
        onClose();
      }
    }
    return (
      <Dialog
      PaperProps={{ classes: {root: classes.paper } }}
      maxWidth="sm"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <IconButton disabled disableRipple>
        <DeleteForeverIcon className={classes.iconButton}/>
      </IconButton>
      <DialogTitle className={classes.dialogContentTitle}>
        {title}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText id="alert-dialog-slide-description">
         {subTitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button onClick={handleAgreeClick}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </DialogActions>
    </Dialog>
    );
}


export default ConfirmDialog;
import useStyles from "./Subscription.styles";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SubscriptionTable from "./components/SubscriptionTable";
import { useEffect, useState } from "react";
import { theme } from '../../theme';
import ModalContent from './components/ModalContent'
import {useAppSelector, useAppDispatch } from '../../app/hooks';
import { subscriptionLoadingStatus } from "../../features/subscription-slice";
import { getSubscriptions } from "../../features/subscription-slice";
import { HTTP_STATUS } from "../../app/constants";


const Subscription = () => {

  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpen = () => { setOpenModal(true); }
  const handleClose = () => { setOpenModal(false); }
  const subscriptionCreationLoadingStatus = useAppSelector(subscriptionLoadingStatus);
  const dispatch = useAppDispatch(); 

  const fetchSubscriptions = () => {
      dispatch(getSubscriptions());
  }

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    console.log(subscriptionCreationLoadingStatus);
    if (subscriptionCreationLoadingStatus !== HTTP_STATUS.FULFILLED) return;
      console.log('RERENDER FOR REAL');
  }, [subscriptionCreationLoadingStatus]);

  return (
      <Container className={classes.root}>
        <Box sx={{
          display: "flex",
          justifyContent: "end",
          paddingBottom: theme.spacing(3)
        }}>
          <IconButton color="primary" onClick={handleOpen}>
            <AddCircleIcon sx={{fontSize: "50px"}}/>
          </IconButton>
        </Box>
        {openModal &&<ModalContent open={openModal} handleClose={handleClose} classes={classes} />}
        <Box>
          <SubscriptionTable />
        </Box>
      </Container>
  );
};


export default Subscription;
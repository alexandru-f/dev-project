import useStyles from "./Subscription.styles";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SubscriptionsTable from "./components/SubscriptionTable";
import { useEffect, useState } from "react";
import { theme } from '../../theme';
import ModalContent from './components/ModalContent'
import { useGetSubscriptionsQuery } from '../../features/subscriptionApi';


const Subscription = () => {

  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpen = () => { console.log('opening'); setOpenModal(true); }
  const handleClose = () => { setOpenModal(false); }

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
        {openModal && <ModalContent open={openModal} handleClose={handleClose} classes={classes} />}
        <Box>
          <SubscriptionsTable classes={classes}/>
        </Box>
      </Container>
  );
};


export default Subscription;
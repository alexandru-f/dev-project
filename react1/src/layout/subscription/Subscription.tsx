import useStyles from "./Subscription.styles";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import { IconButton, TextField, Grid } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SubscriptionsTable from "./components/SubscriptionTable/SubscriptionTable";
import { useEffect, useState } from "react";
import { theme } from '../../theme';
import ModalContent from './components/ModalContent'
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const Subscription = () => {

  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpen = () => { console.log('opening'); setOpenModal(true); }
  const handleClose = () => { setOpenModal(false); }

  return (
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Grid container xs={12}>
              <Box sx={{
                display: "flex",
                justifyContent: "end",
                paddingBottom: theme.spacing(3)
              }}>
              <Grid item xs={4}>
                <TextField 
                  id="outlined-basic"
                  label="Search Subscription" 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" onClick={handleOpen}>
                  <AddCircleIcon sx={{fontSize: "50px"}}/>
                </IconButton>
              </Grid>
              {openModal && <ModalContent open={openModal} handleClose={handleClose} classes={classes} />}
            </Box>
          </Grid>
          <Grid container xs={12}>
            <Box sx={{width: '100%'}}>
              <Paper>
                <SubscriptionsTable />
              </Paper>
            </Box>
        </Grid>
      </Grid>        
      </Container>
  );
};


export default Subscription;
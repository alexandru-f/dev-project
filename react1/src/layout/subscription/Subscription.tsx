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
import EnhancedInput from "../../components/Input/EnhancedInput";

const Subscription = () => {

  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpen = () => { console.log('opening'); setOpenModal(true); }
  const handleClose = () => { setOpenModal(false); }
  const [filterData, setFilterData] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData(event.target.value);
  }

  return (
    <Container className={classes.root}>
        <Grid container spacing={0}>
          <Grid sx={{backgroundColor: '#fff'}} item xs={12} sm={12}>
            <Grid alignItems="center" container spacing={4}>
              <Grid item xs={6}>
                <Box className={classes.boxHeader}>
                  <EnhancedInput 
                    id="search-input"
                    name="SearchInput"
                    label="Search Subscription"
                    value={filterData}
                    onChange={handleSearch}
                    sxProps={{width: '100%', maxWidth: '250px'}}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{justifyContent: 'flex-end'}} className={classes.boxHeader}>
                  <IconButton color="primary" onClick={handleOpen}>
                    <AddCircleIcon sx={{fontSize: "50px"}}/>
                  </IconButton>
                </Box>
                {openModal && <ModalContent open={openModal} handleClose={handleClose} classes={classes} />}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                 <Box sx={{width: '100%'}}>
                  <Paper>
                    <SubscriptionsTable filterData={filterData}/>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Container>
  );
}


export default Subscription;

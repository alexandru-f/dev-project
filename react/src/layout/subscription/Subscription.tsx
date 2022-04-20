import useStyles from "./Subscription.styles";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import { IconButton, Grid } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SubscriptionsTable from "./components/SubscriptionTable/SubscriptionTable";
import { useEffect, useState } from "react";
import ModalContent from './components/ModalContent'
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import EnhancedInput from "../../components/Input/EnhancedInput";
import { DeleteOrModifySubscriptionType } from "../../interface/IApi";
import { IFormState } from "../../interface/IModalContent";
import { Currency } from '../../interface/IModalContent'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { useDeleteSubscriptionMutation } from "../../features/subscriptionApi";
import { useSnackbar, VariantType } from 'notistack';

const Subscription = () => {

  /* State variables */
  const classes = useStyles();
  const {enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpen = () => { setOpenModal(true); }
  const handleClose = () => { 
    setOpenModal(false); 
    setRecordToEdit(null); 
  }
  
  const [filterData, setFilterData] = useState<string>("");
  const [recordToEdit, setRecordToEdit] = useState<IFormState | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
  const [deleteSubscription, {isSuccess: isDeleteSuccess}] = useDeleteSubscriptionMutation({fixedCacheKey: 'share-delete-subs'});

  /* Functions */
  const handleDialogClose = () => {
    setOpenDialog(false);
  }

  const openInPopup = (subscriptionInfo: DeleteOrModifySubscriptionType) => {
    if (typeof subscriptionInfo !== 'number') {
      const currentSubscription: IFormState = {
        id: subscriptionInfo.id,
        subscriptionName: subscriptionInfo.subscriptionName,
        currency: subscriptionInfo.currency as Currency,
        monthlyPrice: subscriptionInfo.price.toString(),
        status: subscriptionInfo.status === true ? 1: 0,
        payingDueDate: subscriptionInfo.payingDueDate
      }
        setRecordToEdit(currentSubscription);
        setOpenModal(true);
    } else {
      setDeleteId(subscriptionInfo);
      setOpenDialog(true);
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData(event.target.value);
  }
  const handleClickVariant = (variant: VariantType) => () => {
    enqueueSnackbar('This is a success message!', { variant });
  };
  
  useEffect(() => {
      if (isDeleteSuccess) {
        const variant: VariantType = 'success';
        enqueueSnackbar('Subscription successfully deleted!', {variant});
      }
  }, [isDeleteSuccess, enqueueSnackbar]);


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
                {openModal && <ModalContent recordToEdit={recordToEdit} open={openModal} handleClose={handleClose} classes={classes} />}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                 <Box sx={{width: '100%'}}>
                  <Paper>
                    <SubscriptionsTable openInPopup={openInPopup} filterData={filterData}/>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {openDialog && <ConfirmDialog 
          deleteId={deleteId}
          open={openDialog} 
          onClose={handleDialogClose} 
          title={"Are you sure you want to delete this record?"}
          subTitle={"You can't undo this operation"}
        />}
    </Container>
  );
}


export default Subscription;

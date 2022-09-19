import { useEffect, useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from '@mui/material';
import EnhancedInput from "../../components/Input/EnhancedInput";
import { IFormState } from "../../interface/IModalContent";
import { Currency } from '../../interface/IModalContent'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { useDeleteSubscriptionMutation } from "../../features/subscriptionApi";
import { useSnackbar, VariantType } from 'notistack';
import { DeleteOrModifySubscriptionType } from "../../interface/Itable";
import globalUseStyles from "../../Helpers/globalUseStyles";
import TPageLayout from '../../components/TPageLayout/TPageLayout';
import ModalContent from "../subscription/components/ModalContent";
import UserTable from "./components/UsersTable/UserTable";

const Manage = () => {

  /* State variables */
  const globalClasses = globalUseStyles();
  const {enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<string>("");
  const [recordToEdit, setRecordToEdit] = useState<IFormState | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
  const [deleteSubscription, {isSuccess: isDeleteSuccess}] = useDeleteSubscriptionMutation({fixedCacheKey: 'share-delete-subs'});

  /* Functions */
  const handleDialogClose = () => {
    setOpenDialog(false);
  }

  const handleOpen = () => { setOpenModal(true); }
  
  const handleClose = () => { 
    setOpenModal(false); 
    setRecordToEdit(null); 
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
  
  const displayEnhancedInput = () => {
    return <EnhancedInput 
    id="search-input"
    name="SearchUser"
    label="Search User"
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
  }

  const displayAddButton = () => {
    return <Button 
    variant="contained"
    color="primary"
    onClick={handleOpen}
  >
    Add User
  </Button>
  }

  const displayModalContent = () => {
    return <ModalContent recordToEdit={recordToEdit} open={openModal} handleClose={handleClose} />
  }

  const displayTable = () => {
    return <UserTable openInPopup={openInPopup} filterData={filterData}/>
  }

  const displayConfirmDialog = () => {
    return <ConfirmDialog 
          deleteId={deleteId}
          open={openDialog} 
          onClose={handleDialogClose} 
          title={"Are you sure you want to delete this record?"}
          subTitle={"You can't undo this operation"}
        />
  }
  
  useEffect(() => {
      if (isDeleteSuccess) {
        const variant: VariantType = 'success';
        enqueueSnackbar('Subscription successfully deleted!', {variant});
      }
  }, [isDeleteSuccess, enqueueSnackbar]);


  return (
    <TPageLayout 
      displayEnhancedInput={displayEnhancedInput}
      displayAddButton={displayAddButton}
      displayModalContent={displayModalContent}
      displayTable={displayTable}
      displayConfirmDialog={displayConfirmDialog}
      openModal={openModal}
      openDialog={openDialog}
    />
  );
}


export default Manage;

import { Box } from "@mui/system";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useGetSubscriptionsQuery } from '../../../../features/subscriptionApi';
import SnackBar from "../../../../components/SnackBar/SnackBar";
import CircularProgress from '@mui/material/CircularProgress';
import {CDN_PATH} from '../../../../app/constants';
import IconButton from "@mui/material/IconButton";
import EnhancedTable from "../../../../components/Table/EnhancedTable";
import {IHeadCell} from '../../../../interface/Itable';
import useStyles from "./SubscriptionTable.styles";

const SubscriptionsTable = () => {

  const classes = useStyles();
  const {data = [], isLoading, isError, isSuccess} = useGetSubscriptionsQuery();
  const headCells:IHeadCell[] = [
    {id: 'subscriptionName', label: 'Subscription Name'},
    {id: 'currency', label: 'Currency'},
    {id: 'price', label: 'Price'},
    {id: 'status', label: 'Status'},
    {id: 'payingDueDate', label: 'Due Date'},
    {id: 'actions', label: 'Actions', disableSorting: true}
  ];

  const ErrorSnackBar = () => {
    return (
      <SnackBar message="Error. Please refresh the page." severity="error"/>
    );
  }

  return ( 
    <EnhancedTable 
      classes={classes} 
      snackbar={<ErrorSnackBar />} 
      dataObject={{data: data, isLoading: isLoading, isError: isError, isSuccess: isSuccess}} 
      headCells={headCells}
    />
  )


}


export default SubscriptionsTable;
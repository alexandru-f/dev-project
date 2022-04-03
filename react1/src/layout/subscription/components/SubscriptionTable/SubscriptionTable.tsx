import { useGetSubscriptionsQuery } from '../../../../features/subscriptionApi';
import SnackBar from "../../../../components/SnackBar/SnackBar";
import EnhancedTable from "../../../../components/Table/EnhancedTable";
import {IHeadCell} from '../../../../interface/Itable';
import useStyles from "./SubscriptionTable.styles";
import { ISubscription } from "../../../../interface/IApi";

interface IProps {
  filterData: string;
}

const SubscriptionsTable:React.FC<IProps> = ({filterData}) => {

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

  const filterDataArray = (dataArr: ISubscription[]) => {
    if (filterData === "") return data;
    return data.filter(item => item.subscriptionName.toLowerCase().includes(filterData));
  }

  const ErrorSnackBar = () => {
    return (
      <SnackBar message="Error. Please refresh the page." severity="error"/>
    );
  }

  return ( 
    <EnhancedTable 
      classes={classes} 
      snackbar={<ErrorSnackBar />} 
      dataObject={{data: filterDataArray(data), isLoading: isLoading, isError: isError, isSuccess: isSuccess}} 
      headCells={headCells}
    />
  )
}


export default SubscriptionsTable;
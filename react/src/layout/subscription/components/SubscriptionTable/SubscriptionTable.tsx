import { useGetSubscriptionsQuery } from '../../../../features/subscriptionApi';
import SnackBar from "../../../../components/SnackBar/SnackBar";
import EnhancedTable from "../../../../components/Table/EnhancedTable";
import {DeleteOrModifySubscriptionType, IHeadCell} from '../../../../interface/Itable';
import useStyles from "./SubscriptionTable.styles";
import { ISubscription } from "../../../../interface/IApi";
import SubscriptionTableDataList from './SubscriptionTableDataList';

interface IProps {
  filterData: string;
  openInPopup: (subscription: DeleteOrModifySubscriptionType) => void
}

const SubscriptionsTable:React.FC<IProps> = ({filterData, openInPopup}) => {

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

  const listComponent = (sortedData: ISubscription[]) => {
      return <SubscriptionTableDataList subscriptions={sortedData} classes={classes} openInPopup={openInPopup} />
  }

  
  return ( 
     <>
      {isError && <ErrorSnackBar />}
      <EnhancedTable 
        classes={classes} 
        dataObject={{data: filterDataArray(data), isLoading: isLoading, isSuccess: isSuccess}} 
        headCells={headCells}
        listComponent={listComponent}
      />
     </>
  )
}


export default SubscriptionsTable;
import SnackBar from "../../../../components/SnackBar/SnackBar";
import EnhancedTable from "../../../../components/Table/EnhancedTable";
import {DeleteOrModifySubscriptionType, IHeadCell} from '../../../../interface/Itable';
import useStyles from "../../../subscription/components/SubscriptionTable/SubscriptionTable.styles";
import { ISubscription } from "../../../../interface/IApi";
import TableDataList from '../../../subscription/components/SubscriptionTable/SubscriptionTableDataList';
// import { useGetAllUsersQuery } from '../../../../features/userApi';

interface IProps {
  filterData: string;
  openInPopup: (subscription: DeleteOrModifySubscriptionType) => void
}

const UserTable:React.FC<IProps> = ({filterData, openInPopup}) => {

  const classes = useStyles();
  const {data = [], isLoading, isError, isSuccess} = useGetAllUsersQuery();
  
  const headCells:IHeadCell[] = [
    {id: 'userName', label: 'User'},
    {id: 'email', label: 'Email'},
    {id: 'role', label: 'Role'},
    {id: 'status', label: 'Status'},
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
      return <TableDataList subscriptions={sortedData} classes={classes} openInPopup={openInPopup} />
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


export default UserTable;
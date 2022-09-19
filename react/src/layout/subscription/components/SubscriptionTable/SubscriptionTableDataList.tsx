
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { ISubscription } from "../../../../interface/IApi";
import List from "../../../../components/List/List";
import {CDN_PATH} from '../../../../app/constants';
import { Box } from "@mui/system";
import Chip from '@mui/material/Chip';
import ShowMoreMenu from '../../../../components/Menu/ShowMoreMenu';
import { DeleteOrModifySubscriptionType } from "../../../../interface/Itable";


type Props = {
  subscriptions: ISubscription[];
  classes: any;
  openInPopup: (subscription: DeleteOrModifySubscriptionType) => void;
}

const SubscriptionTableDataList = ({subscriptions, classes, openInPopup} : Props) => {
  return (
    <List 
      as="tbody"
      items={subscriptions}
      renderItem={item => (
        <TableRow key={item.id}>
          <TableCell>
            <Box className={classes.tableCell}>
              { <img style={{width: '30px'}} onError={({currentTarget}) => {
                  currentTarget.onerror = null;
                  currentTarget.src='https://res.cloudinary.com/dccseikhw/image/upload/v1648750836/subscript_dum.png';
                }} 
                className={classes.subsIcons} alt={item.subscriptionName} 
                src={CDN_PATH + item.path.replace('/subscriptions-images', '')} />
              }
              {item.subscriptionName}
            </Box>
          </TableCell>
          <TableCell>{item.currency}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>{item.status === true ? 
            <Chip size="small" color="success" label="Active" /> : 
            <Chip size="small" color="error" label="Inactive" />}
          </TableCell>
          <TableCell>{new Date(item.payingDueDate).toLocaleDateString('en-US')}</TableCell>
          <TableCell>
          {<ShowMoreMenu
            openInPopup={openInPopup} 
            item={item}
          />}
          </TableCell>
        </TableRow>
       )}
    />
  );
}

export default SubscriptionTableDataList;
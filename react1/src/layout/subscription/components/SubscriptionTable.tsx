import { Box } from "@mui/system";
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useGetSubscriptionsQuery } from '../../../features/subscriptionApi';
import SnackBar from "../../../components/SnackBar/SnackBar";
import CircularProgress from '@mui/material/CircularProgress';
import {CDN_PATH} from '../../../app/constants';
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
type classes = any;

const SubscriptionsTable:React.FC<classes> = ({classes}) => {

  const {data, isError, isLoading} = useGetSubscriptionsQuery();
  console.log(data);
  return (
    <Box sx={{width: '100%'}}>
      <Paper>
        <TableContainer>
          <Table className={classes.table}>
            <TableBody>
              {isError ? (
                <TableRow>
                  <TableCell>
                    <SnackBar message="Error. Please refresh the page." severity="error"/>
                  </TableCell>
                </TableRow>
              ) : isLoading ? (
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                  </TableCell>
                </TableRow>
              ) : data ?
                data.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box className={classes.tableCell}>
                        { <img onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src='https://cdn.icon-icons.com/icons2/1378/PNG/512/imagemissing_92832.png';
                          }} 
                          className={classes.subsIcons} alt={item.subscriptionName + " logo"} 
                          src={CDN_PATH + item.path.replace('/subscriptions-images', '')} />
                        }
                        {item.subscriptionName}
                      </Box>
                    </TableCell>
                    <TableCell>{item.currency}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.status === true ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>{new Date(item.payingDueDate).toLocaleDateString('en-US')}</TableCell>
                    <TableCell>
                    <IconButton
                      size="large"
                      aria-label="more infos"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <MoreHorizIcon />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )


}





export default SubscriptionsTable;
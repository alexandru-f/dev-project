import { Box } from "@mui/system";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { FetchedData, IEnhancedTable, IHeadCell, ITableData} from "../../interface/Itable";
import { useState } from "react";
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

type OrderType = 'asc' | 'desc';

const EnhancedTable:React.FC<IEnhancedTable> = ({classes, headCells, dataObject, listComponent}) => {
  
  const pages = [5, 10];
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pages[page]);
  const {data, isLoading} = dataObject;
  const [order, setOrder] = useState<OrderType>('asc');
  const [orderBy, setOrderBy] = useState<string>('');

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number) => {
    setPage(newPage);
  }

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  } 

  const handleSortRequest = (cellId: string) => {
    const isAsc = orderBy === cellId && order === 'asc';
    setOrder(isAsc ? 'desc': 'asc');
    setOrderBy(cellId);
  }
  
  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
    
  function getComparator(order: OrderType, orderBy: string) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handlePaginationAndSorting = (data: FetchedData["data"]) => {
      const sortedArr = stableSort<ITableData>(data, getComparator(order, orderBy));
      return sortedArr.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }


  return (
        <TableContainer>
          <Table className={classes.table}>
            {/* Table Header */}
            <TableHead>
              <TableRow>
                {
                  headCells.map(headCell => (
                    <TableCell key={headCell.id}>
                      {
                       headCell.disableSorting 
                       ? headCell.label 
                       : <TableSortLabel 
                          classes={{
                            root: classes.root
                          }}
                          active={orderBy === headCell.id}
                          onClick={() => {handleSortRequest(headCell.id)}}
                          direction={orderBy === headCell.id ? order : 'asc'}
                        >
                          {headCell.label}
                        </TableSortLabel>
                      }
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            {/* Table Body */}
              {isLoading ? (
                <TableBody>
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box className={classes.tableInnerContainer}>
                      <CircularProgress />
                    </Box>
                  </TableCell>  
                </TableRow>
                </TableBody>
              ) : 
              data ?
                (data.length > 0 ? 
                  listComponent(handlePaginationAndSorting(data))
                : (<TableBody>
                    <TableRow>
                      <TableCell>
                        <Box className={classes.tableInnerContainer}>No Data Found.</Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>))
              : null}
            <TableFooter>
              <TableRow>
                {data.length > 0 &&
                    <TablePagination
                    rowsPerPageOptions={pages}
                    colSpan={6}
                    count={data?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                }
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
  )
}


export default EnhancedTable;
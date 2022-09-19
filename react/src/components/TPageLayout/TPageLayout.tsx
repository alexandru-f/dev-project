import globalUseStyles from "../../Helpers/globalUseStyles";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import { Grid, Button, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';


interface TPageProps {
  displayEnhancedInput: () => JSX.Element;
  displayAddButton: () => JSX.Element;
  displayModalContent: () => JSX.Element;
  displayTable: () => JSX.Element;
  displayConfirmDialog: () => JSX.Element;
  openModal: boolean;
  openDialog: boolean;
}

const TPageLayout:React.FC<TPageProps> = ({displayEnhancedInput, displayAddButton, displayModalContent, displayTable, displayConfirmDialog, openModal, openDialog}) => {

  const globalClasses = globalUseStyles();

  return (
    <Container className={globalClasses.pageContainer}>
        <Grid container spacing={0}>
          <Grid sx={{backgroundColor: '#fff'}} item xs={12} sm={12}>
            <Grid alignItems="center" container spacing={4}>
              <Grid item xs={6}>
                <Box className={globalClasses.tableBoxHeader}>
                  {displayEnhancedInput()}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{justifyContent: 'flex-end'}} className={globalClasses.tableBoxHeader}>
                    {displayAddButton()}
                </Box>
                {openModal && displayModalContent()}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                 <Box sx={{width: '100%'}}>
                  <Paper>
                    {displayTable()}
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {openDialog && displayConfirmDialog()}
    </Container>
  );
}

export default TPageLayout;
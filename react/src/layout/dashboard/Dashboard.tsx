import { Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import useStyles from "./Dashboard.styles";


const Dashboard = () => {
  
  const user = useAppSelector((state) => state.auth.user);
  const classes = useStyles(); 
  
  return (
    <>
      <Container className={classes.root}>
        <Grid container spacing={0}>
          Dashboard
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;

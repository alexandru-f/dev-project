import useStyles from "./Manage.styles";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Manage = () => {

  const classes = useStyles();
  
  return (   
  <>
    <Container className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Box
            className={classes.item}
          >

          </Box>
        </Grid>
      </Grid>
    </Container>
  </>);
}

export default Manage;
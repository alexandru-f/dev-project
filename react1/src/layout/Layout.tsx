import Grid from '@mui/material/Grid'
import {Outlet} from 'react-router';
import Navbar from './navbar/Navbar';
import SideBar from './sidebar/Sidebar';

const Layout = () => {
  return (
    <>
    <Navbar />
    <Grid container>
      <Grid item lg={2} sm={3} xs={2}>
        <SideBar />
      </Grid>
      <Grid item lg={10} sm={9} xs={10}>
        <Outlet />
      </Grid>
    </Grid>
    </>
  );
}

export default Layout;
import { Box, Drawer } from '@mui/material';
import Grid from '@mui/material/Grid'
import {Outlet} from 'react-router';
import Navbar from './navbar/Navbar';
import SideBar from './sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
const drawerWidth = 240;

const Layout = () => {

  const pathName = useLocation().pathname;
  const notProtectedRoutes = ['/signin', '/signup'];
  const isRouteProtected = () => {
    return !notProtectedRoutes.includes(pathName);
  }


  return (
    <>
    <Box sx={{ display: 'flex' }}>
      {isRouteProtected() ? <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <SideBar />
      </Drawer> : ''}
      <Box
        component="main"
        sx={{ flexGrow: 1}}
        >
          <Outlet />
      </Box>
    </Box>
    </>


    // <>
    // <Navbar />
    // <Grid container>
    //   <Grid item lg={2} sm={3} xs={2}>
    //     <SideBar />
    //   </Grid>
    //   <Grid item lg={10} sm={9} xs={10}>
    //     <Outlet />
    //   </Grid>
    // </Grid>
    // </>

  );
}

export default Layout;
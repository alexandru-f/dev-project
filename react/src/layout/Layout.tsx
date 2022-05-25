import { Box, Drawer } from '@mui/material';
import {Outlet} from 'react-router';
import Navbar from './navbar/Navbar';
import SideBar from './sidebar/Sidebar';
const drawerWidth = 240;

const Layout = () => {

  return (
    <>
    <Navbar />
    <Box sx={{ display: 'flex' }}>
      <Drawer
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
      </Drawer> 
      <Box
        component="main"
        sx={{ flexGrow: 1}}
        >
          <Outlet />
      </Box>
    </Box>
    </>
  );
}

export default Layout;

import { Box, Drawer } from '@mui/material';
import { useState, useEffect } from 'react';
import {Outlet} from 'react-router';
import Navbar from './navbar/Navbar';
import SideBar from './sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import '../App.css';

const drawerWidth = 260;

const Layout = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);
  
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: '0'
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
        <Navbar />
        <Box
            className={`${transitionStage}`}
            onAnimationEnd={() => {
              if (transitionStage === 'fadeOut') {
                setTransistionStage('fadeIn');
              }
            }}>
            <Outlet />
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default Layout;

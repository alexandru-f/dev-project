import { Box} from '@mui/material';
import {Outlet} from 'react-router';
import Navbar from './navbar/Navbar';


const RegisterLoginLayout = () => {
  return (
    <>
    {/* <Navbar /> */}
    <Box sx={{ display: 'flex' }}>
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

export default RegisterLoginLayout;
import {Outlet} from 'react-router';
import { Box } from '@mui/material';
const AuthLayout = () => {

  return(
    <Box sx={{ display: 'flex' }}>
      <Outlet />
    </Box>
  );
}

export default AuthLayout;
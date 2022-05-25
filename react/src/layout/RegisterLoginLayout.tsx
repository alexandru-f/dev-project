import { Box} from '@mui/material';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {Outlet} from 'react-router';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

const RegisterLoginLayout = () => {
  const [cookies] = useCookies(['loggedIn']);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (cookies.loggedIn) {
      navigate('/home')
    }
  }, []);
  return (
    <>
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
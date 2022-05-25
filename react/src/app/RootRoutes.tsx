import {Routes, Route, useNavigate} from 'react-router-dom';
import NotFound from '../layout/auth/NotFound';
import Layout from '../layout/Layout';
import Home from '../layout/home/Home';
import Dashboard from '../layout/dashboard/Dashboard';
import Subscription from '../layout/subscription/Subscription';
import RegisterCompany from '../layout/auth/RegisterCompany';
import Login from '../layout/auth/Login';
import PrivateRoute from '../layout/auth/PrivateRoute';
import { ROLE } from '../interface/IAuth';
import { useAppSelector } from './hooks';
import { useCookies } from 'react-cookie';
import RegisterLoginLayout from '../layout/RegisterLoginLayout';

const RootRoutes = () => {
 return (
  <>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Layout />}>
        <Route path="home"           
          element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={<Home />} />}
        />
        <Route path="dashboard" 
           element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={<Dashboard />} />}
        />
        <Route path="subscriptions" 
          element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={<Subscription />} />}
        />
      </Route>
      <Route path="/" element={<RegisterLoginLayout />}>
        <Route path="signup" element={<RegisterCompany />} />
        <Route path="signin" element={<Login />} />
      </Route>
    </Routes>
  </>
 )
}

export default RootRoutes;
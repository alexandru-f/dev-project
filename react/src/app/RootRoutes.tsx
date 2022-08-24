import {Routes, Route, Navigate} from 'react-router-dom';
import NotFound from '../layout/auth/NotFound';
import Layout from '../layout/Layout';
import Home from '../layout/home/Home';
import Dashboard from '../layout/dashboard/Dashboard';
import Subscription from '../layout/subscription/Subscription';
import RegisterCompany from '../layout/auth/RegisterCompany';
import Login from '../layout/auth/Login';
import PrivateRoute from '../layout/auth/PrivateRoute';
import { ROLE } from '../interface/IAuth';
import { useCookies } from 'react-cookie';
import { useLazyRefreshTokenQuery} from '../features/refreshApi';
import { useState } from 'react';
import FullScreenLoader from '../components/FullScreenLoader/FullScreenLoader';
import Manage from '../layout/manage/Manage';
import AuthLayout from '../layout/AuthLayout';

const RootRoutes = () => {
 const [cookies] = useCookies(['loggedIn']);
 const [skip, setSkip] = useState<boolean>(true);
 const [trigger, {isSuccess, isLoading}] = useLazyRefreshTokenQuery();

 //If users hit enter on browser, check if he has cookie and try to log him
 if (!cookies.loggedIn && skip) {
  setSkip(false);
  trigger();
 }

 if (isLoading) { 
  return <FullScreenLoader />
 }

 return (
  <>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route element={<Layout /> }>
        <Route path="/app/dashboard" 
           element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={<Dashboard />} />}
        />
        <Route path="/app/subscriptions" 
          element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={<Subscription />} />}
        />
        <Route path="/app/manage" 
          element={<PrivateRoute roles={[ROLE.ADMIN]} component={<Manage />} />}
        />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="signup" element={cookies.loggedIn || (isSuccess && !cookies.loggedIn) ? <Navigate to="/app/dashboard" /> : <RegisterCompany />} />
        <Route path="signin" element={cookies.loggedIn || (isSuccess && !cookies.loggedIn) ? <Navigate to="/app/dashboard" /> :<Login />} />
        <Route path="/" element={<Home />} /> 
      </Route>
    </Routes>
  </>
 )
}

export default RootRoutes;

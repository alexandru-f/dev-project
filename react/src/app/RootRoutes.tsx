import {Routes, Route} from 'react-router-dom';
import NotFound from '../layout/auth/NotFound';
import Layout from '../layout/Layout';
import Home from '../layout/home/Home';
import Dashboard from '../layout/dashboard/Dashboard';
import Subscription from '../layout/subscription/Subscription';
import RegisterCompany from '../layout/auth/RegisterCompany';
import Login from '../layout/auth/Login';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from './hooks';
import { getAccessToken, getUserInfoFromJwt } from '../Helpers/Helpers';

const RootRoutes = () => {
 const dispatch = useAppDispatch();
 const accessToken = getAccessToken();
 return (
  <>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="subscriptions" element={<Subscription />} />
        <Route path="signup" element={<RegisterCompany />}/>
        <Route path="signin" element={<Login />} />
      </Route>
    </Routes>
  </>
 )
}

export default RootRoutes;
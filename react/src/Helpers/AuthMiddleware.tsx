import React from 'react';
import { useCookies } from 'react-cookie';
import FullScreenLoader from '../components/FullScreenLoader/FullScreenLoader';
import { userApi } from '../features/userApi';

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [cookies] = useCookies(['loggedIn']);

  const { isLoading } = userApi.endpoints.getCurrentUser.useQuery(null, {
    skip: !cookies.loggedIn,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;

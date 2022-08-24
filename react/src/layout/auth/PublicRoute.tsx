import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { userApi } from "../../features/userApi";
import { IPublicRoute } from "../../interface/IAuth";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";
import { Component } from "react";

const PublicRoute:React.FC<IPublicRoute> = ({component: RouteComponent}) => {
  const [cookies] = useCookies(['loggedIn']);
  const location = useLocation(); 

  const user = userApi.endpoints.getCurrentUser.useQueryState(null, {
    selectFromResult: ({data}) => data
  }); 

  console.log(user);
  return <div></div>
  // return (cookies.loggedIn || user) &&
  //   (roles.some(e => user?.roles.includes(e)) ? true : false) ? (
  //     RouteComponent
  // ) : cookies.loggedIn && user ? (
  //   <Navigate to='/unauthorized' state={{ from: location }} replace />
  // ) : (
  //   <Navigate to='/signin' state={{ from: location }} replace />
  // );

}

export default PublicRoute;

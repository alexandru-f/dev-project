import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { userApi } from "../../features/userApi";
import { IPrivateRouteProps } from "../../interface/IAuth";
import AccessDenied from "./AccessDenied";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";


const PrivateRoute:React.FC<IPrivateRouteProps> = ({component: RouteComponent, roles}) => {
  const [cookies] = useCookies(['loggedIn']);
  const location = useLocation(); 
  const {isLoading, isFetching} = userApi.endpoints.getCurrentUser.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true
  });

  const loading = isLoading || isFetching;
  const user = userApi.endpoints.getCurrentUser.useQueryState(null, {
    selectFromResult: ({data}) => data
  });
  
  if (loading) {
    return <FullScreenLoader />
  }
  console.log(cookies.loggedIn);
  console.log(user);
  
  return (cookies.loggedIn || user) &&
    (roles.some(e => user?.roles.includes(e)) ? true : false) ? (
      RouteComponent
  ) : cookies.loggedIn && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace />
  );

}

export default PrivateRoute;
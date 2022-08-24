import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { userApi } from "../../features/userApi";
import { IPrivateRoute} from "../../interface/IAuth";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";


const PrivateRoute:React.FC<IPrivateRoute> = ({component: RouteComponent, roles}) => {
  const [cookies] = useCookies(['loggedIn']);
  const location = useLocation(); 

  const {isLoading, isFetching} = userApi.endpoints.getCurrentUser.useQuery(null, {
    skip: !cookies.loggedIn,
    refetchOnMountOrArgChange: true
  });
  
   
  const loading = isLoading || isFetching;
  const user = userApi.endpoints.getCurrentUser.useQueryState(null, {
    selectFromResult: ({data}) => data
  });

  if (loading) {
    return <FullScreenLoader />
  }

  return (cookies.loggedIn || user) &&
    (roles.some(role => user?.roles.includes(role)) ? true : false) ? (
      RouteComponent
  ) : cookies.loggedIn && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace />
  );

}

export default PrivateRoute;

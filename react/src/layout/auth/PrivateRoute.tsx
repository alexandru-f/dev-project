import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser, selectIsAuthenticated } from "../../features/auth-slice";
import { IPrivateRouteProps } from "../../interface/IAuth";
import AccessDenied from "./AccessDenied";



const PrivateRoute:React.FC<IPrivateRouteProps> = ({component: RouteComponent, roles}) => {
  
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userHasRequiredRole = user && roles.filter(e => user.roles.includes(e)).length > 0 ? true : false;
  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />
  }
  
  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />
  }

  return <Navigate to="/login" />

}

export default PrivateRoute;
import Dashboard from "../views/admin/Dashboard";
import PageNotFound from "../components/PageNotFound";
import IRoute from "../interfaces/route";

const routes: Array<IRoute> = [
  
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound
  }
];

export default routes;
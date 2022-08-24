import { ROLE } from "../../interface/IAuth";

const routes = [
  {
    name: "Dashboard",
    path: "/app/dashboard",
    roles: [ROLE.ADMIN, ROLE.USER]
  },
  {
    name: "Manage",
    path: "/app/manage",
    roles: [ROLE.ADMIN]
  },
  {
    name: "Subscriptions",
    path: "/app/subscriptions",
    roles: [ROLE.ADMIN, ROLE.USER]
  },
  {
    name: "Receipts",
    path: "/app/receipts",
    roles: [ROLE.ADMIN, ROLE.USER]
  }];
  export default routes;
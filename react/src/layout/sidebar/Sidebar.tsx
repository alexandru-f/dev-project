import { Dashboard, Subscriptions, Receipt, SupervisorAccount } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import useStyles from './Sidebar.styles';
import { Link, useLocation } from 'react-router-dom';
import MenuRoutes from './MenuRoutes';
import IMenuInterface from '../../interface/IMenuItems';
import { useAppSelector } from '../../app/hooks';

const SideBar = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const {company} = useAppSelector((state) => state.auth.user) || {};
  const user = useAppSelector((state) => state.auth.user); 

  const displayMenu = (routes: IMenuInterface[])=> {
    return routes.map((item, index) => {
      const path = item["path"];
      const name = item["name"];
      const routeRoles = item["roles"];
      if (!routeRoles.some(role => user?.roles.includes(role))) {
        return false;
      }
      const currentItemHightlight = pathname.includes(path) ? classes.currentItemHightlight : '';
      const divClassName = `${currentItemHightlight}`;
      return (
      <Link 
        className={`${classes.anchorTags} ${divClassName}`}
        key={index}
        to={path}>
        <div className={classes.item}>
          {
            {
              'Dashboard': <Dashboard className={classes.icon}/>,
              'Manage': <SupervisorAccount className={classes.icon} />,
              'Subscriptions': <Subscriptions className={classes.icon}/>,
              'Receipts': <Receipt className={classes.icon}/>
            }[name]
          }
          <Typography className={classes.text}>{item["name"]}</Typography>
        </div>
      </Link>
      );
    });
  }
  return (
    <Container 
      className={classes.container}>
        <Typography className={classes.company} variant="h6" component="div">
          {company}
        </Typography>
        {displayMenu(MenuRoutes)}
    </Container>  
  );

}

export default SideBar;
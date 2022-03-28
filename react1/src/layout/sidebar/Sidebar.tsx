import { Home, Dashboard, Subscriptions, Receipt } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import useStyles from './Sidebar.styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '../../theme';
import { Link, useLocation } from 'react-router-dom';
import MenuRoutes from './MenuRoutes';
import IMenuInterface from '../../interface/IMenuItems';

const SideBar = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const displayMenu = (routes: IMenuInterface[])=> {
    return routes.map((item, index) => {
      const path = item["path"];
      const name = item["name"];
      const currentItemHightlight = pathname.includes(path) ? classes.currentItemHightlight : '';
      const divClassName = `${classes.item} ${currentItemHightlight}`;
      return (
      <Link 
        className={classes.anchorTags}
        key={index}
        to={path}>
        <div className={divClassName}>
          {
            {
              'Home': <Home className={classes.icon}/>,
              'Dashboard': <Dashboard className={classes.icon}/>,
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
      disableGutters={useMediaQuery(theme.breakpoints.between("sm", "md"))} 
      className={classes.container}>
        {displayMenu(MenuRoutes)}
    </Container>  
  );

}

export default SideBar;
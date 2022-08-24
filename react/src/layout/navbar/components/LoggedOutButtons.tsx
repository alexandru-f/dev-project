import Box from "@mui/material/Box";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { INavBar } from "../../../interface/IApp";
import useStyles from "../Navbar.styles";

const LoggedOutButtons:React.FC<INavBar> = ({currentPathName}) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const pathNameMappings = {
    '/signin': 'Sign in',
    '/signup': 'Sign up',
    '/': 'Home'
  }

  let firstButtonUrl;
  let secondButtonUrl;

  if (currentPathName === '/signin') {
    firstButtonUrl = '/';
    secondButtonUrl= '/signup'
  }
  if (currentPathName === '/signup') {
    firstButtonUrl = '/';
    secondButtonUrl = '/signin'
  }
  if (currentPathName === '/') {
    firstButtonUrl = '/signin';
    secondButtonUrl = '/signup'
  }

  return ( 
    <Box sx={{display: {xs: "none", sm: "flex"} }}>
      <Button 
        sx={{marginRight: '15px'}}
        className={classes.button}
        variant="contained"
        onClick={() => navigate(firstButtonUrl)}
      >
          {pathNameMappings[firstButtonUrl]}
      </Button>
      <Button 
        className={classes.button}
        variant="contained"
        onClick={() => navigate(secondButtonUrl)}
      >
        {pathNameMappings[secondButtonUrl]}
      </Button>        
    </Box>) ;
}

export default LoggedOutButtons; 
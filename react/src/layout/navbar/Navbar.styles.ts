import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  icons: {
    display: "flex",
    alignItems: "center" 
  },
  header: {
   backgroundColor: 'transparent',
   boxShadow: 'none' 
  },
  badges: {
    marginRight: theme.spacing(3)
  },
  toolbar: {
    justifyContent: "space-between"
  },
  button: {
    '&.MuiButton-root': {
      background: '#1976d2',
      color: 'rgb(255, 255, 255)'
    },
    '&.MuiSvgIcon-root': {
      fontSize: theme.spacing(3)
    }
  },
  userMenuButton: {
    borderRadius: '0',
    border: 0,
    color: 'rgba(58, 53, 65, 0.87)',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    
  },

}));

export default useStyles;

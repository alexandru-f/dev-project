import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  icons: {
    display: "flex",
    alignItems: "center" 
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
    }
  }
}));

export default useStyles;

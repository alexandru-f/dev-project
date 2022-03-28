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
  }
}));

export default useStyles;

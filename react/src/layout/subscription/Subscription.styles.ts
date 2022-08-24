import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { theme } from "../../theme";

const useStyles = makeStyles((theme: Theme) => ({
  subsIcons: {
    width: "30px",
    maxWidth: "100%",
    height: "auto",
    paddingRight: "15px"
  },
  listItems: {
    display: "flex",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "5px"
  },
  root: {
    '&.MuiContainer-root': {
      padding: theme.spacing(6),
      minHeight: "100vh",
      maxWidth: 'none'
    },
  },
  boxHeader: {
    display: 'flex',
    padding: '30px 20px 20px 20px'
  }

}));

export default useStyles;

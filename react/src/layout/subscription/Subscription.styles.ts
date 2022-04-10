import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { palette } from "@mui/system";
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
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      paddingTop: theme.spacing(6),
      backgroundColor: "#eee",
      height: "100vh"
    },
  },
  boxHeader: {
    display: 'flex',
    padding: '30px 20px 20px 20px'
  }

}));

export default useStyles;

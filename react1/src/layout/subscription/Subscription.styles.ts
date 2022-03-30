import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { palette } from "@mui/system";
import { theme } from "../../theme";

const useStyles = makeStyles((theme: Theme) => ({
  // subscriptionTableContainer: {
  //   paddingTop: theme.spacing(4),
  //   paddingLeft: theme.spacing(4),
  //   paddingRight: theme.spacing(4)
  // }
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
  tableCell: {
    display: "flex",
    alignItems: "center"
  },
  table: {
    "& td": {
      fontSize: '1rem',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '16px',
      paddingRight: '16px'
    }
  },

  root: {
    '&.MuiContainer-root': {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      paddingTop: theme.spacing(4),
      backgroundColor: "#eee",
      height: "100vh"
    }
  }

}));

export default useStyles;

import { NoEncryption } from "@mui/icons-material";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { palette } from "@mui/system";
import { theme } from "../../theme";

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
      '&:hover': {
        color: "rgb(25, 118, 210)"
      }
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px"
    }
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    }
  },
  container: {
    paddingTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    [theme.breakpoints.between("sm", "md")]: {
      paddingLeft: "10px"
    },
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7"
    }
  },
  anchorTags: {
    textDecoration: "none",
    color: "inherit"
  },
  currentItemHightlight: {
    color: "rgb(25, 118, 210)"
  },
  company: {
    marginBottom: '24px!important'
  }
}));

export default useStyles;

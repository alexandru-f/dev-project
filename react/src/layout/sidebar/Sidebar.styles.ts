import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.spacing(3)
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
    paddingLeft: 0,
    height: "100vh",
    [theme.breakpoints.between("sm", "md")]: {
      paddingLeft: theme.spacing(1)
    },
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "rgb(40, 36, 61)",
      color: "rgba(231, 227, 252, 0.87)",
    }
  },
  anchorTags: {
    textDecoration: "none",
    color: "inherit",
    marginTop: theme.spacing(1),
    display: 'block',
    padding: theme.spacing(1),
    paddingLeft: 0,
    borderRadius: '0px 100px 100px 0px',
    transition: 'padding-left 0.25s ease-in-out 0s',
    [theme.breakpoints.up("sm")]: {
      '&:hover': {
        backgroundColor: 'rgba(231, 227, 252, 0.03)'
      }
    },
  },
  currentItemHightlight: {
    boxShadow: 'rgb(58 53 65 / 42%) 0px 4px 8px -4px',
    backgroundImage: 'linear-gradient(98deg, rgb(106, 205, 255), rgb(22, 177, 255) 94%)'
  },
  company: {
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3)
  }
}));

export default useStyles;

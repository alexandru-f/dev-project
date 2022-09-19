import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const globalUseStyles = makeStyles((theme: Theme) => ({
  pageContainer: {
    padding: theme.spacing(6),
    minHeight: "100vh",
    maxWidth: 'none'
  },
  tableBoxHeader: {
    display: 'flex',
    padding: '30px 20px 20px 20px'
  },
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
  }
}));

export default globalUseStyles;

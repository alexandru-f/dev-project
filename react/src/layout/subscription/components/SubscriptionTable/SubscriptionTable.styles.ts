import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { palette } from "@mui/system";
import { theme } from "../../../../theme";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    "& td": {
      fontSize: '1rem',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '16px',
      paddingRight: '16px'
    },
    "& tbody tr:hover": {
      backgroundColor: '#F3F3F3'
    },
    "& thead": {
      backgroundColor: 'rgb(249, 250, 252)'
    },
    "& th": {
      color: theme.palette.text.secondary
    },
  },
  subsIcons: {
    width: "30px",
    maxWidth: "100%",
    height: "auto",
    paddingRight: "15px"
  },
  tableCell: {
    display: "flex",
    alignItems: "center"
  },
  tableInnerContainer: {
    display: 'flex',
    paddingTop: '20px',
    paddingBottom: '20px',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default useStyles;

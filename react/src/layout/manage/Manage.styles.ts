import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiContainer-root': {
      padding: theme.spacing(6),
      maxWidth: 'none',
      backgroundColor: "#eee",
      minHeight: "100vh",
      color: '#555555'
    },
  },
  item: {
    background: '#ffffff',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)'
  }
}));

export default useStyles;

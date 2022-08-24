import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiContainer-root': {
      padding: theme.spacing(6),
      maxWidth: 'none',
      minHeight: "100vh",
      color: '#555555'
    },
  },
  text: {
    color: '#555555'
  },
}));

export default useStyles;

import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({ 
 mainContainer: {
    display: 'flex', 
    justifyContent: 'center',
    paddingTop: '80px',
    flexDirection: 'column', 
    alignItems: 'center'
 },
 headerText: {
  '&.MuiTypography-root': {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'rgb(85, 85, 85)',
    [theme.breakpoints.down("sm")]: {
      fontSize: '30px'
    },
  },
 },
 button: {
  '&.MuiButton-root': {
    marginTop: '-30px'
   }
 }
}));

export default useStyles;

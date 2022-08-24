import { Box, Typography } from "@mui/material";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import animation from '../../lotties/404-animation.json';
import useStyles from "./NotFound.styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

  const classes = useStyles();
  const lottieContainer = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (lottieContainer.current) {
      lottie.loadAnimation({
        container: lottieContainer.current,
        animationData: animation,
        autoplay: false,
        loop: false
      });
      lottie.play();
    }
  }, [lottieContainer]);
  return (
    <Box className={classes.mainContainer}>
      <Box><Typography fontWeight="fontWeightBold" className={classes.headerText} variant="h2" display='block'>Page not found</Typography></Box>
      <Box sx={{maxWidth: '300px'}} ref={lottieContainer}></Box>
        <Button 
          className={classes.button}
          variant="contained"
          onClick={() => navigate(-1)}
        >
            Go to previous page
        </Button> 
    </Box>
  );
}

export default NotFound;
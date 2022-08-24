import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import useStyles from './Navbar.styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logOut } from '../../features/auth-slice';
import { useLogoutUserMutation } from '../../features/authApi';
import { useNavigate } from 'react-router-dom';
import { extractFirstLetter, isFetchBaseQueryError } from '../../Helpers/Helpers';
import { useSnackbar, VariantType } from 'notistack';
import { Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      content: '""',
    },
  }
}));


const Navbar:React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen: boolean = Boolean(anchorEl);
  const isMobileMenuOpen: boolean = Boolean(mobileAnchorEl);
  const dispatch = useAppDispatch();
  const [logoutUser, {isLoading, isSuccess, error, isError}] = useLogoutUserMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const user = useAppSelector((state) => state.auth.user);
  const menuId = "primary-search-account-menu";
  
  const handleUserLogout = () => {
      logoutUser(); 
      handleMenuClose();
  }


  useEffect(() => {
    if (isSuccess) {
      dispatch(logOut());
      navigate('/');
    } 

    if (isError) {
      if (error && isFetchBaseQueryError(error)) {
        const variant: VariantType = 'error';
          enqueueSnackbar('Could not log you out', {variant})
      }
    }
  }, [isLoading]);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      PaperProps={{
        style: {
          width: 150
        }
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >      
    <MenuItem href='/profile'>Profile</MenuItem>
    <MenuItem onClick={handleUserLogout}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchorEl(event.currentTarget);
  }

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  }

  const extractUserInitials = () => {
    if (user) {
      return extractFirstLetter(user.firstName).toUpperCase() + extractFirstLetter(user.lastName).toUpperCase();
    }
  }

  const renderMobileMenu = (
    <Menu 
      anchorEl={mobileAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
              <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
 

  return (
    <Box sx={{ flexGrow: 0 }}>
    <AppBar className={classes.header} elevation={1} position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
        </Typography>
          <Box sx={{ display: {xs: "none", sm: "flex"} }}>
            <IconButton
              className={classes.userMenuButton}
              onClick={handleMenuOpen}
            >
              {/* <Badge
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                badgeContent={<OnlineBullet />}
              >
                <Avatar>
                  {extractUserInitials()}
                </Avatar>
              </Badge> */}
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar>
                  {extractUserInitials()}
                </Avatar>              
              </StyledBadge>
            </IconButton>
          </Box>  
          <Box sx={{display: {xs: "flex", sm: "none"}}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
              aria-controls={mobileMenuId}
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
      </Toolbar>
    </AppBar>
    {renderMenu}
    {renderMobileMenu}
  </Box>
  );
};

export default Navbar;

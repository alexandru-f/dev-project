import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IDecodedJwt, ISignInData} from '../../interface/IApi'
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';
import { useSnackbar, VariantType } from 'notistack';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useLoginUserMutation } from '../../features/authApi';
import { isFetchBaseQueryError } from '../../Helpers/Helpers';

const theme = createTheme();

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [loginUser, {
    isSuccess,
    isLoading,
    isError,
    error
  }] = useLoginUserMutation();
  const [passwordVisibility, setShowPasswordVisibility] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  /* Functions */
  const onSubmit = data => {
    const requestBody: ISignInData = {
      email: data.email,
      password: data.password,
    }

    signInUser(requestBody);
  }

  const signInUser = (requestBody: ISignInData) => {
      loginUser(requestBody);
  }

  const handleClickShowPassword = () => {
    setShowPasswordVisibility(prevState => !prevState);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleHomeRedirect = () => {
    navigate("/home");
  }
  useEffect(() => {
    if (isSuccess) {
      handleHomeRedirect();
    }
    
    if (isError) {
      if (error && isFetchBaseQueryError(error)) {
        const variant: VariantType = 'error';
        if (error.status >= 500) {  
          enqueueSnackbar('There was a server error. Please try again!', {variant});
        } else {  
          enqueueSnackbar('Incorrect email or password', {variant})
        }
      } 
    }
  }, [isLoading]);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register('email')}
                  error={errors.email ? true : false}
                  helperText={errors.email && errors.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={passwordVisibility ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  {...register('password')}
                  error={errors.password ? true : false}
                  helperText={errors.password && errors.password.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                      <IconButton
                        name="showPassword"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              loading={isLoading}
              loadingIndicator="Loading..."
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </LoadingButton>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

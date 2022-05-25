import Avatar from '@mui/material/Avatar';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {ICompanyRegistrationData} from '../../interface/IApi'
import LoadingButton from '@mui/lab/LoadingButton';
import useWindowDimensions from '../../app/useWindowDimensions';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import lottie from "lottie-web";
import animationSuccessData from '../../lotties/success-checkmark.json';
import {useNavigate} from 'react-router-dom';
import { useSnackbar, VariantType } from 'notistack';
import {isFetchBaseQueryError} from '../../Helpers/Helpers';
import { PasswordAndConfirmPasswordVisibility } from '../../interface/IAuth';
import { useSignUpUserAndCompanyMutation } from '../../features/authApi';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  companyName: Yup.string().required('Company name is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
});


export default function SignUp() {
  
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [signUpUserAndCompany, {
    error: signUpError,
    isSuccess,
    isLoading,
  }] = useSignUpUserAndCompanyMutation();
  const [passwordVisibility, setShowPasswordVisibility] = useState<PasswordAndConfirmPasswordVisibility>({
    showPassword: false,
    showConfirmPassword: false
  });
  const { height: windowHeight } = useWindowDimensions();
  const elementRef = useRef<HTMLElement>(null);
  const lottieContainer = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  /* Functions */
  const onSubmit = (data) => {
    const requestBody: ICompanyRegistrationData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      companyName: data.companyName,
      password: data.password,
      confirmPassword: data.confirmPassword
    }

    signUpUserAndCompanyHandler(requestBody);
  }

  const signUpUserAndCompanyHandler = async (requestBody: ICompanyRegistrationData) => {
    await signUpUserAndCompany(requestBody);
  }

  const handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    let {name} = event.currentTarget;
    
    setShowPasswordVisibility(prevState => ({
      ...prevState,
      [name]: name === 'showPassword' ? !prevState.showPassword : !prevState.showConfirmPassword
    }));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRedirect = () => {
    navigate("/signin");
  }

  useLayoutEffect(() => {
    if (elementRef.current === null) return;
    const divHeight = elementRef.current.clientHeight;
    const lottieAnimationHeight = 250;
    elementRef.current.style.marginTop = `${((windowHeight - (divHeight + lottieAnimationHeight + 120)) / 2)}px`;
  }, [isSuccess, windowHeight]);

  useEffect(() => {
    if (lottieContainer.current && isSuccess) {
      lottie.loadAnimation({
        container: lottieContainer.current,
        animationData: animationSuccessData,
        autoplay: false,
        loop: false
      });
      lottie.play();
    }
  }, [lottieContainer, isSuccess]);
  
  useEffect(() => {
      if (signUpError && isFetchBaseQueryError(signUpError)) {
        const variant: VariantType = 'error';
        if (signUpError.status >= 500) {  
          enqueueSnackbar('There was a server error. Please try again!', {variant});
        } else {  
          enqueueSnackbar('Email address or company name already exists!', {variant})
        }
      }
    }, [enqueueSnackbar, signUpError]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: isSuccess ? 0 : 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isSuccess ? <Box ref={elementRef} sx={{textAlign: 'center'}} >
            <Box ref={lottieContainer}></Box>
            <Box sx={{marginTop: '20px'}}>You have been successfully registered! </Box>
            <Button
              onClick={handleRedirect}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Go to Login
            </Button>
        </Box> :
        <>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  // name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register('firstName')}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName && errors.firstName.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  {...register('lastName')}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName && errors.lastName.message}
                />
              </Grid>
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
                  id="companyName"
                  label="Company Name"
                  autoComplete="company-name"
                  {...register('companyName')}
                  error={errors.companyName ? true : false}
                  helperText={errors.companyName && errors.companyName.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={passwordVisibility.showPassword ? 'text' : 'password'}
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
                        {passwordVisibility.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type={passwordVisibility.showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword ? true : false}
                  helperText={errors.confirmPassword && errors.confirmPassword.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                      <IconButton
                        name="showConfirmPassword"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {passwordVisibility.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              Sign Up
            </LoadingButton>
          </Box>
          </>}
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
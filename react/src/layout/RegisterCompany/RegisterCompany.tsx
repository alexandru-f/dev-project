import Avatar from '@mui/material/Avatar';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {CompanyRegistrationData} from '../../interface/IApi'
import { useSignUpUserAndCompanyMutation } from '../../features/userApi';
import LoadingButton from '@mui/lab/LoadingButton';
import useWindowDimensions from '../../app/useWindowDimensions';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useLottie } from "lottie-react";
import animationSuccessData from '../../lotties/success-checkmark.json';

interface PasswordVisibility {
  showPassword: boolean;
  showConfirmPassword: boolean;
}

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

const lottieOptions = {
  animationData: animationSuccessData,
  loop: true,
  autoplay: true
}

export default function SignUp() {
  
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [signUpUserAndCompany, {
    isLoading,
    isError
  }] = useSignUpUserAndCompanyMutation();
  const [passwordVisibility, setShowPasswordVisibility] = useState<PasswordVisibility>({
    showPassword: false,
    showConfirmPassword: false
  });
  const { height: windowHeight } = useWindowDimensions();
  const elementRef = useRef<HTMLElement>(null);
  const { View } = useLottie(lottieOptions, {maxWidth: '250px', margin: '0 auto'});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  /* Functions */
  const onSubmit = data => {
    setIsSuccess(true);
    const requestBody: CompanyRegistrationData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      companyName: data.companyName,
      password: data.password,
      confirmPassword: data.confirmPassword
    }

    // signUpUserAndCompanyHandler(requestBody);
  }

  const signUpUserAndCompanyHandler = async (requestBody: CompanyRegistrationData) => {
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
  useLayoutEffect(() => {
    if (elementRef.current === null) return;
    const divHeight = elementRef.current.clientHeight;
    const lottieAnimationHeight = 250;
    elementRef.current.style.marginTop = `${((windowHeight - (divHeight + lottieAnimationHeight + 70)) / 2)}px`;
  }, [isSuccess, windowHeight]);

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
          {isSuccess ? <Box ref={elementRef} sx={{textAlign: 'center'}} >
            {isSuccess && View}
            You have been successfully registered! 
            <Button
              type="submit"
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
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
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
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> */}
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
          </>}
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
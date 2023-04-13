import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Alert } from '@mui/material'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import { userRegisterRequest, userRegisterSuccess, userRegisterFailed } from '../../features/user/userSlice'
import { useDispatch } from 'react-redux';
import { userRegisterReq } from '../../apis/index'
import { useState, useEffect } from 'react'

const theme = createTheme();

export default function Register() {
  const [showAlert, setShowSetAlert] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const registerReq = async (name, email, password) => {
    try {
      dispatch(userRegisterRequest());
      const response = await userRegisterReq(name, email, password);
      dispatch(userRegisterSuccess(response.data));
      setShowSetAlert(true);
      setTimeout(() => {
        navigate('/user/login');
      }, 3000)
    } catch (error) {
      dispatch(userRegisterFailed(error));
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowSetAlert(false);
    }, 3000)
  }, [showAlert])
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    registerReq(data.name, data.email, data.password);
  }

  if (showAlert) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert style={{ padding: '20px', fontSize: '24px' }} severity="success">Register success! Redirecting to login page...</Alert>
      </Box>

    )
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            pt: 5,
            pb: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="name"
                  {...register('name', {
                    required: true,
                    minLength: 6
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register('email', {
                    required: true,
                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: true,
                    minLength: 6
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  {...register('confirmPassword', {
                    required: true,
                    minLength: 6,
                    validate: () => {
                      if (watch('password') != watch('confirmPassword')) {
                        return "Your password doesn't not match";
                      }
                    }
                  })}
                />
              </Grid>
              {Object.keys(errors).length !== 0 && (
                <Grid item xs={12}>
                  {errors.name?.type === 'required' &&
                    <Alert sx={{ my: 0.5 }} severity="error">
                      Username is required
                    </Alert>}
                  {errors.name?.type === 'minLength' &&
                    <Alert sx={{ my: 0.5 }} severity="error">
                      Username must have at least 6 characters
                    </Alert>}
                  {errors.email?.type === 'required' &&
                    <Alert sx={{ my: 0.5 }} severity="error">
                      Email is required
                    </Alert>}
                  {errors.email?.type === 'pattern' &&
                    <Alert sx={{ my: 0.5 }} severity="error">
                      Email is not valid
                    </Alert>}
                  {errors.password?.type === 'required' &&
                    <Alert sx={{ my: 0.5 }} severity="error">
                      Password is required
                    </Alert>}
                  {errors.password?.type === 'minLength' &&
                    <Alert sx={{ my: 0.5 }} severity="error">
                      Password must have at least 6 characters
                    </Alert>}
                  {errors.confirmPassword?.type === 'minLength' &&
                    <Alert sx={{ my: 0.5 }} severity="error">
                      Confirm Password must have at least 6 characters
                    </Alert>}
                  {errors.confirmPassword?.type === 'required' &&
                    <Alert sx={{ my: 0.5 }} severity="error">
                      Confirm password is required
                    </Alert>}
                  {errors.confirmPassword?.type === 'validate' &&
                    <Alert sx={{ my: 0.5 }} severity="error">
                      Password doesn't match
                    </Alert>}
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/user/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}
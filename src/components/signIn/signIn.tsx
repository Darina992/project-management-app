import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import Zoom from '@mui/material/Zoom';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { store, RootState } from '../../store/index';
import { UserState } from '../../store/userReducer';
import { signInUser, resetAuth } from '../../store/userReducer';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignInFormData } from '../../types/userTypes';

export default function SignIn() {
  const state: UserState = useSelector((state: RootState) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    store.dispatch(signInUser(data));
  };

  const onErrors: SubmitErrorHandler<SignInFormData> = (errors) => console.error(errors);

  React.useEffect(() => {
    if (state.isAuth) {
      navigate('/main');
    }
  }, [state.isAuth]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit, onErrors)}
          onChange={() => dispatch(resetAuth())}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            autoComplete="login"
            autoFocus
            {...register('login', { required: true })}
            error={errors.login && true}
            helperText={errors.login && 'Please,enter your login!'}
          />
          {state.showAlert && (
            <Zoom in={true} style={{ transition: '3s' }}>
              {<Alert severity="error">User not registered or password not correct!</Alert>}
            </Zoom>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', {
              required: true,
              pattern: /(?=.*[0-9])[0-9a-zA-Z!@#$%^&*]{5,}/g,
            })}
            ///(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
            error={errors.password && true}
            helperText={
              errors.password && 'Please,create a password(letters,numbers,min length is 5)!'
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {state.isLoading && (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={state.isLoading}
            >
              <CircularProgress color="primary" />
            </Backdrop>
          )}
        </Box>
      </Box>
    </Container>
  );
}

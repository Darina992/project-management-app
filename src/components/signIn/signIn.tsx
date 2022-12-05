import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Zoom from '@mui/material/Zoom';
import LinearProgress from '@mui/material/LinearProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { store, RootState } from '../../store/index';
import { UserState } from '../../store/userReducer';
import { signInUser, resetAuth, getUserById } from '../../store/userReducer';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignInFormData } from '../../types/userTypes';

export default function SignIn() {
  const state: UserState = useSelector((state: RootState) => state.user);
  const { translate } = useSelector((state: RootState) => state.langReducer);
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

  React.useEffect(() => {
    if (state.isAuth) {
      navigate('/main');
    }
  }, [state.isAuth]);

  React.useEffect(() => {
    if (state.id) {
      store.dispatch(getUserById());
    }
  }, [state.id]);

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
          {translate.signIn}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => dispatch(resetAuth())}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label={translate.login}
            autoComplete="login"
            autoFocus
            {...register('login', { required: true })}
            error={errors.login && true}
            helperText={errors.login && translate.loginError}
          />
          {state.showAlert && (
            <Zoom in={true} style={{ transition: '3s' }}>
              {<Alert severity="error">{translate.signInAlert}</Alert>}
            </Zoom>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label={translate.password}
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', {
              required: true,
              pattern: /(?=.*[0-9])[0-9a-zA-Z!@#$%^&*]{5,}/g,
            })}
            error={errors.password && true}
            helperText={errors.password && translate.passwordError}
          />
          {state.isLoading && <LinearProgress color="primary" />}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {translate.signIn}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="signUp" variant="body2">
                {translate.signInText}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

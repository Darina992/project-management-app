import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
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
import { theme } from '../../theme/theme';
import { ThemeProvider } from '@mui/material';
import { INewUser } from '../../api/typesApi';
import { validateLogins, validatePasswords } from '../../utils/utils';
//import { useSelector } from 'react-redux';
import { RootState, store } from '../../store/index';
import { UserState, createNewUser } from '../../store/reducer';

export default function SignUp() {
  //const state: UserState = useSelector((state: RootState) => state.user);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isLoginValid, setIsLoginValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo: INewUser = {
      name: data.get('name') as string,
      login: data.get('login') as string,
      password: data.get('password') as string,
    };
    if (isNameValid && isLoginValid && isPasswordValid) {
      store.dispatch(createNewUser(userInfo));
    }
  };

  const validateName = (name: string) => {
    name ? setIsNameValid(true) : setIsNameValid(false);
  };

  const validateLogin = (login: string) => {
    validateLogins(login) ? setIsLoginValid(true) : setIsLoginValid(false);
  };

  const validatePassword = (password: string) => {
    validatePasswords(password) ? setIsPasswordValid(true) : setIsPasswordValid(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={(event) => validateName(event.target.value)}
                  error={!isNameValid}
                  helperText={isNameValid ? '' : 'Empty!'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  autoComplete="email"
                  onChange={(event) => validateLogin(event.target.value)}
                  error={!isLoginValid}
                  helperText={isLoginValid ? '' : 'Empty!'}
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
                  onChange={(event) => validatePassword(event.target.value)}
                  error={!isPasswordValid}
                  helperText={isPasswordValid ? '' : 'Password should contain ...!'}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signIn" variant="body2">
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

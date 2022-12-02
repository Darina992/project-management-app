import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Zoom from '@mui/material/Zoom';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { store, RootState } from '../../store/index';
import { UserState } from '../../store/userReducer';
import { createNewUser, resetReg, signIn } from '../../store/userReducer';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { SignUpFormData } from '../../types/userTypes';
import { useNavigate } from 'react-router-dom';
import { styleModal } from './styles';

export default function SignUp() {
  const state: UserState = useSelector((state: RootState) => state.user);
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const [successReg, setSuccessReg] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormData> = (data: SignUpFormData) => {
    store.dispatch(createNewUser(data));
  };

  const onErrors: SubmitErrorHandler<SignUpFormData> = (errors) => console.error(errors);

  React.useEffect(() => {
    console.log(state);
    if (state.successReg) {
      setSuccessReg(true);
      setTimeout(() => {
        setSuccessReg(false);
        dispatch(signIn());
        navigate('/main');
      }, 1500);
    }
  }, [state.successReg]);

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
          {translate.signUp}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit, onErrors)}
          onChange={() => dispatch(resetReg())}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="name"
                label={translate.name}
                autoFocus
                {...register('name', { required: true })}
                error={errors.name && true}
                helperText={errors.name && translate.nameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="login"
                label={translate.login}
                autoComplete="email"
                {...register('login', { required: true })}
                error={state.isReg ? true : errors.login && true}
                helperText={errors.login && translate.loginError}
              />
              {state.isReg && (
                <Zoom in={true} style={{ transition: '3s' }}>
                  <Alert severity="error">{translate.signUpAlert}</Alert>
                </Zoom>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label={translate.password}
                type="password"
                id="password"
                autoComplete="new-password"
                {...register('password', {
                  required: true,
                  pattern: /(?=.*[0-9])[0-9a-zA-Z!@#$%^&*]{5,}/g,
                })}
                error={errors.password && true}
                helperText={errors.password && translate.passwordError}
              />
            </Grid>
          </Grid>
          {state.isLoading && <LinearProgress color="primary" sx={{ marginTop: '10px' }} />}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {translate.signUp}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="signIn" variant="body2">
                {translate.signUpText}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {successReg && (
        <Modal open={true}>
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {translate.signUpSuccessReg}
            </Typography>
          </Box>
        </Modal>
      )}
    </Container>
  );
}

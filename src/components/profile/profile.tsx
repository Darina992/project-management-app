import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Zoom from '@mui/material/Zoom';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { store, RootState } from '../../store/index';
import { UserState } from '../../store/userReducer';
import Editor from '../../assets/editor.png';
import {
  editUser,
  resetAuth,
  resetSuccessEdit,
  resetSuccessDelete,
  resetUnsuccessDelete,
  showConfirm,
} from '../../store/userReducer';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { SignUpFormData } from '../../types/userTypes';
import { getFromLocalStorage } from '../../utils/utils';
import { style } from './styles';
import { useNavigate } from 'react-router-dom';
import ModalWarning from './ModalWarning';
import ModalConfirm from './ModalConfirm';
import './style.sass';

export default function Profile() {
  const state: UserState = useSelector((state: RootState) => state.user);
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const [successDelete, setSuccessDelete] = React.useState(false);
  const [successEdit, setSuccessEdit] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log(data);
    store.dispatch(editUser(data));
  };

  const onErrors: SubmitErrorHandler<SignUpFormData> = (errors) => console.error(errors);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (state.successEdit) {
      setSuccessEdit(true);
      setTimeout(() => {
        setSuccessEdit(false);
        dispatch(resetSuccessEdit());
      }, 1500);
    }
    if (state.unsuccessDelete) {
      setTimeout(() => {
        dispatch(resetUnsuccessDelete());
      }, 1500);
    }
  }, [state.successEdit, state.unsuccessDelete]);

  React.useEffect(() => {
    if (state.successDelete) {
      setSuccessDelete(true);
      dispatch(resetAuth());
      setTimeout(() => {
        setSuccessDelete(false);
        dispatch(resetAuth());
        dispatch(resetSuccessDelete());
        navigate('/');
      }, 2000);
    }
  }, [state.successDelete]);

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
        <Typography component="h1" variant="h5">
          <strong>{translate.profileEdit}</strong>
        </Typography>
        <Grid
          sx={style.userInfoConteiner}
          justifyContent="space-between"
          className="user-info-conteiner"
        >
          <Box>
            <img src={Editor} />
          </Box>
          <Box sx={style.userInfo}>
            <Box sx={{ m: 1 }}>
              <strong>{translate.name.toUpperCase()}:</strong> {getFromLocalStorage('$name')}
            </Box>
            <Box sx={{ m: 1 }}>
              <strong>{translate.login.toUpperCase()}:</strong> {getFromLocalStorage('$login')}
            </Box>
          </Box>
        </Grid>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit, onErrors)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="name"
                label={translate.name}
                autoFocus
                {...register('name', {
                  required: true,
                  value: getFromLocalStorage('$name') ? getFromLocalStorage('$name')! : '',
                })}
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
                {...register('login', {
                  required: true,
                  value: getFromLocalStorage('$login') ? getFromLocalStorage('$login')! : '',
                })}
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
            {translate.profileEdit}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            onClick={() => dispatch(showConfirm())}
          >
            {translate.profileDelete}
          </Button>
        </Box>
        {state.showConfirm && <ModalConfirm />}
        {successDelete && <ModalWarning text={translate.profileDeleteText} />}
        {state.unsuccessDelete && <ModalWarning text={translate.profileDeleteTextUnsuccess} />}
        {successEdit && <ModalWarning text={translate.profileEditText} />}
      </Box>
    </Container>
  );
}

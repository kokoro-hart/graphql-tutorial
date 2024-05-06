import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getPath, handleApiError } from '@/utils';
import { SignInResponse, User } from '..';
import { useMutation } from '@apollo/client';
import { SIGN_IN, SIGN_UP } from '../gql';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/constants';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export const SignUp = () => {
  const [register, setRegister] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [signUp] = useMutation<{ createUser: User }>(SIGN_UP);
  const [signIn] = useMutation<SignInResponse>(SIGN_IN);
  const navigate = useNavigate();

  const { name, email, password } = register;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signUpInput = { name, email, password };

    try {
      const { data: signUpResponse } = await signUp({
        variables: { createUserInput: signUpInput },
      });
      console.log(signUpResponse);
      if (signUpResponse?.createUser) {
        const signInInput = { email, password };
        const { data: signInResponse } = await signIn({
          variables: { signInInput },
        });
        signInResponse && localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, signInResponse.signIn.accessToken);
        localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) && navigate(getPath.home());
      }
    } catch (error: unknown) {
      handleApiError(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) =>
                    setRegister((p) => ({
                      ...p,
                      name: e.target.value,
                    }))
                  }
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
                  value={email}
                  onChange={(e) =>
                    setRegister((p) => ({
                      ...p,
                      email: e.target.value,
                    }))
                  }
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
                  value={password}
                  onChange={(e) =>
                    setRegister((p) => ({
                      ...p,
                      password: e.target.value,
                    }))
                  }
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={getPath.signIn()} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

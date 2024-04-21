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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import Axios from "../configs/axiosInstance";
import { Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const defaultTheme = createTheme();
    let navigate = useNavigate()

    const handleSubmit = (event) => {
        console.log('Email:', email);
        console.log('Password', password);

        Axios.post("/auth/login",{
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
            console.log(response?.data);
            return navigate("/");
        }).catch((error) => {
            console.log(error);
            console.log(error?.response?.data?.message);
            alert(error?.response?.data?.message);
        })
    }; 
    return (
        <ThemeProvider theme={defaultTheme}>
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                <LoginIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
                <Grid container justify="center">
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}





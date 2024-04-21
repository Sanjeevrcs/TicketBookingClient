import React, { useState } from 'react';
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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Axios from "../configs/axiosInstance";
import { Route, useNavigate } from 'react-router-dom';

export default function Register() {
  const defaultTheme = createTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});

  let navigate = useNavigate()

  const validateInputs = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number is invalid';
    }

    if (!dob) {
      errors.dob = 'Date of Birth is required';
    }

    if (!gender.trim()) {
      errors.gender = 'Gender is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateInputs()) {
      console.log('Form submitted successfully');
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Name:', name);
      console.log('Phone:', phone);
      console.log('Gender:', gender);
      
      var dateObject = new Date(dob);
      var finaldate = dateObject.getDate() + '-' +  (dateObject.getMonth() + 1)  + '-' +  dateObject.getFullYear()
      console.log('DOB:', finaldate);

      Axios.post("/auth/register",{
        email: email,
        password: password,
        name: name,
        phoneNumber: phone,
        dob: finaldate,
        gender: gender

    }).then((response) => {
        console.log(response);
        if (response?.response?.data?.status === "success") {
            navigate("/");
        }
        else {
            alert(response?.response?.data?.message);
            navigate("/login");
        }
    }).catch((error) => {
        console.log(error);
        console.log(error?.response);
        alert(error?.response?.data?.message);
    })
    } else {
      console.log('Form has validation errors');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
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
          <Card sx={{ mt: 3, p: 3, width: '100%', boxShadow: 4 }}>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={!!errors.name}
                      helperText={errors.name}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={gender === 'male'}
                          onChange={(e) => setGender(e.target.checked ? 'male' : 'female')}
                          name="gender"
                          value="male"
                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={gender === 'female'}
                          onChange={(e) => setGender(e.target.checked ? 'female' : 'male')}
                          name="gender"
                          value="female"
                        />
                      }
                      label="Female"
                    />
                    {errors.gender && (
                      <Typography variant="body2" color="error">
                        {errors.gender}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      value={dob}
                      onChange={setDob}
                      fullWidth
                      label="Date of Birth"
                      slotProps={{ textField: { fullWidth: true } }}
                      inputFormat="dd/MM/yyyy"
                      error={!!errors.dob}
                      helperText={errors.dob}
                    />
                  </Grid>
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
                    <Link href="/login" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

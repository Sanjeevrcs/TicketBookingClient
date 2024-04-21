import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Axios from "../configs/axiosInstance";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {  Grid, Card, CardContent, Button, Typography } from '@mui/material';
import {  CardActions, CircularProgress, SvgIcon } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Route, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  

export default function Booking() {

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(null);
    const [locations, setLocations] = useState([]);
    const [trips, setTrips] = useState([]);
    const [tripId, setTripId] = useState("");
    let navigate = useNavigate()

    useEffect(() => {
        console.log("Fetching locations");
        Axios.get("/listall/location")
            .then((response) => {
                console.log("Locations fetched", response?.data?.location);
                setLocations(response?.data?.location);
            })
            .catch((error) => {
                console.log(error);
                console.log(error?.response?.data?.message);
                alert(error?.response?.data?.message);
            })
    }, []);

    const handleDateChange = (e) => {
        setDate(e);
    }

    const handleSearch = () => {
       console.log("Searching for trips");
       console.log("From: " + from);
       console.log("To: " + to);
       var dateObject = new Date(date);
       var finaldate = dateObject.getDate() + '-' +  (dateObject.getMonth() + 1)  + '-' +  dateObject.getFullYear()
    
       
       setFrom("660b61be8c3a057b37234ef9")
       setTo("660b61be8c3a057b37234efc")
       finaldate = "15-09-2024"
       
       Axios.get("/searchBus", {params :{
               from: from,
               to: to,
               date: finaldate
           }})
       .then((response) => {
           console.log("Trips fetched", response?.data?.buses);
           setTrips(response?.data?.buses);
           setTripId(response?.data?.buses[0]?.tripId);
       })
       .catch((error) => {
           console.log(error);
           console.log(error?.response?.data?.message);
           alert(error?.response?.data?.message);
       })
    }

    const handleBookSeats = (trip) => {
        return navigate("/bookSeat/" + trip + "/" + tripId );
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Card sx={{ width: '75%', padding: '20px' }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={3}>
                               <FormControl fullWidth>
                                    <InputLabel id="fromLocation">From Location</InputLabel>
                                    <Select
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        >
                                        {locations.map((location) => (
                                            <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="toLocation">To Location</InputLabel>
                                    <Select
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        >
                                        {locations.map((location) => (
                                            <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <DatePicker value={date} onChange={handleDateChange}  />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleSearch}>Search</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
      
           
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
                padding: 2,
                marginTop: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                
            }}
            >
            {trips && trips.map((trip, index) => (
                <Card
                key={index}
                sx={{
                    width: 300,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                    transform: 'scale(1.05)',
                    },
                }}
                >
                <CardContent>
                    <Typography variant="h5" component="div">
                    {trip.busName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Bus Type: {trip.busType}
                    </Typography>
                    <Typography variant="body2">
                    Bus Number: {trip.busNumber}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookSeats(trip.busId)}
                    sx={{ width: '100%' }}
                    >
                    Book Seats
                    </Button>
                </CardActions>
                </Card>
            ))}
            </Box>

        </>
    )
}

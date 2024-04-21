import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "../configs/axiosInstance";
import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import NavBar from '../components/NavBar';
import '../css/seats.css';

export default function BookSeat() {
    const { busId, tripId } = useParams();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedID, setSelectedID] = useState([]);
    const [busName, setBusName] = useState('');
    const  [cost , setCost] = useState(0);

    const getSeats = () => {
        Axios.get(`/getSeats/${busId}/${ tripId }` )
            .then((response) => {
                console.log(response);
                setSeats(response?.data?.seats);
                setCost(response?.data?.cost);
                setBusName(response?.data?.busName);
            })
            .catch((error) => {
                console.error(error);
            });
        }

    const handleSeatClick = (seatId, id) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatId)) {
                return prevSelectedSeats.filter((seat) => seat !== seatId);
            } else {
                return [...prevSelectedSeats, seatId];
            }
        });
        setSelectedID((prevSelectedID) => {
            if (prevSelectedID.includes(id)) {
                return prevSelectedID.filter((seat) => seat !== id);
            } else {
                return [...prevSelectedID, id];
            }
        });
    };

    const bookSeats =  () => {

        if(selectedSeats.length == 0){
            alert("Please select at least one seat");
            return;
        }

        console.log("Booking seats",tripId);
        Axios.post("/bookSeat/", {
            seatId : selectedID,
            tripId : tripId
        })
        .then((response) => {
            alert("Booked successfully");
            console.log(response?.data);
        })
        .catch((error) => {
            alert(error?.response?.data?.message);
        });
        getSeats();
        setSelectedID([]);
        setSelectedSeats([]);
    };

    useEffect(() => {
        console.log(busId, tripId);
        getSeats()
    }, [busId]);

    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                {/* Bus seating on the left */}
                <Card
                    sx={{
                        flex: 1,
                        padding: '20px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        backgroundColor: '#f5f5f5', // Light gray for bus seating
                    }}
                >
                    <CardContent>
                        <Typography variant="h5">Bus Seating</Typography>
                        <Grid container spacing={1}>
                            {seats && seats.map((seat) => (
                                <Grid item xs={6} key={seat._id}>
                                    <button
                                        className={`seat ${
                                            selectedSeats.includes(seat.seatNumber) ? 'selected' : ''
                                        }`}
                                        onClick={() => {
                                            if (seat.availability) {
                                                handleSeatClick(seat.seatNumber, seat._id);
                                            }
                                        }}
                                        style={{
                                            backgroundColor: !seat.availability
                                                ? '#9e9e9e' // Dark gray for unavailable seats
                                                : selectedSeats.includes(seat.seatNumber)
                                                ? '#4caf50' // Green for selected seats
                                                : '#e0e0e0', // Light gray for available seats
                                            color: !seat.availability
                                                ? 'white' // White text for unavailable seats for contrast
                                                : selectedSeats.includes(seat.seatNumber)
                                                ? 'white' // White text for selected
                                                : 'black', // Black text for available
                                            padding: '10px',
                                            border: '1px solid #b0b0b0',
                                            borderRadius: '4px',
                                            cursor: !seat.availability ? 'not-allowed' : 'pointer', // Pointer only if available
                                        }}
                                        // Disable button if seat is unavailable
                                    >
                                        {seat.seatNumber}
                                    </button>

                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
                <Card
                    sx={{
                        flex: 1,
                        padding: '20px',
                        marginLeft: '20px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        backgroundColor: '#f5f5f5', // Same light gray background
                    }}
                >
                    <CardContent>
                        <Typography variant="h5">Checkout</Typography>
                        <Typography variant="body1">Selected Seats:</Typography>
                        <ul>
                            {selectedSeats.map((seatId) => (
                                <li key={seatId}>{busName} - Seat: {seatId}</li>
                            ))}
                        </ul>
                        <Typography variant="body1">
                            Total Cost: ${selectedSeats.length * (+cost)} 
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={bookSeats} 
                            sx={{ marginTop: '20px' }}
                        >
                            Book Seats
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}


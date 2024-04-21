import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../configs/axiosInstance";
import NavBar from '../components/NavBar';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material'; 
import moment from 'moment'; 

export default function Profile() {
    const [user, setUser] = useState(null); 
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate(); 
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        Axios.get("/profile")
            .then((response) => {
                console.log(response.data);
                setUser(response.data.user);
                setBookings(response.data.bookings); 

            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
                alert(error?.response?.data?.message || "Failed to fetch profile.");
            });

            
    }, [refresh]);

    const cancelBooking = (id) => {
        Axios.post(`/cancelBooking/${id}`)
            .then((response) => {
                console.log(response.data);
                alert("Booking cancelled successfully.");
                navigate("/");
        
            })
            .catch((error) => {
                console.error("Error cancelling booking:", error);
                alert(error?.response?.data?.message || "Failed to cancel booking.");
            });
        setRefresh(true);
    }

    return (
        <>
            <NavBar />

            {user ? ( // If user data is available, display it
               <>
               <Card
                    sx={{
                        maxWidth: 600,
                        margin: '0 auto', // Center the card
                        padding: '20px',
                        marginTop: '3rem',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Profile
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Name</Typography>
                                <Typography variant="body1">{user.name}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6">Email</Typography>
                                <Typography variant="body1">{user.email}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6">Date of Birth</Typography>
                                <Typography variant="body1">{moment(user.dob).format("MMMM Do, YYYY")}</Typography> {/* Format DOB */}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6">Gender</Typography>
                                <Typography variant="body1">{user.gender}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6">Phone Number</Typography>
                                <Typography variant="body1">{user.phoneNumber}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Container maxWidth="md" sx={{ paddingTop: '20px', paddingBottom: '20px' }}> {/* Main container for bookings */}
                <Typography variant="h4" gutterBottom sx={{ marginTop: '3rem' }}>
                    My Bookings
                </Typography>

                <Grid container spacing={3}>
                    {bookings.map((booking,index) => (
                        <Grid item xs={12} md={4} key={index}> 
                            <Card
                                sx={{
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    backgroundColor: '#f5f5f5',
                                    padding: '20px',
                                    marginTop: '3rem',
                                }}

                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Booking Date: {moment(booking.date).format("MMMM Do, YYYY")} {/* Format the date */}
                                    </Typography>

                                    <Typography variant="body1">
                                        Seat Number: {booking.seat.seatNumber} {/* Seat number */}
                                    </Typography>

                                    <Typography variant="body1">
                                        Trip Cost: {booking.trip.cost} {/* Trip cost */}
                                    </Typography>

                                    <Typography variant="body1">
                                        Status: {booking.status} {/* Booking status */}
                                    </Typography>
                                    {booking.status != "Canceled" ? (
                                    <Typography variant="body1">
                                       <button onClick={() => cancelBooking(booking._id)}>Cancel Booking</button>
                                    </Typography>
                                    ) : (
                                       ""
                                    )}
                                    
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            </>
            ) : (
                <Typography variant="h6">Loading profile...</Typography> 
            )}
        </>
    );
}

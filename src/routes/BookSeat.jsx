import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from "../configs/axiosInstance";
import '../css/seats.css';

export default function BookSeat() {
    let { busId, tripId } = useParams();
    
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (seatId) => {
        setSelectedSeats(prevSelectedSeats => {
            if (prevSelectedSeats.includes(seatId)) {
                return prevSelectedSeats.filter(seat => seat !== seatId);
            } else {
                return [...prevSelectedSeats, seatId];
            }
        });
    };

    const bookSeats = () => {
        console.log("Booking seats",tripId);
        Axios.post("/bookSeat/", {
            seatId : selectedSeats,
            tripId : tripId
        })
        .then((response) => {
            alert("Seats booked successfully");
            console.log(response?.data);
        })
        .catch((error) => {
            alert(error?.response?.data?.message);
        });
    };

    useEffect(() => {
        Axios.get("/getSeats/" + busId)
            .then((response) => {
                console.log(response?.data);
                setSeats(response?.data?.seats);
            })
            .catch((error) => {
                alert(error?.response?.data?.message);
            })
    }, []);

    return (
        <>
            <h1>Booking Seats</h1>
            <div className="seat-grid">
                {seats.map(seat => (
                    <button
                        key={seat._id}
                        className={`seat ${selectedSeats.includes(seat._id) ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(seat._id)}
                    >
                        {seat.seatNumber}
                    </button>
                ))}
            </div>
            <div>
                <button onClick={bookSeats}>Book Seats</button>
            </div>
        </> 
    );
}

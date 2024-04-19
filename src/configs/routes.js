import Login from "../routes/Login";
import Register from "../routes/Register";
import Booking from "../routes/Booking";
import BookSeat from "../routes/BookSeat";

const routes = [

    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/",
        component: Booking
    },
    {
        path: "/bookSeat/:busId/:tripId/",
        component: BookSeat
        
    }

]

export default routes;
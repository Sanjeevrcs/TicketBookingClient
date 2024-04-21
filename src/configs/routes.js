import Login from "../routes/Login";
import Register from "../routes/Register";
import Booking from "../routes/Booking";
import BookSeat from "../routes/BookSeat";
import Profile from "../routes/Profile"
import Logout from "../components/Logout";
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
    },
    {
        path: "/profile",
        component : Profile
    },
    {
        path: "/logout",
        component : Logout
    }

]

export default routes;
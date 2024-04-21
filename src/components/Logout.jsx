import Axios from "../configs/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import cookies from 'react-cookies';

export default function Logout() {
    
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(0);



    useEffect(() => {
        Axios.get("/logout")
            .then((response) => {
                console.log(response.data);
                cookies.remove('SessionID');
                navigate("/");
            })
            .catch((error) => {
                console.error("Error logging out:", error);
                alert(error?.response?.data?.message || "Failed to log out.");
            });
        setRefresh(true);
    }, [refresh]);
    
    
    return (
        <div>
            <h1>Logout</h1>
        </div>
    );
}
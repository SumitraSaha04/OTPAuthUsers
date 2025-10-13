
import {Link} from "react-router-dom";
import "./navbar.css"
import { FaAirbnb } from "react-icons/fa";
const  Navbar=()=>{
const user=JSON.parse(localStorage.getItem("user"));

    return(
        <>
        <div className="navbar-container">
            <div className="navbar-logo">
                <FaAirbnb style={{fontSize:"30px",color:"#E63946"}}/>
            </div>
                <Link to="/">Wanderlust</Link>
            <div className="navbar-links">
                <Link to="/home">Home</Link>
               {user?.isAdmin && <Link to="/listings/new">Add new listing</Link>} 
               
                <Link to="/mybookings">My Bookings</Link>
            </div>
        </div>
        </>
    );
}

export default Navbar;
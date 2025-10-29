import { Link } from "react-router-dom";
import "./navbar.css";
import { FaAirbnb } from "react-icons/fa";
import Cookies from "js-cookie";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate=useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
   const user = JSON.parse(localStorage.getItem("user"));

    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (user && accessToken && refreshToken) {
      try {
        setIsLoggedIn(true);
        setUserEmail(user?.email || "User");
       
      } catch (err) {
        console.log("Error from navbar---", err);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin=()=>{
    navigate("/login");
  }

  const handleLogout=()=>{
    Cookies.remove("accessToken",{path:"/"});
    Cookies.remove("refreshToken",{path:"/"});
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUserEmail("");
    setShowMenu(false);

    navigate("/login");
  }

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-logo">
          <FaAirbnb style={{ fontSize: "30px", color: "#E63946" }} />
        </div>
        <Link to="/">Wanderlust</Link>
        <div className="navbar-links">
          <Link to="/home">Home</Link>
          {user?.isAdmin && <Link to="/listings/new">Add new listing</Link>}

          <Link to="/mybookings">My Bookings</Link>
        </div>

        <div className="profile-container">
            <div className="profile-icon"
            onClick={()=>setShowMenu(!showMenu)}>
                <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="Profile Icon" className="profile-icon"/>
                <span className="dots">⋮</span>
            </div>

            {
                showMenu && (
                    <div className="menu">
                        {isLoggedIn ?(
                            <>
                            <p className="menu-user">Hello ! {userEmail}</p>
                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                            </>
                        ):(
                            <button className="login-btn" onClick={handleLogin}>
                                Login
                            </button>
                        )}

                        </div>
                )
            }
        </div>
      </div>
    </>
  );
};

export default Navbar;

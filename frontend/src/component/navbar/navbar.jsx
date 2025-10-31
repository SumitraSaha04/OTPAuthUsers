import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import { FaAirbnb } from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config";
import Logout from "../logout/logout";




const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include", 
      });
      console.log(res.ok);
      if (!res.ok) {
        // not logged in
        setIsLoggedIn(false);
        setUserPhoneNumber(null);
        return;
      }

      const data = await res.json();
      console.log("hi there 2",data);

     

      setIsLoggedIn(true);
      setUserPhoneNumber(data.phoneNumber || "User");
    } catch (err) {
      console.error("Error checking auth:", err);
      setIsLoggedIn(false);
      setUserPhoneNumber(null);
    }
  };

  checkAuth();
}, [location]);


  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserPhoneNumber("");
        setShowMenu(false);
        navigate("/");
      } else {
        console.log("Logout Failed ", data.message);
      }
    } catch (error) {
      console.error("Error Logging out:", error);
    }
  };
  console.log("Userphone number---", userPhoneNumber);
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
          <div className="profile-icon" onClick={() => setShowMenu(!showMenu)}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              alt="Profile Icon"
              className="profile-icon"
            />
          </div>

          {showMenu && (
            <div className="menu">
              {isLoggedIn ? (
                <>
                  <p className="menu-user">+91 {userPhoneNumber}</p>
                 <Logout handleLogout={handleLogout}/>
                </>
              ) : (
                <button className="login-btn" onClick={handleLogin}>
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

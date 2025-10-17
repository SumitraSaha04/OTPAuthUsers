import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Cookies from "js-cookie";

export const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    const accessToken=Cookies.get("accessToken");
    const refreshToken=Cookies.get("refreshToken");
    const userInfo=JSON.parse(localStorage.getItem("user"));
    console.log("UserInfo--from profilejsx",userInfo);

    if(accessToken && refreshToken && userInfo){
      try{
        const userEmail=userInfo?.email;
        setIsLoggedIn(true);
        setUserEmail(userEmail);

      }catch(error){
        console.log("Error from Profile.jsx--",error);
      }
    }

  })



  function handleLogout(){

  
  }

  function handleLogin(){
    navigate("/login");
    
  }
  function handleNameDisplay(){

  }

  
  return (
    <div className="profile-container">
      <div className="Profile-icon" onClick={handleNameDisplay()}>
        <img
          className="profile-img"
          alt="Profile Image"
          src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
        />
      </div>
      <div className="profile-menu">
        <span onClick={() => setShowMenu(!showMenu)}>⋮</span>
      </div>

      {showMenu && (<div className="menu">
        
        {isLoggedIn && (
            <button onClick={handleLogout}>Logout</button>
        ):(
            <button onClick={handleLogin}>Login</button>
        )}
        
        </div>)
        }
    </div>
  );
};

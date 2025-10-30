import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup";
import { getUserInfo } from "./userInfo";
import Game from "./component/game/game";
import Newlist from "./pages/newlist/newlist";
import { Details } from "./pages/details/details";
import { Mybookings } from "./pages/mybookings/mybookings";
import { Reserve } from "./pages/reserve/reserve";



function App() {
  const user=getUserInfo();
 
 
  return (
    <>
     
     <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          {user?.phoneNumber &&  < Route path="/home"element={<Home/>}/>}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/game" element={<Game/>}></Route>
          <Route path="/listings/new" element={<Newlist/>}/>
          <Route path="/listings/new/edit/:hotelId" element={<Newlist/>}/>
          <Route path="/listings/details/:hotelId" element={<Details/>}/>
          <Route path="/reserve" element={<Reserve/>}/>
          <Route path="/mybookings/" element={<Mybookings/>}/>
        </Routes>
      </div>

   
     
    </>
  );
}

export default App;

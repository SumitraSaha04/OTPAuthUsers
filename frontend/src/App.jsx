import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup";
import { getUserInfo } from "./userInfo";
import Game from "./component/game/game";

function App() {
  const user=getUserInfo();
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          {user?.phoneNumber  && <Route path="/home" element={<Home/>} />}
          <Route path="/signup" element={<Signup/>} />
          
          {/* {user?.phoneNumber  && <Route path="/game" element={<Game/>} />} */}
          <Route path="/game" element={<Game/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

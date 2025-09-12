import { useNavigate } from "react-router-dom";
function Home(){
    const navigate=useNavigate();
    function handleNavigate(){
        navigate("/game");
    }
    return(
        <>
       <h1>Home Page</h1>
       <button onClick={handleNavigate}>Go to New Page </button>
        </>
    );

}
export default Home;
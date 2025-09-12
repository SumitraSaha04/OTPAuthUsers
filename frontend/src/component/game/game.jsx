import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./game.css"

const Game = () => {
  // const [message, setMessage] = useState("");
  const [games,setGames]=useState([]);
  // const [newGame,setNewGame]=useState("");

  function handleGame(){

  }

  // function handleAdd(){

  //   const newObj={

  //   }

  // }

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const url = "http://localhost:8080/gameauth/game";
        const response = await fetch(url, {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Data from game.jsx--",data);
        console.log("Data games from game.jsx- -",data.games);
        setGames(data.games); 
      } catch (err) {
        console.error("Error from game.jsx:", err);
        toast.error("Failed to fetch game data");
      }
    };

    fetchMessage();
  }, []);

  return (
    <>
    <div className="game-container"> 
        {/* <input
        autoFocus
        type="text"
        value={newGame}
        placeholder="Enter a Game"
        onChange={handleGame}
        />

        <button className="add-button" >Add</button> */}
        <h1 >Games</h1>
        <div className="lists-container">
            <ol className="lists">
              {games.map((game)=>
                  <li
                  key={game._id}
                  >
                    <span>{game.name}</span>

                    <button className="score">{game.score}</button>

                    <img src={game.url}  alt={game.name}></img>

                    
                  </li>
              
            )
          }

          </ol>
        </div>
    </div>

    </>
  );
};

export default Game;

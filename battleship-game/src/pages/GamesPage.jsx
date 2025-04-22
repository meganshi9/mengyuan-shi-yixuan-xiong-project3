import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { fetchGames, createNewGame } from "../api/api";
import "../styles/PageLayout.css";

function GamesPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    loadGames();
  }, []);

  const handleNewGame = async () => {
    try {
      const newGame = await createNewGame();

      localStorage.setItem("currentGameId", newGame.id);

      navigate("/place-ships");
    } catch (error) {
      console.error("Failed to create game:", error);
    }
  };

  const handleJoinGame = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="pageContainer">
        <h2 className="title">Please log in to access the game lobby.</h2>
      </div>
    );
  }

  return (
    <div className="pageContainer">
      <header className="pageHeader">
        <h2 className="text-2xl font-bold mb-4">Game Lobby</h2>
        <p className="text-gray-600">Create or join a Battleship game.</p>
        <button className="primaryButton mt-4" onClick={handleNewGame}>
          Start New Game
        </button>
      </header>

      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Joinable Games:</h3>
        {games.length === 0 ? (
          <p>No available games at the moment.</p>
        ) : (
          <ul className="space-y-3">
            {games.map((game) => (
              <li
                key={game.id}
                className="flex justify-between items-center bg-white p-4 rounded shadow-md max-w-lg mx-auto"
              >
                <span>
                  Game hosted by <strong>{game.host}</strong>
                </span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleJoinGame(game.id)}
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="pageFooter">
        <p>&copy; 2025 Battleship Game</p>
      </footer>
    </div>
  );
}

export default GamesPage;



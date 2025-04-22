import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useGameContext } from "../contexts/GameContext";
import "../styles/PageLayout.css";

function GamePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const {
    playerBoard,
    aiBoard,
    currentTurn,
    gameOver,
    winner,
    handlePlayerMove,
  } = useGameContext();

  const navigate = useNavigate();

  useEffect(() => {
    const hasShips = playerBoard.some((row) => row.includes("S"));
    if (!hasShips) {
      navigate("/place-ships");
    }
  }, [playerBoard, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="pageContainer">
        <h2 className="title">You must be logged in to play the game.</h2>
      </div>
    );
  }

  return (
    <div className="pageContainer">
      <h2 className="title">
        {gameOver ? `Game Over! ${winner} Won!` : `Current Turn: ${currentTurn}`}
      </h2>

      <div className="boards">
        <div>
          <h3>Opponent's Board</h3>
          <div className="board">
            {aiBoard.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`ai-${rowIndex}-${colIndex}`}
                  className={`tile ${
                    cell === "H" ? "hit" : cell === "M" ? "miss" : ""
                  }`}
                  onClick={() =>
                    isLoggedIn && !gameOver && handlePlayerMove(rowIndex, colIndex)
                  }
                >
                  {cell === "H" ? "💥" : cell === "M" ? "⚪" : ""}
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h3>Your Board</h3>
          <div className="board">
            {playerBoard.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`player-${rowIndex}-${colIndex}`}
                  className={`tile ${
                    cell === "H"
                      ? "hit"
                      : cell === "M"
                      ? "miss"
                      : cell === "S"
                      ? "shipPlaced"
                      : ""
                  }`}
                >
                  {cell === "H" ? "💥" : cell === "M" ? "⚪" : ""}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;


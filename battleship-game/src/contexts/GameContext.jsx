import React, { createContext, useContext, useState } from "react";

export const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const BOARD_SIZE = 10;

  const [playerBoard, setPlayerBoard] = useState(createEmptyBoard());
  const [aiBoard, setAiBoard] = useState(createBoardWithShips());
  const [currentTurn, setCurrentTurn] = useState("Player");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const [shipsToPlace, setShipsToPlace] = useState([
    { id: 1, size: 5, orientation: "horizontal" },
    { id: 2, size: 4, orientation: "horizontal" },
    { id: 3, size: 3, orientation: "horizontal" },
    { id: 4, size: 3, orientation: "horizontal" },
    { id: 5, size: 2, orientation: "horizontal" },
  ]);

  function createEmptyBoard() {
    return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(""));
  }

  function createBoardWithShips() {
    const board = createEmptyBoard();
    let placed = 0;
    while (placed < 5) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      if (board[row][col] === "") {
        board[row][col] = "S";
        placed++;
      }
    }
    return board;
  }

  const rotateShip = (shipId) => {
    setShipsToPlace((prev) =>
      prev.map((ship) =>
        ship.id === shipId
          ? {
              ...ship,
              orientation:
                ship.orientation === "horizontal" ? "vertical" : "horizontal",
            }
          : ship
      )
    );
  };

  const handleShipDrop = (ship, row, col) => {
    const newBoard = playerBoard.map((r) => [...r]);

    const fits = () => {
      for (let i = 0; i < ship.size; i++) {
        const r = ship.orientation === "horizontal" ? row : row + i;
        const c = ship.orientation === "horizontal" ? col + i : col;
        if (
          r >= BOARD_SIZE ||
          c >= BOARD_SIZE ||
          newBoard[r][c] !== ""
        ) {
          return false;
        }
      }
      return true;
    };

    if (!fits()) return;

    for (let i = 0; i < ship.size; i++) {
      const r = ship.orientation === "horizontal" ? row : row + i;
      const c = ship.orientation === "horizontal" ? col + i : col;
      newBoard[r][c] = "S";
    }

    setPlayerBoard(newBoard);
    setShipsToPlace((prev) => prev.filter((s) => s.id !== ship.id));
  };

  const checkWin = (board) => board.every((row) => !row.includes("S"));

  const handlePlayerMove = (row, col) => {
    if (gameOver || currentTurn !== "Player") return;

    const newBoard = aiBoard.map((r) => [...r]);
    const target = newBoard[row][col];
    if (["H", "M"].includes(target)) return;

    newBoard[row][col] = target === "S" ? "H" : "M";
    setAiBoard(newBoard);

    if (checkWin(newBoard)) {
      setGameOver(true);
      setWinner("Player");
    } else {
      setCurrentTurn("AI");
      setTimeout(handleAIMove, 1000);
    }
  };

  const handleAIMove = () => {
    const newBoard = playerBoard.map((r) => [...r]);
    let row, col;
    do {
      row = Math.floor(Math.random() * BOARD_SIZE);
      col = Math.floor(Math.random() * BOARD_SIZE);
    } while (["H", "M"].includes(newBoard[row][col]));

    newBoard[row][col] = newBoard[row][col] === "S" ? "H" : "M";
    setPlayerBoard(newBoard);

    if (checkWin(newBoard)) {
      setGameOver(true);
      setWinner("AI");
    } else {
      setCurrentTurn("Player");
    }
  };

  return (
    <GameContext.Provider
      value={{
        playerBoard,
        setPlayerBoard,
        aiBoard,
        currentTurn,
        gameOver,
        winner,
        handlePlayerMove,
        shipsToPlace,
        handleShipDrop,
        rotateShip,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};



import React, { createContext, useContext, useState, useEffect } from "react";

export const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const BOARD_SIZE = 10;

  const [playerBoard, setPlayerBoard] = useState(createEmptyBoard());
  const [aiBoard, setAiBoard] = useState(createBoardWithShips());
  const [currentTurn, setCurrentTurn] = useState("Player");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => setTimer((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [gameOver]);

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

  const checkWin = (board) => {
    return board.every((row) => !row.includes("S"));
  };

  const handlePlayerMove = (row, col) => {
    if (gameOver || currentTurn !== "Player") return;

    const newBoard = aiBoard.map((r) => [...r]);
    const target = newBoard[row][col];

    if (target === "H" || target === "M") return;

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

  const resetGame = () => {
    setPlayerBoard(createEmptyBoard());
    setAiBoard(createBoardWithShips());
    setCurrentTurn("Player");
    setGameOver(false);
    setWinner(null);
    setTimer(0);
  };

  return (
    <GameContext.Provider
      value={{
        playerBoard,
        aiBoard,
        currentTurn,
        gameOver,
        winner,
        timer,
        handlePlayerMove,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};


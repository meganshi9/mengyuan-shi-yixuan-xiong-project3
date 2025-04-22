import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GamesPage from "./pages/GamesPage";
import GamePage from "./pages/GamePage";
import HighScoresPage from "./pages/HighScoresPage";
import { useAuth } from "./contexts/AuthContext";
import ShipPlacement from "./pages/ShipPlacement"; 

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/games" />} />
        <Route path="/register" element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/games" />} />
        <Route path="/games" element={isLoggedIn ? <GamesPage /> : <Navigate to="/login" />} />
        <Route path="/game/:id" element={isLoggedIn ? <GamePage /> : <Navigate to="/login" />} />
        <Route path="/high-scores" element={isLoggedIn ? <HighScoresPage /> : <Navigate to="/login" />} />
        <Route path="/place-ships" element={isLoggedIn ? <ShipPlacement /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

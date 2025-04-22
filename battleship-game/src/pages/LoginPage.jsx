import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/PageLayout.css";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    const success = await login(formData);
    if (success) {
      navigate("/games");
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="pageContainer">
      <header className="pageHeader">
        <h2>Login to Battleship</h2>
        <p>Enter your credentials to continue.</p>
      </header>

      <AuthForm mode="login" onSubmit={handleLogin} />

      <footer className="pageFooter">
        <p>&copy; 2025 Battleship Game</p>
      </footer>
    </div>
  );
}

export default LoginPage;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/PageLayout.css";

function RegisterPage() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const success = await register(formData);
    if (success) {
      navigate("/"); 
    } else {
      alert("Registration failed. Try a different username.");
    }
  };

  return (
    <div className="pageContainer">
      <header className="pageHeader">
        <h2>Register for Battleship</h2>
        <p>Create an account to join the battle!</p>
      </header>

      <AuthForm mode="register" onSubmit={handleRegister} />

      <footer className="pageFooter">
        <p>&copy; 2025 Battleship Game</p>
      </footer>
    </div>
  );
}

export default RegisterPage;


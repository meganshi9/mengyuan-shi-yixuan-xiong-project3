import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/api";

export const AuthContext = createContext(); 

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("battleshipUser");
    return stored ? JSON.parse(stored) : null;
  });

  const isLoggedIn = !!user;

  const login = async ({ username, password }) => {
    try {
      const data = await loginUser({ username, password });
      const newUser = { username: data.username, token: data.token };
      setUser(newUser);
      localStorage.setItem("battleshipUser", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async ({ username, password }) => {
    try {
      const data = await registerUser({ username, password });
      const newUser = { username: data.username, token: data.token };
      setUser(newUser);
      localStorage.setItem("battleshipUser", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Register failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("battleshipUser");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/api";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;

  const login = async ({ username, password }) => {
    try {
      const data = await loginUser({ username, password });
      setUser(data); 
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async ({ username, password }) => {
    try {
      const data = await registerUser({ username, password });
      setUser(data);
      return true;
    } catch (error) {
      console.error("Register failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    // Optionally: call backend logout endpoint
    // await api.post("/logout");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.log("Not logged in yet");
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



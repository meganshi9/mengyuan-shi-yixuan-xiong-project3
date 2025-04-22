import React, { useState } from "react";
import "../styles/PageLayout.css"; 

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const isLogin = mode === "login";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="authFormWrapper">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Log In" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;


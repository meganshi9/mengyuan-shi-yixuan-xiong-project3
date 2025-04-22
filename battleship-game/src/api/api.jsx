import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});


export const loginUser = async (data) => {
  const res = await api.post("/login", data); 
  return res.data; 
};

export const registerUser = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

// ---- Game APIs ----
export const fetchGames = async () => {
  const res = await api.get("/games");
  return res.data;
};

export const createNewGame = async () => {
  const res = await api.post("/games");
  return res.data;
};

export const joinGame = async (gameId) => {
  const res = await api.post(`/games/${gameId}/join`);
  return res.data;
};

export default api;



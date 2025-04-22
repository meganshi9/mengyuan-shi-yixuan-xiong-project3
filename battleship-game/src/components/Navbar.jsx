import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/PageLayout.css";

function Navbar() {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbarInner">
        <h1 className="logo">Battleship</h1>
        <ul className="navLinks">
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/games"
                  className={location.pathname === "/games" ? "active" : ""}
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  to="/high-scores"
                  className={location.pathname === "/high-scores" ? "active" : ""}
                >
                  High Scores
                </Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={location.pathname === "/register" ? "active" : ""}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setUser(null);
    return;
  }

  api.get("/api/me")
    .then(res => setUser(res.data))
    .catch(() => {
      localStorage.removeItem("token");
      setUser(null);
    });

}, []);
  return (
    <nav className="pf-navbar">
      <div className="pf-navbar-container">
        {/* Logo */}
        <Link className="pf-navbar-brand" to="/">
          <div className="pf-logo-oval">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="pf-brand-text">Property Finder</span>
        </Link>

        {/* Right Side Navigation */}
        <div className="pf-navbar-actions">
          {user && (
            <Link to="/saved" className="pf-nav-icon" title="Saved Properties">
              <i className="bi bi-bookmark"></i>
            </Link>
          )}

          {!user ? (
            <>
              <Link className="pf-btn-outline" to="/login">
                Login
              </Link>
              <Link className="pf-btn-primary" to="/register">
                Register
              </Link>
            </>
          ) : (
            <div className="pf-dropdown">
              <button className="pf-user-menu">
                <div className="pf-user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="pf-username">{user.username}</span>
                <i className="bi bi-chevron-down pf-chevron"></i>
              </button>
              <div className="pf-dropdown-menu">
                <div className="pf-dropdown-header">
                  <div className="pf-dropdown-user-info">
                    <div className="pf-dropdown-avatar">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="pf-dropdown-details">
                      <p className="pf-dropdown-name">{user.username}</p>

                      <Link
                        to="/account"
                        className="pf-dropdown-email"
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        Account Settings
                      </Link>

                    </div>
                  </div>
                </div>
                <div className="pf-dropdown-divider"></div>
                <button
                  className="pf-dropdown-item pf-logout"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
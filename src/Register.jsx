import { useState } from "react";
import api from "./api";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/register", {
        username,
        password,
      });
      alert("User registered. Now login.");
      window.location.href = "/";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-content">
          <div className="logo">
            <div className="logo-oval">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">Property Finder</span>
          </div>

          <div className="register-form-wrapper">
            <h1 className="register-title">Create an account</h1>
            <p className="register-subtitle">Start finding your dream property today</p>

            <form onSubmit={submit} className="register-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn-register">
                Register
              </button>

              <p className="signin-text">
                Already have an account? <Link to="/" className="signin-link">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="register-right">
        <div className="background-house">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop" 
            alt="Modern house" 
            className="house-image"
          />
          <div className="overlay"></div>
        </div>
        
        <div className="welcoming-person">
          <svg viewBox="0 0 300 400" fill="none">
            <circle cx="150" cy="80" r="40" fill="#1a1a1a"/>
            <rect x="120" y="120" width="60" height="100" rx="30" fill="#2563EB"/>
            <path d="M120 140 L80 100 L85 95 L125 135 Z" fill="#2563EB"/>
            <circle cx="80" cy="100" r="12" fill="#D4A373"/>
            <path d="M180 140 L200 180 L195 185 L175 145 Z" fill="#2563EB"/>
            <rect x="125" y="220" width="20" height="80" rx="10" fill="#1a1a1a"/>
            <rect x="155" y="220" width="20" height="80" rx="10" fill="#1a1a1a"/>
            <ellipse cx="135" cy="300" rx="15" ry="8" fill="#1a1a1a"/>
            <ellipse cx="165" cy="300" rx="15" ry="8" fill="#1a1a1a"/>
            <g className="welcome-icon">
              <circle cx="220" cy="140" r="35" fill="#fff" opacity="0.95"/>
              <text x="220" y="155" fontSize="35" textAnchor="middle" fill="#2563EB">✓</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Register;
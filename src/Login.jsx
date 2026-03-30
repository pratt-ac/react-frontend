import { useState } from "react";
import api from "./api";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/";
    } catch (err) {
      alert("Login failed. Check username/password.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <div className="logo">
            <div className="logo-oval">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">Property Finder</span>
          </div>

          <div className="login-form-wrapper">
            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">Please enter your details</p>

            <form onSubmit={submit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="text"
                  placeholder=""
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
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember for 30 days</span>
                </label>
                <a href="#" className="forgot-link">Forgot password</a>
              </div>

              <button type="submit" className="btn-signin">
                Sign in
              </button>

              <button type="button" className="btn-google">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Sign in with Google
              </button>

              <p className="signup-text">
                Don't have an account? <Link to="/register" className="signup-link">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="background-house">
          {/* House background image */}
          <img 
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop" 
            alt="Modern house" 
            className="house-image"
          />
          <div className="overlay"></div>
        </div>
        
        {/* Person pointing left */}
        <div className="pointing-person">
          <svg viewBox="0 0 300 400" fill="none">
            {/* Person silhouette */}
            {/* Head */}
            <circle cx="150" cy="80" r="40" fill="#1a1a1a"/>
            
            {/* Body */}
            <rect x="120" y="120" width="60" height="100" rx="30" fill="#2563EB"/>
            
            {/* Left arm pointing left */}
            <path d="M120 140 L60 120 L50 125 L55 135 L115 155 Z" fill="#2563EB"/>
            {/* Hand */}
            <circle cx="50" cy="130" r="12" fill="#D4A373"/>
            {/* Pointing finger */}
            <path d="M50 130 L20 128 L18 132 L48 134 Z" fill="#D4A373"/>
            
            {/* Right arm */}
            <path d="M180 140 L200 180 L195 185 L175 145 Z" fill="#2563EB"/>
            
            {/* Legs */}
            <rect x="125" y="220" width="20" height="80" rx="10" fill="#1a1a1a"/>
            <rect x="155" y="220" width="20" height="80" rx="10" fill="#1a1a1a"/>
            
            {/* Shoes */}
            <ellipse cx="135" cy="300" rx="15" ry="8" fill="#1a1a1a"/>
            <ellipse cx="165" cy="300" rx="15" ry="8" fill="#1a1a1a"/>
            
            {/* Arrow pointing left */}
            <g className="pointing-arrow">
              <path d="M40 110 L10 110 L25 95 M10 110 L25 125" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40 110 L90 110" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeDasharray="5,5"/>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Login;

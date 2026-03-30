import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Landing.css";

const cities = ["Bangalore", "Chennai", "Delhi", "Hyderabad", "Mumbai"];

function Landing() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="pf-hero">
        <div className="pf-hero-background">
          {/* Animated background elements */}
          <div className="pf-bg-circle pf-circle-1"></div>
          <div className="pf-bg-circle pf-circle-2"></div>
          <div className="pf-bg-circle pf-circle-3"></div>
        </div>

        <div className="pf-hero-content">
          <div className="pf-hero-text">
            <h1 className="pf-hero-title">
              Find Your Perfect
              <span className="pf-hero-highlight"> Dream Home</span>
            </h1>
            <p className="pf-hero-subtitle">
              Discover premium properties across India's top cities. Your next home is just a search away.
            </p>
          </div>

          {/* Search Box */}
          <div className="pf-search-container">
            <div className="pf-search-box">
              <div className="pf-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <select
                className="pf-city-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Select a city to explore</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                className="pf-search-btn"
                disabled={!city}
                onClick={() => navigate(`/properties/${city}`)}
              >
                Search Properties
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="pf-stats">
            <div className="pf-stat-item">
              <div className="pf-stat-number">10K+</div>
              <div className="pf-stat-label">Properties Listed</div>
            </div>
            <div className="pf-stat-divider"></div>
            <div className="pf-stat-item">
              <div className="pf-stat-number">5</div>
              <div className="pf-stat-label">Major Cities</div>
            </div>
            <div className="pf-stat-divider"></div>
            <div className="pf-stat-item">
              <div className="pf-stat-number">500+</div>
              <div className="pf-stat-label">Happy Clients</div>
            </div>
          </div>
        </div>

        {/* Decorative house illustration */}
        <div className="pf-hero-image">
          <svg viewBox="0 0 400 300" fill="none" className="pf-house-illustration">
            {/* Main house */}
            <path d="M50 150L200 50L350 150V270C350 275 345 280 340 280H60C55 280 50 275 50 270V150Z" fill="#2563EB" opacity="0.1"/>
            <path d="M50 150L200 50L350 150V270C350 275 345 280 340 280H60C55 280 50 275 50 270V150Z" stroke="#2563EB" strokeWidth="3"/>
            
            {/* Roof */}
            <path d="M30 150L200 30L370 150" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            
            {/* Door */}
            <rect x="170" y="200" width="60" height="80" rx="5" fill="#1D4ED8"/>
            <circle cx="215" cy="240" r="3" fill="white"/>
            
            {/* Windows */}
            <rect x="90" y="170" width="50" height="50" rx="5" fill="white" stroke="#2563EB" strokeWidth="2"/>
            <rect x="260" y="170" width="50" height="50" rx="5" fill="white" stroke="#2563EB" strokeWidth="2"/>
            
            {/* Window dividers */}
            <line x1="115" y1="170" x2="115" y2="220" stroke="#2563EB" strokeWidth="2"/>
            <line x1="90" y1="195" x2="140" y2="195" stroke="#2563EB" strokeWidth="2"/>
            <line x1="285" y1="170" x2="285" y2="220" stroke="#2563EB" strokeWidth="2"/>
            <line x1="260" y1="195" x2="310" y2="195" stroke="#2563EB" strokeWidth="2"/>
            
            {/* Chimney */}
            <rect x="280" y="80" width="30" height="50" fill="#1a1a1a"/>
            
            {/* Smoke */}
            <circle cx="295" cy="60" r="8" fill="#9ca3af" opacity="0.5"/>
            <circle cx="300" cy="50" r="10" fill="#9ca3af" opacity="0.4"/>
            <circle cx="290" cy="45" r="7" fill="#9ca3af" opacity="0.3"/>
          </svg>
        </div>
      </div>
    </>
  );
}

export default Landing;
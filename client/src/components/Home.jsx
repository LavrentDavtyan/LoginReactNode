import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import avatarLogo from '../assets/avatar.png';
import mobileIcon from '../assets/mobileIcon.png';
import './Main.css';

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('token')));
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      <header className="header">
        <div className="login-nav">
          <div className="header-left">
            <div className="login-logo">
              <img src={avatarLogo} alt="Avatar Logo" />
            </div>
            <nav>
              <ul>
                <li className="active"><Link to="/login">Home</Link></li>
                <li><Link to="#">Contact</Link></li>
                <li><Link to="#">About</Link></li>
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
              </ul>
            </nav>
          </div>
          {isAuthenticated ? (
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </header>
      <header className="mobile-header">
        <div className="login-nav">
          <div className="header-left">
            <div className="login-logo">
              <img src={avatarLogo} alt="Avatar Logo" />
            </div>
          </div>
          <img
            src={mobileIcon}
            alt="Mobile Menu"
            className="mobile-icon"
            onClick={toggleMenu}
          />
          {menuOpen && (
            <nav className="mobile-menu">
              <ul>
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="#">Contact</Link></li>
                <li><Link to="#">About</Link></li>
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
              </ul>
            </nav>
          )}
        </div>
      </header>
      <div className="content">
        <Outlet />
      </div>
      <footer className="footer">
        <p>© Copyright {currentYear}</p>
      </footer>
    </div>
  );
};

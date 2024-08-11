import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import avatarLogo from '../assets/avatar.png';
import mobileIcon from '../assets/mobileIcon.png';
import './Main.css';

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('token')));
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

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
                <li className={isActive('/login')}><Link to="/login">Home</Link></li>
                <li className={isActive('/contact')}><Link to="#">Contact</Link></li>
                <li className={isActive('/about')}><Link to="#">About</Link></li>
                {isAuthenticated && <li className={isActive('/profile')}><Link to="/profile">Profile</Link></li>}
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
                <li className={isActive('/login')}><Link to="/login">Home</Link></li>
                <li className={isActive('/contact')}><Link to="#">Contact</Link></li>
                <li className={isActive('/about')}><Link to="#">About</Link></li>
                {isAuthenticated && <li className={isActive('/profile')}><Link to="/profile">Profile</Link></li>}
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

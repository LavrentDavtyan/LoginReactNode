import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
  };

  const data = new Date()

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="login-nav">
          <div className="login-logo">
            <i className="fa fa-user-circle"></i>
          </div>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </nav>
          <button className="login-btn">Login</button>
        </div>
      </header>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <div className="login-input">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-buttons">
            <button type="submit" className="login-submit">Login</button>
            <button type="button" className="login-cancel">Cancel</button>
          </div>
        </form>
      </div>
      <footer className="login-footer">
        <p>© Copyright {data.getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Login;

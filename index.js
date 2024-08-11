require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors'); 
const users = require('./models/users');

const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY';

const app = express();
app.use(express.json());
app.use(cors());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(403).json({ message: 'User not found' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.status(200).json({ accessToken: token });
});

app.get('/profile', authenticateToken, (req, res) => {
  const userProfile = users.find(u => u.email === req.user.email);
  
  if (!userProfile) {
    return res.status(404).json({ message: 'User profile not found' });
  }

  res.status(200).json({ email: userProfile.email, message: 'Profile data retrieved successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

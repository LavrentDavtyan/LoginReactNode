require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const users = require('models/users.js');
const users = require('./models/users');

console.log(users)

const app = express();
app.use(express.json());

// POST /login - Authenticate User
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

  const token = jwt.sign({ email: user.email, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.status(200).json({ accessToken: token });
});

// GET /profile - Get User Profile
app.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(200).json({ email: user.email, username: user.username });
  });
});


app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});


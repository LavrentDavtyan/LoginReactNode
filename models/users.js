
const bcrypt = require('bcryptjs');

const users = [
    {
      email: 'email@example.com',
      password: bcrypt.hashSync('password123', 8),
    }
];

module.exports = users;
  

  

const bcrypt = require('bcryptjs');

const users = [
    {
      username: 'user1',
      // password: 'password123',
      password: bcrypt.hashSync('password123', 8),
    }
];

module.exports = users;
  

  
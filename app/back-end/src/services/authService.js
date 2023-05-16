const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT = process.env.JWT_SECRET;

const authService = {
  async token(user) {
    const { passaword, ...newUser } = user;
    const payload = { data: newUser };
    const token = jwt.sign(payload, JWT);

    return token;
  },

};

module.exports = authService;
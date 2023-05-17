const jwt = require('jsonwebtoken');
const ErrorHttp = require('../utils/utils');
require('dotenv').config();

const JWT = process.env.JWT_SECRET;

const authService = {
  async token(user) {
    const { password, ...newUser } = user;
    const payload = { data: newUser };
    const token = jwt.sign(payload, JWT);

    return token;
  },

  async verifyToken(token) {
    try {
      const vrfToken = jwt.verify(token, JWT);
      return vrfToken;
    } catch (error) {
      throw new ErrorHttp('Você precisa de um token valido!', 401);
    }
  },
};

module.exports = authService;
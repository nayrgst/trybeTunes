const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const authService = require('../services/authService');
const ErrorHttp = require('../utils/utils');

const userController = {
  /** @type {import('express').RequestHandler} */

  async login(req, res) {
    const { body } = req;
    const { email, password } = body;
    await userService.validationBody(email);
    const listUser = await userService.login(body);
    const passwd = await bcrypt.compare(password, listUser.password);

    if (!passwd) throw new ErrorHttp('Email ou senha incorreto!', 401);
    const token = authService.token(listUser);
    res.json({ token });
  },

  async validateLogin(req, res) {
    const { authorization } = req.headers;
    if (!authorization) throw new ErrorHttp('Você precisa de um token', 404);
    const token = authService.verifyToken(authorization);
    
    const { email } = token.data;
    const validateLogin = await userService.login(email);
    res.json({ validateLogin });
  },

};

module.exports = userController;
const loginService = require('../services/loginService');
const authService = require('../services/authService');

const userController = {
  /** @type {import('express').RequestHandler} */

  async login(req, res) {
    const { body } = req;
    const validate = await loginService.validationBody(body);
    const vrfUser = await loginService.login(validate);
    const getToken = await authService.token(vrfUser);

    res.json({ ...vrfUser, getToken });
  },
};

module.exports = userController;
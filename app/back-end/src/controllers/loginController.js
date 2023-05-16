const loginService = require('../services/loginService');
const authService = require('../services/authService');

const loginController = {
  async login(req, res) {
    const { body } = req;
    const user = await loginService.validationBody(body);
    const validateUser = await loginService.validationLogin(user);
    const token = await authService.token(validateUser);

    res.json({ token });
  },
};

module.exports = loginController;
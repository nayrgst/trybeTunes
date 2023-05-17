const registerService = require('../services/registerService');
const authService = require('../services/authService');

const registerController = {
 async createUser(req, res) {
    const { body } = req;
    const validateUser = await registerService.validationBody(body);
    const { dataValues } = await registerService.createUser(validateUser);
    const token = await authService.token(dataValues);

    res.status(201).json({ ...dataValues, token });
},

};

module.exports = registerController;
const joi = require('joi');
const md5 = require('md5');
const { runSchema } = require('../utils/schema');
const ErrorHttp = require('../utils/utils');
const Models = require('../database/models');

const loginService = {
  validationBody: runSchema(
    joi.object({
      email: joi.string().email().required().messages({
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email deve ser um email válido',
        'any.required': 'O campo email é obrigatório',
      }),
      password: joi.string().min(6).required().messages({
        'string.empty': 'O campo senha é obrigatório',
        'any.required': 'O campo senha é obrigatório',
      }),
    }),
  ),

  async login(body) {
    const { email, password } = body;
    const passwdHash = md5(password);
    
    const user = await Models.users({
      where: { email },
      raw: true,
    });

    if (!user || passwdHash !== user.password) {
      throw new ErrorHttp('Usuário não encontrado!', 404);
    }

    return user;
  },

};

module.exports = loginService;

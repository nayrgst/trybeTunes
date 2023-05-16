const joi = require('joi');
const { runSchema } = require('../utils/schema');
const ErrorHttp = require('../utils/utils');

const loginService = {
  validationBody: runSchema(
    joi.object({
      name: joi.string().required().messages({
        'string.empty': 'O campo nome é obrigatório',
        'any.required': 'O campo nome é obrigatório',
      }),
      email: joi.string().email().required().messages({
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email deve ser um email válido',
        'any.required': 'O campo email é obrigatório',
      }),
      password: joi.string().required().messages({
        'string.empty': 'O campo senha é obrigatório',
        'any.required': 'O campo senha é obrigatório',
      }),
    }),
  ),

  async validationLogin(body) {
    const { name, email, password } = body;
    if (!name || !email || !password) {
      throw new ErrorHttp('Algum campo está inválido', 400);
    }
  },
};

module.exports = loginService;

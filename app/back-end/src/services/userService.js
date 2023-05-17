const joi = require('joi');
const { runSchema } = require('../utils/schema');
const ErrorHttp = require('../utils/utils');
const Models = require('../database/models');

const userService = {
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
      password: joi.string().min(6).required().messages({
        'string.empty': 'O campo senha é obrigatório',
        'any.required': 'O campo senha é obrigatório',
      }),
    }),
  ),

  async login(body) {
    const { email } = body;
    const listUser = await Models.users.findOne({ where: { email }, raw: true });
    if (!listUser) {
    throw new ErrorHttp('usuário não existe', 404);
  }
  return listUser;
  },

};

module.exports = userService;

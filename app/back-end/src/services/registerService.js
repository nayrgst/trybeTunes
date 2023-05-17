const joi = require('joi');
const md5 = require('md5');
const Models = require('../database/models');
const ErrorHttp = require('../utils/utils');
const { runSchema } = require('../utils/schema');

const registerService = {
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

  async createUser(body) {
    const { name, email, password } = body;
    const passwdHash = md5(password);
    const listUser = await Models.users.findOne({ where: { email }, raw: true });

    if (listUser) throw new ErrorHttp('Este email já está registrado', 409);
    const data = { name, email, password: passwdHash }; 
    const createUser = await Models.users.create(data, { raw: true });
    
    return createUser;
  },
};

module.exports = registerService;
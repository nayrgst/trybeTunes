/* eslint-disable camelcase */
const bcrypt = require('bcrypt');

/** 
 * @type {import('sequelize-cli').Migration} 
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Sequelize} Sequelize
 * */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const password = await bcrypt.hash('1234567', 10);
      await queryInterface.bulkInsert('users', [{
        name: 'Fe Bissi',
        email: 'febigoxtoso@lindo.com',
        password,
        descript: 'goxtei da foto',
        created_at: new Date(),
        updated_at: new Date(),
      }]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};

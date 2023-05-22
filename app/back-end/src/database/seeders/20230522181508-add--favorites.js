/* eslint-disable max-len */
/* eslint-disable camelcase */
/** 
 * @type {import('sequelize-cli').Migration} 
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Sequelize} Sequelize
 * */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('favorites', [{
      track_name: 'Post Malone',
      preview_url: 'https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/7e/3c/4e/7e3c4ef6-daa7-cc10-57d0-45f5a562eaf5/18UMGIM22101.rgb.jpg/100x100bb.jpg',
      
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('favorites', null, {});
  },
};

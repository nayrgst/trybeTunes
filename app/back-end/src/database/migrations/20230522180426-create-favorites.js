const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    refereces: {
      model: 'users',
      key: 'id',
    },
  },
  trackName: {
    type: DataTypes.STRING,
    field: 'track_name',
  },
  previewUrl: {
    type: DataTypes.STRING,
    field: 'preview_url',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
  },

};

/** 
 * @type {import('sequelize-cli').Migration} 
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').Sequelize} Sequelize
 * */

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('favorites', attributes);
  },
    async down(queryInterface) {
      await queryInterface.dropTable('favorites');
    },

  };
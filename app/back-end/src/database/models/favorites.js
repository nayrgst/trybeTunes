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
  albumName: {
    type: DataTypes.STRING,
    field: 'album_name',
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

/** @param {import('sequelize').Sequelize} sequelize */

module.exports = (sequelize) => {
  const model = sequelize.define('favorites', attributes, {
    tableName: 'favorites',
    underscored: true,
  });
  return model;
};
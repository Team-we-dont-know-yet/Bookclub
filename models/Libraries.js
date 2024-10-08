const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Library extends Model {}

Library.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'club',
        key: 'id',
        unique: true

      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true,
      references: {
        model: 'book',
        key: 'id',
        unique: true

      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'library'
  }
);

module.exports = Library;

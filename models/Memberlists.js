const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Memberlist extends Model {}

Memberlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    club_id: {
      type: DataTypes.INTEGER,
      unique:false,
      allowNull: true,
      references: {
        model: 'club',
        key: 'id',
        unique: true
      }
    },
    member_id: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true,
      references: {
        model: 'member',
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
    modelName: 'memberlist'
  }
);

module.exports = Memberlist;

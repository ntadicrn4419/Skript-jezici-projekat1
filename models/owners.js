'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Owners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tournaments}) {
      // define association here
      this.hasMany(Tournaments, { foreignKey: 'ownerId', as: 'tournaments', onDelete: 'cascade', hooks: true });
    }
  };
  Owners.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: { 
           args: [2, 30],
           msg: "The name length should be between 2 and 30 characters."
        }
     }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { 
           args: [4, 100],
           msg: "The password length should be between 4 and 100 characters."
        }
     }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Nije email"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Owners',
  });
  return Owners;
};
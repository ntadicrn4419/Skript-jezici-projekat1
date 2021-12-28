'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Matches, {foreignKey: 'matchId', as: 'match'});//trenutni mec 
      this.hasOne(models.Players, {foreignKey: 'playerId', as: 'opponent'});//trenutni protivnik
      this.hasOne(models.Coaches, {foreignKey: 'playerId', as: 'coach'});
    }
  };
  Players.init({
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
           args: [4, 20],
           msg: "The password length should be between 4 and 20 characters."
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
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt:{
          msg: "Unos broja godina nije validan. Nije broj."
        },
        checkAge(value) {
          if (value < 5 || value >  100) {
            throw new Error('Neispravan unos broja godina');
          }
        }
      }
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate:{
        isInt:{
          msg: "Unos ranga nije validan. Nije broj."
        },
        checkRanking(value) {
          if (value < 1 || value >  2000) {
            throw new Error('Neispravan unos ranga. Rang mora biti izmedju 1 i 2000.');
          }
        }
      }
    }
    
  }, {
    sequelize,
    modelName: 'Players',
  });
  return Players;
};
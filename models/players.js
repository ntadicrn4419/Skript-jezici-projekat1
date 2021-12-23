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
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
    
  }, {
    sequelize,
    modelName: 'Players',
  });
  return Players;
};
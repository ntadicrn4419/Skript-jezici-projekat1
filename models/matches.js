'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tournaments, {foreignKey: 'tournamentId', as: 'tournament'});
      this.hasMany(models.Players, {foreignKey: 'matchId', as: 'players'});
    }
  };
  Matches.init({
    court: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Matches',
  });
  return Matches;
};
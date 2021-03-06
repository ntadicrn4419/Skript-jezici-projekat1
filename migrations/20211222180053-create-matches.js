'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      court: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      round: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tournamentId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Matches');
  }
};
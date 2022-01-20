'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ranking: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      playerId:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      matchId:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      coachId:{
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
    await queryInterface.dropTable('Players');
  }
};
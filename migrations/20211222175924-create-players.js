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
      },
      playerId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
          isInt:{
            msg: "Id igraca protiv koga ovaj igrac igra(playerId) nije validan. Nije broj."
          }
        }
      },
      matchId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
          isInt:{
            msg: "Id meca u kome ovaj igrac ucestvuje(matchId) nije validan. Nije broj."
          }
        }
      },
      coachId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{
            msg: "Id trenera sa kojim ovaj igrac radi(coachId) nije validan. Nije broj."
          }
        }
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
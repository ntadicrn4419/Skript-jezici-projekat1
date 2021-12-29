'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Coaches', {
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
      playerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{
            msg: "Id igraca sa kojim ovaj trener radi(playerId) nije validan. Nije broj."
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkRole(value){
            if(value != 'admin' && value != 'moderator' && value != 'regular'){
              throw new Error('Neispravna uloga. Uloga moze biti: 1. admin 2. moderator 3. regular');
            }
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
    await queryInterface.dropTable('Coaches');
  }
};
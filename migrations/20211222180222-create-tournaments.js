'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: { 
             args: [2, 40],
             msg: "The tournament name length should be between 2 and 40 characters."
          }
       }
      },
      location: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { 
             args: [2, 50],
             msg: "The location length should be between 2 and 50 characters."
          }
       }
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkFormat(value){
            const arr = value.split("-");
            if(arr.length != 3){
              throw new Error("Format datuma nije validan. Datum mora biti u obliku dd-mm-yyyy .");
            }
            const dd = Number(arr[0]);
            const mm = Number(arr[1]);
            const yyyy = Number(arr[2]);
      
            if(!Number.isInteger(dd)){
              throw new Error("Dan u datumu nije validan(nije broj). Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(!Number.isInteger(mm)){
              throw new Error("Mesec u datumu nije validan(nije broj). Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(!Number.isInteger(yyyy)){
              throw new Error("Godina u datumu nije validna(nije broj). Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(dd > 31 || dd < 1){
              throw new Error("Dan u datumu nije validan. Dan mora biti izmedju 1 i 31. Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(mm > 12 || mm < 1){
              throw new Error("Mesec u datumu nije validan. Mesec mora biti izmedju 1 i 12. Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(yyyy > 2030 || yyyy < 2021){
              throw new Error("Godina u datumu nije validna. Godina mora biti izmedju 2021 i 2030. Datum mora biti u obliku dd-mm-yyyy .");
            }
          }
        }
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkFormat(value){
            const arr = value.split("-");
            if(arr.length != 3){
              throw new Error("Format datuma nije validan. Datum mora biti u obliku dd-mm-yyyy .");
            }
            const dd = Number(arr[0]);
            const mm = Number(arr[1]);
            const yyyy = Number(arr[2]);
      
            if(!Number.isInteger(dd)){
              throw new Error("Dan u datumu nije validan(nije broj). Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(!Number.isInteger(mm)){
              throw new Error("Mesec u datumu nije validan(nije broj). Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(!Number.isInteger(yyyy)){
              throw new Error("Godina u datumu nije validna(nije broj). Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(dd > 31 || dd < 1){
              throw new Error("Dan u datumu nije validan. Dan mora biti izmedju 1 i 31. Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(mm > 12 || mm < 1){
              throw new Error("Mesec u datumu nije validan. Mesec mora biti izmedju 1 i 12. Datum mora biti u obliku dd-mm-yyyy .");
            }
            if(yyyy > 2030 || yyyy < 2021){
              throw new Error("Godina u datumu nije validna. Godina mora biti izmedju 2021 i 2030. Datum mora biti u obliku dd-mm-yyyy .");
            }
          }
        }
      },
      ownerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt:{
            msg: "ID vlasnika turnira (ownerId) nije validan (nije broj)."
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tournaments');
  }
};
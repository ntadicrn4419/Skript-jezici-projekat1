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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt:{
          msg: "Broj terena na kom se igra nije validan. Broj terena mora biti izmedju 1 i 20."
        },
        checkCourtNumber(value) {
          if (value < 1 || value >  20) {
            throw new Error('Neispravan unos broja terena. Broj terena mora biti izmedju 1 i 20.');
          }
        }
      }
    },
    date: {
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
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt:{
          msg: "Vreme pocetka meca nije validno. Mora biti broj izmedju 1 i 24 koji oznacava pun sat."
        },
        checkTime(value){
          if(value < 1 || value > 24){
            throw new Error("Vreme pocetka meca nije validno. Mora biti broj izmedju 1 i 24 koji oznacava pun sat.");
          }
        }
      }
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt:{
          msg: "Runda turnira nije validna. Runda mora biti broj izmedju 1 i 7."
        },
        checkRound(value) {
          if (value < 1 || value >  7) {
            throw new Error('Neispravan unos runde. Runda mora biti izmedju 1 i 7. 1 je prvo kolo, a 7 je finale. Podrazumeva se da je na pocetku turnira broj igraca u glavnom zrebu 128.');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Matches',
  });
  return Matches;
};
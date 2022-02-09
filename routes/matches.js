const express = require('express');
const { sequelize, Matches, Coaches} = require('../models');
const jwt = require('jsonwebtoken');

const {checkDate} = require('../validation.js');
const joi = require('joi');
require('dotenv').config();    

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const postMatchValidation = joi.object({
    court: joi.number().integer().min(1).max(20).required(),
    time: joi.number().integer().min(1).max(24).required(),
    tournamentId: joi.number().integer().required(),
    date: joi.custom((value, helper) => {

        response = checkDate(value);
        if (response.allow == false) {
            return helper.message(response.message);
        } else {
            return value;
        }

    }),
    round: joi.number().integer().min(1).max(7).required()
});

const putMatchValidation = joi.object({
    court: joi.number().integer().min(1).max(20).required(),
    time: joi.number().integer().min(1).max(24).required(),
    date: joi.custom((value, helper) => {

        response = checkDate(value);
        if (response.allow == false) {
            return helper.message(response.message);
        } else {
            return value;
        }

    })
});

function authToken(req, res, next) {

    if (req.method == 'GET'){
        next();
        return;
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({msg: "Token is null."});
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, coach) => {
    
        if (err) return res.status(403).json({msg: err.message});
    
        req.coach = coach;
    
        next();
    });
}

route.use(authToken);

route.get('/matches', (req, res) => {
    Matches.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.post('/matches', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
        .then(coach => {
            if(coach.role == "admin"){
            
                const val = postMatchValidation.validate(req.body);
                if(val.error){
                    res.status(400).json({ msg: val.error.message});
                }else{
                    Matches.create({
                        court: req.body.court,
                        time: req.body.time,
                        tournamentId: req.body.tournamentId,
                        date: req.body.date,
                        round: req.body.round
                     })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
                }
            }else{
                res.status(403).json({ msg: "Jedino admin moze da dodaje meceve."});
            }
        })
        .catch(err => res.status(500).json(err));
});

route.get('/matches/:id', (req, res) => {
    Matches.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/matches/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            const val = putMatchValidation.validate(req.body);
            if(val.error){
                res.status(400).json({ msg: val.error.message});
            }else{
                Matches.findOne({ where: { id: req.params.id }})
                .then( match => {
                    match.court = req.body.court;
                    match.time = req.body.time;
                    match.date = req.body.date;

                    match.save()
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json({msg: err.message}) );
                 })
                .catch( err => res.status(500).json({msg: err.message}) );
            }
        }else{
            res.status(403).json({ msg: "Jedino admin moze da azurira meceve."});
        }
    })
    .catch(err => res.status(500).json(err));
    

});

route.delete('/matches/:id', (req, res) => {

    Coaches.findOne({where: {id: req.coach.coachId}})
        .then(coach => {
            if(coach.role == "admin"){
                Matches.findOne({ where: { id: req.params.id } })
                .then( match => {
                    match.destroy()
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
                })
                .catch( err => res.status(500).json(err) );
            }else{
                res.status(403).json({ msg: "Jedino admin moze da brise meceve."});
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = route;
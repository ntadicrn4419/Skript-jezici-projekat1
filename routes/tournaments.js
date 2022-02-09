const express = require('express');
const { sequelize, Tournaments, Coaches} = require('../models');
const jwt = require('jsonwebtoken');

const joi = require('joi');
const {checkDate} = require('../validation.js');

require('dotenv').config();    

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/tournaments', (req, res) => {
    Tournaments.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

const postTournamentValidation = joi.object({

    name: joi.string().min(1).required(),
    location: joi.string().min(1).required(),
    ownerId: joi.number().integer().required(),

    startDate: joi.custom((value, helper) => {

        response = checkDate(value);
        if (response.allow == false) {
            return helper.message(response.message);
        } else {
            return value;
        }

    }),
    endDate: joi.custom((value, helper) => {

        response = checkDate(value);
        if (response.allow == false) {
            return helper.message(response.message);
        } else {
            return value;
        }

    }),
});

const putTournamentValidation = joi.object({

    startDate: joi.custom((value, helper) => {

        response = checkDate(value);
        if (response.allow == false) {
            return helper.message(response.message);
        } else {
            return value;
        }

    }),
    endDate: joi.custom((value, helper) => {

        response = checkDate(value);
        if (response.allow == false) {
            return helper.message(response.message);
        } else {
            return value;
        }

    }),
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

route.post('/tournaments', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            const val = postTournamentValidation.validate(req.body);
            if(val.error){
                res.status(400).json({ msg: val.error.message});
            }else{
                Tournaments.create({
                    name: req.body.name,
                    location: req.body.location,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    ownerId: req.body.ownerId
                 })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json({msg: err.message}) );
            }
        }else{
            res.status(403).json({ msg: "Jedino admin moze da dodaje turnire."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));
    
});

route.get('/tournaments/:id', (req, res) => {
    Tournaments.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json({msg: err.message}) );

});

route.put('/tournaments/:id', (req, res) => {

    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            const val = putTournamentValidation.validate(req.body);
            if(val.error){
                res.status(400).json({ msg: val.error.message});
            }else{
                Tournaments.findOne({ where: { id: req.params.id }})
                .then( tournament => {
                    tournament.startDate = req.body.startDate;
                    tournament.endDate = req.body.endDate;
                    
                    tournament.save()
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json({msg: err.message}) );
                })
                .catch( err => res.status(500).json({msg: err.message}) ); 
            }
        }else{
            res.status(403).json({ msg: "Jedino admin moze da menja podatke o turnirima."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));
    

});

route.delete('/tournaments/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            Tournaments.findOne({ where: { id: req.params.id } })
        .then( tournament => {
            tournament.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json({msg: err.message}) );
        })
        .catch( err => res.status(500).json({msg: err.message}) );
        }else{
            res.status(403).json({ msg: "Jedino admin moze da brise turnire."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));
    
});

module.exports = route;
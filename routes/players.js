const express = require('express');
const { sequelize, Players, Coaches} = require('../models');
const jwt = require('jsonwebtoken');

const joi = require('joi');

require('dotenv').config();    

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const postPlayerValidation = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().min(3).email().required(),
    age: joi.number().integer().min(10).max(100).required(),
    ranking: joi.number().integer().min(1).max(2000).required(),
    playerId: joi.number().integer().required(),
    matchId: joi.number().integer().required(),
    coachId: joi.number().integer().required()
});

const putPlayerValidation = joi.object({
    email: joi.string().min(3).email().required(),
    playerId: joi.number().integer(),
    coachId: joi.number().integer(),
    matchId: joi.number().integer(),
    ranking: joi.number().integer().min(1).max(2000),
    age: joi.number().integer().min(10).max(100).required(),
});

function authToken(req, res, next) {
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

route.get('/players', (req, res) => {
    Players.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json({msg: err.message}) );
    
});

route.post('/players', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            const val = postPlayerValidation.validate(req.body);
            if(val.error){
                res.status(400).json({ msg: val.error.message});
            }else{
                Players.create({
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age,
                    ranking: req.body.ranking,
                    playerId: req.body.playerId,
                    matchId: req.body.matchId,
                    coachId: req.body.coachId
            
                 })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json({msg: err.message}) );
            }
        }else{
            res.status(403).json({ msg: "Jedino admin moze da dodaje igrace."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));
   
});

route.get('/players/:id', (req, res) => {
    Players.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json({msg: err.message}) );

});

route.put('/players/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            const val = putPlayerValidation.validate(req.body);
            if(val.error){
                res.status(400).json({ msg: val.error.message});
            }else{
                Players.findOne({ where: { id: req.params.id }})
                .then( player => {
                    player.email = req.body.email;
                    player.playerId = req.body.playerId;
                    player.coachId = req.body.coachId;
                    player.matchId = req.body.matchId;
                    player.ranking = req.body.ranking;
                    player.age = req.body.age;
                    
                    player.save()
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json({msg: err.message}) );
                })
                .catch( err => res.status(500).json({msg: err.message}) );
            }
        }else{
            res.status(403).json({ msg: "Jedino admin moze da menja podatke o igracima."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));

});

route.delete('/players/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            Players.findOne({ where: { id: req.params.id } })
        .then( player => {
            player.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json({msg: err.message}) );
        })
        .catch( err => res.status(500).json({msg: err.message}) );
        }else{
            res.status(403).json({ msg: "Jedino admin moze da brise igrace."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));
    
});

module.exports = route;
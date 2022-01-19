const express = require('express');
const { sequelize, Coaches} = require('../models');
const jwt = require('jsonwebtoken');

const joi = require('joi');

require('dotenv').config();    

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const postCoachValidation = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().min(3).email().required(),
    password: joi.number().integer().min(4).max(150).required(),
    age: joi.number().integer().min(10).max(100).required(),
    playerId: joi.number().integer().required(),
});

const putCoachValidation = joi.object({
    playerId: joi.number().integer().required(),
    email: joi.string().min(3).email().required()
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

route.get('/coaches', (req, res) => {
    Coaches.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
        
});

route.post('/coaches', (req, res) => {
    const val = postCoachValidation.validate(req.body);
    if(val.error){
        res.status(400).json({ msg: val.error.message});
    }else{
        Coaches.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
            playerId: req.body.playerId
         })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json({msg: err.message}) );
    }
});

route.get('/coaches/:id', (req, res) => {
    Coaches.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json({msg: err.message}) );

});

route.put('/coaches/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            const val = putCoachValidation.validate(req.body);
            if(val.error){
                res.status(400).json({ msg: val.error.message});
            }else{
                Coaches.findOne({ where: { id: req.params.id }})
                .then( coach => {
                    coach.email = req.body.email;
                    coach.playerId = req.body.playerId;
        
                    coach.save()
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json({msg: err.message}) );
                })
                .catch( err => res.status(500).json({msg: err.message}) );
            }
        }else{
            res.status(403).json({ msg: "Jedino admin moze da dodaje meceve."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));
   
});

route.delete('/coaches/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            Coaches.findOne({ where: { id: req.params.id } })
            .then( coach => {
                coach.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json({msg: err.message}) );
        })
        .catch( err => res.status(500).json({msg: err.message}) );
        }else{
            res.status(403).json({ msg: "Jedino admin moze da brise druge trenere."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));
    
});

module.exports = route;
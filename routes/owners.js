const express = require('express');
const { sequelize, Owners, Coaches} = require('../models');
const jwt = require('jsonwebtoken');

const joi = require('joi');

require('dotenv').config();    

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const postOwnerValidation = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().min(3).email().required()
});

const putOwnerValidation = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().min(3).email().required()
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

route.get('/owners', (req, res) => {
    Owners.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json({msg: err.message}) );
    
});

route.post('/owners', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
        .then(coach => {
            if(coach.role == "admin"){
                const val = postOwnerValidation.validate(req.body);
                if(val.error){
                    res.status(400).json({ msg: val.error.message});
                }else{
                    Owners.create({
                        name: req.body.name,
                        email: req.body.email
                     })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json({msg: err.message}) );
                }
            }else{
                res.status(403).json({ msg: "Jedino admin moze da dodaje vlasnike."});
            }
        })
        .catch(err => res.status(500).json({msg: err.message}));
    
});

route.get('/owners/:id', (req, res) => {
    Owners.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json({msg: err.message}) );

});

route.put('/owners/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            const val = putOwnerValidation.validate(req.body);
            if(val.error){
                res.status(400).json({ msg: val.error.message});
            }else{
                Owners.findOne({ where: { id: req.params.id }})
                .then( owner => {
                    owner.name = req.body.name;
                    owner.email = req.body.email;
                    
                    owner.save()
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json({msg: err.message}) );
                })
                .catch( err => res.status(500).json({msg: err.message}) );
            }
        }else{
            res.status(403).json({ msg: "Jedino admin moze da menja podatke vlasnika."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));


});

route.delete('/owners/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            Owners.findOne({ where: { id: req.params.id } })
            .then( owner => {
                owner.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json({msg: err.message}) );
            })
            .catch( err => res.status(500).json({msg: err.message}) );
        }else{
            res.status(403).json({ msg: "Jedino admin moze da brise vlasnike."});
        }
    })
    .catch(err => res.status(500).json({msg: err.message}));

});

module.exports = route;
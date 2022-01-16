const express = require('express');
const { sequelize, Owners, Coaches} = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();    

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, coach) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.coach = coach;
    
        next();
    });
}

route.use(authToken);

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, coach) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.coach = coach;
    
        next();
    });
}

route.use(authToken);

route.get('/owners', (req, res) => {
    Owners.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.post('/owners', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
        .then(coach => {
            if(coach.role == "admin"){
                Owners.create({
                    name: req.body.name,
                    email: req.body.email
                 })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            }else{
                res.status(403).json({ msg: "Jedino admin moze da dodaje vlasnike."});
            }
        })
        .catch(err => res.status(500).json(err));
    
});

route.get('/owners/:id', (req, res) => {
    Owners.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/owners/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            Owners.findOne({ where: { id: req.params.id }})
            .then( owner => {
                owner.name = req.body.name;
                owner.email = req.body.email;
                
                owner.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
        }else{
            res.status(403).json({ msg: "Jedino admin moze da menja podatke vlasnika."});
        }
    })
    .catch(err => res.status(500).json(err));


});

route.delete('/owners/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            Owners.findOne({ where: { id: req.params.id } })
            .then( owner => {
                owner.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
        }else{
            res.status(403).json({ msg: "Jedino admin moze da brise vlasnike."});
        }
    })
    .catch(err => res.status(500).json(err));

});

module.exports = route;
const express = require('express');
const { sequelize, Owners} = require('../models');
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
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, owner) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.owner = owner;
    
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
    Owners.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
     })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/owners/:id', (req, res) => {
    Owners.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/owners/:id', (req, res) => {
    
    Owners.findOne({ where: { id: req.params.id }})
        .then( owner => {
            owner.password = req.body.password;
            owner.email = req.body.email;
            
            owner.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/owners/:id', (req, res) => {

    Owners.findOne({ where: { id: req.params.id } })
        .then( owner => {
            owner.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;
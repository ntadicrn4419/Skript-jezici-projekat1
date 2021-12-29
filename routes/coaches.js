const express = require('express');
const { sequelize, Coaches} = require('../models');
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

route.get('/coaches', (req, res) => {
    Coaches.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
        
});

route.post('/coaches', (req, res) => {
    Coaches.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        playerId: req.body.playerId
     })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/coaches/:id', (req, res) => {
    Coaches.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/coaches/:id', (req, res) => {
    
    Coaches.findOne({ where: { id: req.params.id }})
        .then( coach => {
            coach.password = req.body.password;
            coach.email = req.body.email;
            coach.playerId = req.body.playerId;

            coach.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/coaches/:id', (req, res) => {

    Coaches.findOne({ where: { id: req.params.id } })
        .then( coach => {
            coach.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;
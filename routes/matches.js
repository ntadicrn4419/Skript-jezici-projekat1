const express = require('express');
const { sequelize, Matches} = require('../models');
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

route.get('/matches', (req, res) => {
    Matches.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.post('/matches', (req, res) => {
    Matches.create({
        court: req.body.court,
        time: req.body.time,
        tournamentId: req.body.tournamentId,
        date: req.body.date,
        round: req.body.round
     })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/matches/:id', (req, res) => {
    Matches.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/matches/:id', (req, res) => {
    
    Matches.findOne({ where: { id: req.params.id }})
        .then( match => {
            match.court = req.body.court;
            match.time = req.body.time;
            
            match.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/matches/:id', (req, res) => {

    Matches.findOne({ where: { id: req.params.id } })
        .then( match => {
            match.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;
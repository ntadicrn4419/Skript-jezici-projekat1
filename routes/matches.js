const express = require('express');
const { sequelize, Coaches, Matches, Owners, Players, Tournaments} = require('../models');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

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
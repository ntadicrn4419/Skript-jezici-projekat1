const express = require('express');
const { sequelize, Tournaments} = require('../models');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/tournaments', (req, res) => {
    Tournaments.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.post('/tournaments', (req, res) => {
    Tournaments.create({
        name: req.body.name,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        ownerId: req.body.ownerId
     })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/tournaments/:id', (req, res) => {
    Tournaments.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/tournaments/:id', (req, res) => {
    
    Tournaments.findOne({ where: { id: req.params.id }})
        .then( tournament => {
            tournament.startDate = req.body.startDate;
            tournament.endDate = req.body.endDate;
            
            tournament.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/tournaments/:id', (req, res) => {

    Tournaments.findOne({ where: { id: req.params.id } })
        .then( tournament => {
            tournament.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;
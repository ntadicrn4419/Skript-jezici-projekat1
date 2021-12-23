const express = require('express');
const { sequelize, Coaches, Matches, Owners, Players, Tournaments} = require('../models');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// 1) getovanje tj. citanje svih vrsta entiteta, svih redova u tabeli
route.get('/coaches', (req, res) => {
    Coaches.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});
route.get('/matches', (req, res) => {
    Matches.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});
route.get('/owners', (req, res) => {
    Owners.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});
route.get('/players', (req, res) => {
    Players.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});
route.get('/tournaments', (req, res) => {
    Tournaments.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

// 2) kreiranje tj. dodavanje u tabelu svih vrsta entiteta

route.post('/coaches', (req, res) => {
    Coaches.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        playerId: req.body.playerId
     })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/matches', (req, res) => {
    Matches.create({
        court: req.body.court,
        time: req.body.time,
        tournamentId: req.body.tournamentId,
     })
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

route.post('/players', (req, res) => {
    Players.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        ranking: req.body.ranking,
        playerId: req.body.playerId,
        matchId: req.body.matchId,
        coachId: req.body.coachId

     })
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

// 3) getovanje tj. citanje entiteta po id-u

route.get('/coaches/:id', (req, res) => {
    Coaches.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/matches/:id', (req, res) => {
    Matches.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/owners/:id', (req, res) => {
    Owners.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/players/:id', (req, res) => {
    Players.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/tournaments/:id', (req, res) => {
    Tournaments.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

// 4) update-ovanje svih vrsta entiteta

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

route.put('/players/:id', (req, res) => {
    
    Players.findOne({ where: { id: req.params.id }})
        .then( player => {
            player.password = req.body.password;
            player.email = req.body.email;
            player.playerId = req.body.playerId;
            player.coachId = req.body.coachId;
            player.matchId = req.body.matchId;
            player.ranking = req.body.ranking;
            player.age = req.body.ranking;
            
            player.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

// 5) brisanje entiteta po id-u

route.delete('/coaches/:id', (req, res) => {

    Coaches.findOne({ where: { id: req.params.id } })
        .then( coach => {
            coach.destroy()
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

route.delete('/owners/:id', (req, res) => {

    Owners.findOne({ where: { id: req.params.id } })
        .then( owner => {
            owner.destroy()
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

route.delete('/players/:id', (req, res) => {

    Players.findOne({ where: { id: req.params.id } })
        .then( player => {
            player.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;
const express = require('express');
const { sequelize, Players, Coaches} = require('../models');
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

route.get('/players', (req, res) => {
    Players.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.post('/players', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
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
        }else{
            res.status(403).json({ msg: "Jedino admin moze da dodaje igrace."});
        }
    })
    .catch(err => res.status(500).json(err));
   
});

route.get('/players/:id', (req, res) => {
    Players.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/players/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
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
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
        }else{
            res.status(403).json({ msg: "Jedino admin moze da menja podatke o igracima."});
        }
    })
    .catch(err => res.status(500).json(err));

});

route.delete('/players/:id', (req, res) => {
    Coaches.findOne({where: {id: req.coach.coachId}})
    .then(coach => {
        if(coach.role == "admin"){
            Players.findOne({ where: { id: req.params.id } })
        .then( player => {
            player.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
        }else{
            res.status(403).json({ msg: "Jedino admin moze da brise igrace."});
        }
    })
    .catch(err => res.status(500).json(err));
    
});

module.exports = route;
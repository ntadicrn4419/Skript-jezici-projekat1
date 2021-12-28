const express = require('express');
const { sequelize, Owners, Coaches } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));


app.post('/registerOwner', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    Owners.create(obj).then( rows => {
        
        const own = {
            ownerId: rows.id,
            name: rows.name
        };

        const token = jwt.sign(own, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/loginOwner', (req, res) => {

    //autentifikacija-pocetak
    Owners.findOne({ where: { name: req.body.name } })
        .then( own => {
            
            if (bcrypt.compareSync(req.body.password, own.password)) {
                const obj = {
                    ownerId: own.id,
                    name: own.name
                };
    //autentifikacija-kraj    
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.post('/registerCoach', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: bcrypt.hashSync(req.body.password, 10),
        playerId: req.body.playerId
    };

    Coaches.create(obj).then( rows => {
        
        const own = {
            ownerId: rows.id,
            name: rows.name
        };

        const token = jwt.sign(own, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/loginCoach', (req, res) => {

    //autentifikacija-pocetak
    Coaches.findOne({ where: { name: req.body.name } })
        .then( own => {
            
            if (bcrypt.compareSync(req.body.password, own.password)) {
                const obj = {
                    ownerId: own.id,
                    name: own.name
                };
    //autentifikacija-kraj    
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});
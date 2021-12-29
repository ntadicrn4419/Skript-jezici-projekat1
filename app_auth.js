const express = require('express');
const { sequelize, Coaches } = require('./models');
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

app.post('/register', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: bcrypt.hashSync(req.body.password, 10),
        playerId: req.body.playerId,
        role: req.body.role
    };

    Coaches.create(obj).then( rows => {
        
        const coa = {
            coachId: rows.id,
            coach: rows.email
        };

        const token = jwt.sign(coa, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/login', (req, res) => {

    Coaches.findOne({ where: { email: req.body.email } })
        .then( coa => {
            
            if (bcrypt.compareSync(req.body.password, coa.password)) {
                const obj = {
                    coachId: coa.id,
                    coach: coa.email
                }; 
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Password is incorrect."});
            }
        })
        .catch( err => res.status(500).json({msg: "Email is incorrect."}) );//err
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});
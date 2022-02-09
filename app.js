const express = require('express');
const { sequelize, Coaches } = require('./models');
const coaches = require('./routes/coaches');
const matches = require('./routes/matches');
const owners = require('./routes/owners');
const players = require('./routes/players');
const tournaments = require('./routes/tournaments');
const path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const history = require('connect-history-api-fallback');

const joi = require('joi');
const {checkRole} = require('./validation.js');
//.....

const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

var corsOptions = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
}
app.use(express.json());
app.use(cors(corsOptions));


app.use("/admin", coaches, matches, owners, players, tournaments);

const postCoachValidation = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().min(3).email().required(),
    password: joi.string().min(4).max(150).required(),
    age: joi.number().integer().min(10).max(100).required(),
    playerId: joi.number().integer().required(),
    role: joi.custom((value, helper) => {

        response = checkRole(value);
        if (response.allow == false) {
            return helper.message(response.message);
        } else {
            return value;
        }

    })
});

app.post('/api_register', (req, res) => {
    const obj = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: bcrypt.hashSync(req.body.password, 10),
        playerId: req.body.playerId,
        role: req.body.role
    };
    const val = postCoachValidation.validate(obj);
    if(val.error){
      res.status(400).json({ msg: val.error.message });
    }else{
        Coaches.create(obj).then( rows => {
        
            const coa = {
                coachId: rows.id,
                coach: rows.email
            };
    
            const token = jwt.sign(coa, process.env.ACCESS_TOKEN_SECRET);
    
            console.log(token);
            
            res.json({ token: token });
    
        }).catch( err => {
            res.status(500).json({msg: err.message}); 
        });
    }
});

app.post('/api_login', (req, res) => {

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
        .catch( err => res.status(500).json({msg: "Email is incorrect."}) );
});

function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);
 
    socket.on('comment', msg => {
        Messages.create({ body: msg.body, artId: msg.artId, userId: msg.user.userId })
            .then( rows => {
                Messages.findOne({ where: { id: rows.id }, include: ['user'] })
                    .then( msg => io.emit('comment', JSON.stringify(msg)) ) 
            }).catch( err => res.status(500).json(err) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});

const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);

server.listen({ port: process.env.PORT || 8000 }, async () => {
    await sequelize.authenticate();
});


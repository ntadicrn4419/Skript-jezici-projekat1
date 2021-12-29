const express = require('express');
const { sequelize } = require('./models');
const coaches = require('./routes/coaches');
const matches = require('./routes/matches');
const owners = require('./routes/owners');
const players = require('./routes/players');
const tournaments = require('./routes/tournaments');
const path = require('path');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();

app.use("/admin", coaches, matches, owners, players, tournaments);

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, coach) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.coach = coach;
    
        next();
    });
}

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});


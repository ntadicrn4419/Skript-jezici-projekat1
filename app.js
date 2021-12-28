const express = require('express');
const { sequelize } = require('./models');
const coaches = require('./routes/coaches');
const matches = require('./routes/matches');
const owners = require('./routes/owners');
const players = require('./routes/players');
const tournaments = require('./routes/tournaments');
const path = require('path');

const app = express();

app.use('/api', coaches);
app.use('/api', matches);
app.use('/api', owners);
app.use('/api', players);
app.use('/api', tournaments);


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
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, owner) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.owner = owner;
    
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
    res.sendFile('index.html');
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});


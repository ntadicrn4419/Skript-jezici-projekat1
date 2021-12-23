const express = require('express');
const { sequelize } = require('./models');
const rest_service = require('./routes/rest_service');
const path = require('path');

const app = express();

app.use('/api', rest_service);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});
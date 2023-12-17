const express = require('express');
const UserController = require('./controllers/UserController');
const bodyParser = require('body-parser');


const app = express();
const port = 8080;
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Pin pon
app.get('/api/ping', (req, res) => {
    res.send('pong');
});

app.use('/api/user', UserController);
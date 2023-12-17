const express = require('express');
const UserController = require('./controllers/UserController');
const bodyParser = require('body-parser');


const app = express();
const port = 8080;
app.use(bodyParser.json());

app.use((req, res, next) => {

    const auth = {login: 'user', password: 'user'}

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    if (login && password && login === auth.login && password === auth.password) {
        return next()
    }


    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Autorizacion requerida')
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Pin pon
app.get('/api/ping', (req, res) => {
    res.send('pong');
});

app.use('/api/user', UserController);
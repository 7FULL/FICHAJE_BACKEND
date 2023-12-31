const CryptoJS = require('crypto-js');
const BBDD = require('../BBDD/BBDD');
const express = require('express');
const User = require('../models/User');

const router = express.Router();

//Login de usuarios
router.post("/login", async (req, res) => {
    let params = req.body;

    if (!params.username || !params.password) {
        return res.send(ret(400, new User()));
    }

    let user = await BBDD.findUser(params.username)

    if (!user) {
        return res.send(ret(403, new User()));
    }

    if (!comparePasswords(params.password, user.password)) {
        return res.send(ret(403, new User()));
    }

    return res.send(ret(200, user));
});

router.post("/getUser", async (req, res) => {
    let params = req.body;

    if (!params.username) {
        return res.send(ret(400, 'Faltan datos'));
    }

    let user = await BBDD.findUser(params.username)

    if (!user) {
        return res.send(ret(403, 'El usuario no existe'));
    }

    return res.send(ret(200, user));
});

//Registro de usuarios
router.post("/register", (req, res) => {

});

//Fichar
router.post("/fichar", async (req, res) => {
    let params = req.body;

    if (!params.username || !params.fichaje) {
        return res.send(ret(400, 'Faltan datos'));
    }

    let user = await BBDD.findUser(params.username)

    if (!user) {
        return res.send(ret(403, 'El usuario no existe'));
    }

    //Si el usuario tiene ya ese fichaje lo actualizamos
    if (user.fichajes != null && user.fichajes.includes(params.fichaje)) {
        //Actualizamos el fichaje
        user.fichajes[user.fichajes.indexOf(params.fichaje)] = params.fichaje
    } else {
        //Si no lo tiene lo añadimos
        user.fichajes = [params.fichaje]
    }

    //Actualizamos el usuario en la BBDD
    BBDD.updateUser(user).then(r => {
        return res.send(ret(200, r));
    })
});

//Funcion para devolver codigo de peticion y objeto json con mensaje
function ret(code, message) {
    let json = {
        code: code,
        data: message
    }
    //console.log(json);

    return JSON.stringify(json);
}

function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

function comparePasswords(enteredPassword, hashedPassword) {
    const enteredPasswordHashed = hashPassword(enteredPassword);
    return enteredPasswordHashed === hashedPassword;
}

module.exports = router;

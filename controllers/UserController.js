const CryptoJS = require('crypto-js');
const BBDD = require('../BBDD/BBDD');
const express = require('express');
const User = require('../models/User');

const router = express.Router();

//Login de usuarios
router.post("/login", async (req, res) => {
    let params = req.body;

    if (!params.username || !params.password) {
        return res.send(ret(400, 'Faltan datos'));
    }

    let user = await BBDD.findUser(params.username)

    if (!user) {
        return res.send(ret(403, 'El usuario no existe'));
    }

    if (!comparePasswords(params.password, user.password)) {
        return res.send(ret(403, 'Contraseña incorrecta'));
    }

    return res.send(ret(200, user));
});

//Registro de usuarios
router.post("/register", (req, res) => {

});

//Funcion para devolver codigo de peticion y objeto json con mensaje
function ret(code, message) {
    let json = {
        code: code,
        data: message
    }

    console.log(json);

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

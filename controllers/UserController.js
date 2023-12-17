const bcrypt = require('bcrypt-nodejs');
const BBDD = require('../BBDD/BBDD');
const express = require('express');
const User = require('../models/User');

const router = express.Router();

//Login de usuarios
router.post("/login", async (req, res) => {
    let params = req.body;

    console.log(params.username)

    let user = await BBDD.findUser(params.username)

    if (!user) {
        return res.send(ret(404, 'El usuario no existe'));
    }

    bcrypt.compare(params.password, user.password, (err, check) => {
        if (err) {
            console.log(err)
            return res.send(ret(500, 'Error en la petición'));
        }

        if (!check) {
            return res.send(ret(403, 'La contraseña es incorrecta'));
        }

        // Solo envía la respuesta de éxito si la comparación es exitosa
        return res.send(ret(200, user));
    });
});

//Registro de usuarios
router.post("/register", (req, res) => {
    let params = req.body;

    //Comprobamos que no exista el usuario
    let user = BBDD.findUser(params.username);

    if (user) {
        return res.send(ret(403, 'El usuario ya existe'));
    }

    //Encriptamos la contraseña
    bcrypt.hash(params.password, null, null, (err, hash) => {
        if (err) {
            return res.send(ret(500, 'Error en la petición'));
        }

        //Creamos el usuario
        let user = {
            username: params.username,
            password: hash,
            email: params.email,
            name: params.name,
            surname: params.surname,
            role: params.role,
            image: params.image
        }

        //Insertamos el usuario
        users.insertOne(user)
            .then((err, result) => {
                if (err) {
                    return res.send(ret(500, 'Error en la petición'));
                }

                return res.send(ret(200, 'Usuario creado correctamente'));
            });
    });
});



//Funcion para devolver codigo de peticion y objeto json con mensaje
function ret(code, message) {
    let json = {
        code: code,
        message: message
    }

    return JSON.stringify(json);
}

module.exports = router;

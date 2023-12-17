const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://pi:678041577pP_p1h2g3pablo@cluster0.maizixh.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const users = client.db("FICHAJES").collection("USER");

client.connect().then(r => { console.log("Conectado a la BBDD") }).catch(err => { console.log("Error al conectar a la BBDD") });

//Encontrar un usuario por email
async function findUser(email) {
    let user = await users.findOne({email: email})

    //Si el usuario es nulo buscamos por username
    if (user == null) {
        user = await users.findOne({username: email})
    }

    return user
}

//Insertar un usuario
async function insertUser(user) {
    await users.insertOne(user).catch(err => {
        console.log("Error al insertar el usuario: "+ err)
        return false
    })

    return true
}

module.exports = {
    findUser,
    insertUser
}
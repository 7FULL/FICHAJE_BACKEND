//Clase Usuario
class User{
    constructor(_id, username, name, surname, email, password, role, fichajes){
        this._id = _id;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.fichajes = fichajes;
    }
}

module.exports = User;
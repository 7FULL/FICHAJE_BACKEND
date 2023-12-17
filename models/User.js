//Clase Usuario
class User{
    constructor(id, username, name, surname, email, password, role){
        this.id = id;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

module.exports = User;
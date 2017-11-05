function UsuarioCrtl(app, db) {
    this.app = app;
    this.ref = db.ref("restricted_access/secret_document/groups");
}

UsuarioCrtl.prototype.doLogin = function (usuario, callback) {
    var login;
    var key = usuario.idGrupo;
    var userKey = usuario.key;
    var usersRef = this.ref.child(key + "/users");

    usersRef.on("child_added", function (snapshot) {
        login = snapshot.val();
        if(login.login == usuario.login && login.senha == usuario.senha) callback(login);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        callback(false);
    });

}

UsuarioCrtl.prototype.criarUsuario = function (usuario, callback) {
    var key = usuario.idGrupo;
    var usersRef = this.ref.child(key + "/users");

    var newKey = usersRef.push().key;
    usuario.id = newKey;

    usersRef.child(newKey).set(usuario, function () {
        callback(newKey);
    });
}

UsuarioCrtl.prototype.editarUsuario = function (usuario, callback) {
    var key = usuario.idGrupo;
    var usersRef = this.ref.child(key + "/users/" + usuario.id);
    usersRef.update(usuario, function () {
        callback(true);
    });
}

UsuarioCrtl.prototype.buscaUsuarios = function (grupo, callback) {
    var key = grupo;
    var usersRef = this.ref.child(key + "/users");
    usersRef.on("value", function (snapshot) {
        callback(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        callback(false);
    });
}

UsuarioCrtl.prototype.deleteUsuarios = function (grupo, user, callback) {
    var usersRef = this.ref.child(grupo + "/users");
    usersRef.child(user).remove(function () {
        callback(true);r
    });
}

module.exports = function () {
    return UsuarioCrtl;
}


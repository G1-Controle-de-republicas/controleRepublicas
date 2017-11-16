function UsuarioCrtl(app, db) {
    this.app = app;
    this.ref = db.ref("restricted_access/secret_document/groups");
}

UsuarioCrtl.prototype.doLogin = function (usuario, callback) {
    var groupRef = this.ref;
    var ctrl = false;

    return groupRef.once("value").then(snapshot => {
        snapshot.forEach(function (snap) {
            var usersRef = groupRef.child(snap.key + "/users");
            usersRef.on("value", function (snapS) {
                snapS.forEach(function (users) {
                    var user = users.val();
                    if (user.login == usuario.login && user.senha == usuario.senha) {
                        ctrl = user;
                    }
                });
            });
        });
        callback(ctrl);        
    })

}

UsuarioCrtl.prototype.buscaUsuarios = function (grupo, callback) {
    var usuarios = [];
    var key = grupo;
    var usersRef = this.ref.child(key + "/users" );
    return usersRef.once("value").then(snapshot =>{
        snapshot.forEach(function (snap) {
            usuarios.push(snap.val());
        })
        callback(usuarios);
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

UsuarioCrtl.prototype.deleteUsuarios = function (grupo, user, callback) {
    var usersRef = this.ref.child(grupo + "/users");
    usersRef.child(user).remove(function () {
        callback(true);
    });
}

module.exports = function () {
    return UsuarioCrtl;
}


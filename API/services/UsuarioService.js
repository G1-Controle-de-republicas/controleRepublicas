function UsuarioService(connection) {
    this.db = connection;
    this.ref = this.db.ref("restricted_access/secret_document");    
}

UsuarioService.prototype.criarUsuario = function (usuario) {
    var usersRef = this.ref.child("users");
    usersRef.set(usuario);
}

module.exports = function () {
    return UsuarioService;
}


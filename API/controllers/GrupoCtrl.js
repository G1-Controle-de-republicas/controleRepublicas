function GrupoCtrl (app, db) {
    this.app = app;
    this.ref = db.ref("restricted_access/secret_document");
}

GrupoCtrl.prototype.criarGrupo = function (grupo, callback) {
    var groupRef = this.ref.child("groups");
    var newKey = groupRef.push().key;
    usuario.id = newKey;
    groupRef.child(newKey).set(grupo, function () {
        callback(newKey);
    });
}

GrupoCtrl.prototype.buscaGrupo = function (grupo, callback) {
    var groupRef = this.ref.child("groups/" + grupo);
    groupRef.on("value", function (snapshot) {
        callback(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        callback(false);
    });
}

GrupoCtrl.prototype.editaGrupo = function (grupo, callback) {
    var groupRef = this.ref.child("groups/" + grupo.id);
    groupRef.update(grupo, function(){
        callback(true);
    });
}

GrupoCtrl.prototype.deleteGrupo = function (key, callback) {
    var groupRef = this.ref.child("groups");
    groupRef.child(key).remove(function(err, res){
        if(!err) callback(true);
    });
}

module.exports = function (){
    return GrupoCtrl;
}
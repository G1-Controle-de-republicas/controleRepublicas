var admin = require("firebase-admin");
var serviceAccount = require("../../justdoit-2017-firebase-adminsdk-5x949-a9e6948afd.json");

function criaConexao() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://justdoit-2017.firebaseio.com/"
  });

  var db = admin.database();
  return db;
}

module.exports = function () {
  return criaConexao;
}
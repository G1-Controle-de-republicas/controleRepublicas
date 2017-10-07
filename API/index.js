
var app = require('./config/custom-express')();
var admin = require("firebase-admin");
var serviceAccount = require("../justdoit-2017-firebase-adminsdk-5x949-a9e6948afd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://justdoit-2017.firebaseio.com/"
});

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
});


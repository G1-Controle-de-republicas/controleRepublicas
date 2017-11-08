var admin = require("firebase-admin");
<<<<<<< HEAD
var serviceAccount = require("../../justdoit-2017-firebase-adminsdk-5x949-7c9448a5c5.json");
=======
var serviceAccount = require("../../justdoit-2017-firebase-adminsdk-5x949-b2e298584f");
>>>>>>> 26a45e61b83399048ff92015339d8e3fcddc1a3e

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://justdoit-2017.firebaseio.com/"
});

var db = admin.database();

module.exports = function () {
  return db;
}
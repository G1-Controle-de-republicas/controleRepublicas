var app = require('./config/express')();
var rotas = require('./app/routes/app-routing')(app);
// global.jQuery = require('jquery');
// var bootstrap = require('bootstrap');

app.listen(3000, function () {
    console.log("Servidor rodando");
});


var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views','./app/views');

var path = require('path');
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../app/views')));    


module.exports = function () {
    return app;
}

module.exports = function(app){
    app.get('/login', function(req, res){
        console.log('Recebida requisicao de teste.');
        res.send('OK.');
    });
}